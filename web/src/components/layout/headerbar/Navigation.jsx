/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SkeletonWrapper from '../components/SkeletonWrapper';

const Navigation = ({
  mainNavLinks,
  isMobile,
  isLoading,
  userState,
  pricingRequireAuth,
  variant = 'default',
}) => {
  const location = useLocation();
  const isMarketplace = variant === 'marketplace';

  const isLinkActive = (link, targetPath) => {
    if (link.isExternal) return false;
    if (link.itemKey === 'home') return location.pathname === '/';
    if (link.itemKey === 'console') {
      return location.pathname.startsWith('/console');
    }
    if (link.itemKey === 'pricing') return location.pathname === '/pricing';
    if (link.itemKey === 'about') return location.pathname === '/about';
    if (link.itemKey === 'docs') return location.pathname.startsWith('/docs');
    return location.pathname === targetPath;
  };

  const renderNavLinks = () => {
    const baseClasses =
      'flex-shrink-0 flex items-center gap-1 font-semibold rounded-md transition-all duration-200 ease-in-out';
    const hoverClasses = 'hover:text-semi-color-primary';
    const spacingClasses = isMobile ? 'p-1' : 'p-2';

    const commonLinkClasses = `${baseClasses} ${spacingClasses} ${hoverClasses}`;

    return mainNavLinks.map((link) => {
      const linkContent = <span>{link.text}</span>;

      if (link.isExternal) {
        return (
          <a
            key={link.itemKey}
            href={link.externalLink}
            target='_blank'
            rel='noopener noreferrer'
            className={
              isMarketplace ? 'headerbar-nav-link' : commonLinkClasses
            }
          >
            {linkContent}
          </a>
        );
      }

      let targetPath = link.to;
      if (link.itemKey === 'console' && !userState.user) {
        targetPath = '/login';
      }
      if (link.itemKey === 'pricing' && pricingRequireAuth && !userState.user) {
        targetPath = '/login';
      }

      const active = isLinkActive(link, targetPath);
      const marketplaceClassName = `headerbar-nav-link${active ? ' active' : ''}`;

      // 内置文档为独立 Docsify 页面，必须整页跳转，不能用 React Router
      if (link.fullPage) {
        return (
          <a
            key={link.itemKey}
            href={targetPath}
            className={isMarketplace ? marketplaceClassName : commonLinkClasses}
          >
            {linkContent}
          </a>
        );
      }

      return (
        <Link
          key={link.itemKey}
          to={targetPath}
          className={isMarketplace ? marketplaceClassName : commonLinkClasses}
        >
          {linkContent}
        </Link>
      );
    });
  };

  return (
    <nav
      className={
        isMarketplace
          ? 'headerbar-nav-links'
          : 'flex flex-1 items-center gap-1 lg:gap-2 mx-2 md:mx-4 overflow-x-auto whitespace-nowrap scrollbar-hide'
      }
    >
      <SkeletonWrapper
        loading={isLoading}
        type='navigation'
        count={4}
        width={60}
        height={16}
        isMobile={isMobile}
      >
        {renderNavLinks()}
      </SkeletonWrapper>
    </nav>
  );
};

export default Navigation;
