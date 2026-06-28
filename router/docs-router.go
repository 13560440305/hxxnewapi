package router

import (
	"embed"
	"io"
	"io/fs"
	"mime"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/gin-gonic/gin"
)

func docsHTTPFS(docsEmbed embed.FS) http.FileSystem {
	if common.DebugEnabled {
		if info, err := os.Stat("docs"); err == nil && info.IsDir() {
			return http.Dir("docs")
		}
	}
	sub, err := fs.Sub(docsEmbed, "docs")
	if err != nil {
		panic(err)
	}
	return http.FS(sub)
}

func resolveDocsFile(httpFS http.FileSystem, reqPath string) (string, bool) {
	reqPath = strings.TrimPrefix(reqPath, "/")
	if reqPath == "" {
		reqPath = "index.html"
	}
	if strings.HasSuffix(reqPath, "/") {
		reqPath += "index.html"
	}
	f, err := httpFS.Open(reqPath)
	if err != nil {
		return "", false
	}
	defer f.Close()
	stat, err := f.Stat()
	if err != nil {
		return "", false
	}
	if stat.IsDir() {
		indexPath := path.Join(reqPath, "index.html")
		if _, err := httpFS.Open(indexPath); err != nil {
			return "", false
		}
		return indexPath, true
	}
	return reqPath, true
}

func writeDocsFile(c *gin.Context, httpFS http.FileSystem, filePath string) {
	file, err := httpFS.Open(filePath)
	if err != nil {
		c.Status(http.StatusNotFound)
		return
	}
	defer file.Close()

	stat, err := file.Stat()
	if err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	if seeker, ok := file.(io.ReadSeeker); ok {
		http.ServeContent(c.Writer, c.Request, path.Base(filePath), stat.ModTime(), seeker)
		return
	}

	data, err := io.ReadAll(file)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	contentType := mime.TypeByExtension(path.Ext(filePath))
	if contentType == "" {
		contentType = "application/octet-stream"
	}
	c.Data(http.StatusOK, contentType, data)
}

func SetDocsRouter(router *gin.Engine, docsEmbed embed.FS) {
	httpFS := docsHTTPFS(docsEmbed)

	serveDocs := func(c *gin.Context) {
		reqPath := strings.TrimPrefix(c.Request.URL.Path, "/docs")
		reqPath = strings.TrimPrefix(reqPath, "/")

		if reqPath == "cn" || strings.HasPrefix(reqPath, "cn/") {
			suffix := strings.TrimPrefix(reqPath, "cn")
			target := "/docs/"
			if suffix != "" && suffix != "/" {
				if !strings.HasPrefix(suffix, "/") {
					suffix = "/" + suffix
				}
				target = "/docs" + suffix
			}
			if q := c.Request.URL.RawQuery; q != "" {
				target += "?" + q
			}
			c.Redirect(http.StatusMovedPermanently, target)
			return
		}
		if reqPath == "en" || strings.HasPrefix(reqPath, "en/") {
			c.Redirect(http.StatusMovedPermanently, "/docs/")
			return
		}

		filePath, ok := resolveDocsFile(httpFS, reqPath)
		if !ok {
			c.Status(http.StatusNotFound)
			return
		}
		writeDocsFile(c, httpFS, filePath)
	}

	// 仅注册 /docs 与 /docs/*filepath，勿注册 /docs/（会与通配路由冲突导致 panic）
	router.GET("/docs", serveDocs)
	router.GET("/docs/*filepath", serveDocs)
}
