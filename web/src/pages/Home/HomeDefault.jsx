/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { copy, showSuccess } from '../../helpers';
import { openDocsLink } from '../../helpers/docsLink';
import { API_ENDPOINTS } from '../../constants/common.constant';
import OrbitDiagram from './OrbitDiagram';
import './home-v2.css';

const PROVIDER_CHIPS = [
  'OpenAI',
  'Anthropic',
  'Google Gemini',
  'DeepSeek',
  '通义千问',
  '智谱 GLM',
  '月之暗面',
  'Mistral',
  'xAI Grok',
  '百度文心',
  '讯飞星火',
];

const ROUTING_MODELS = [
  'Claude Sonnet 4',
  'GPT-4o',
  'Gemini 2.0 Flash',
  'DeepSeek V3',
];

const CopyIcon = () => (
  <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <rect x='9' y='9' width='13' height='13' rx='2' />
    <path d='M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1' />
  </svg>
);

const PlayIcon = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M8 5v14l11-7z' />
  </svg>
);

const DocIcon = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
    <path d='M14 2v6h6' />
  </svg>
);

const HomeDefault = ({ serverAddress, docsLink }) => {
  const { t } = useTranslation();
  const [endpointIndex, setEndpointIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [routingIndex, setRoutingIndex] = useState(0);

  const endpoint = API_ENDPOINTS[endpointIndex] || API_ENDPOINTS[0];
  const fullEndpoint = `${serverAddress.replace(/\/$/, '')}${endpoint}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % API_ENDPOINTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoutingIndex((prev) => (prev + 1) % ROUTING_MODELS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const features = useMemo(
    () => [
      {
        key: 'price',
        icon: (
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' />
          </svg>
        ),
        title: t('更优惠的价格'),
        desc: t(
          '聚合多家供应商实时比价,自动选择当前性价比最优的路由,同等模型质量下显著降低调用成本。',
        ),
        tag: t('最高节省 40%'),
      },
      {
        key: 'failover',
        icon: (
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
          </svg>
        ),
        title: t('自动故障转移'),
        desc: t(
          '单一供应商限流或宕机时,请求在毫秒级自动切换到备用节点,业务侧无感知,持续可用。',
        ),
        tag: t('99.95% 可用性'),
      },
      {
        key: 'dropin',
        icon: (
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M16 18l6-6-6-6M8 6l-6 6 6 6' />
          </svg>
        ),
        title: t('零改造接入'),
        desc: t(
          '完全兼容 OpenAI / Anthropic 协议,只需替换 base_url,现有 SDK 与代码无需任何改动。',
        ),
        tag: t('1 行代码接入'),
      },
    ],
    [t],
  );

  const handleCopy = async () => {
    const ok = await copy(fullEndpoint);
    if (ok) {
      setCopied(true);
      showSuccess(t('已复制到剪切板'));
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className='home-v2'>
      <section className='home-v2__hero'>
        <div className='home-v2__hero-copy'>
          <div className='home-v2__eyebrow'>
            <span className='home-v2__eyebrow-dot' />
            {t('30+ 模型供应商实时在线')}
          </div>
          <h1 className='home-v2__title home-serif'>
            {t('一条通道')}
            <br />
            {t('接入所有')}
            <span className='home-v2__title-accent'>{t('大模型')}</span>
          </h1>
          <p className='home-v2__subtitle'>
            {t('首页副标题前缀')}
            <strong>{t('一个端点')}</strong>
            {t('首页副标题后缀')}
          </p>

          <div className='home-v2__console'>
            <div className='home-v2__console-bar'>
              <div className='dot' style={{ background: '#F5697A' }} />
              <div className='dot' style={{ background: '#F5C542' }} />
              <div className='dot' style={{ background: '#5FD68A' }} />
              <span>base_url.config</span>
            </div>
            <div className='home-v2__console-body'>
              <div className='home-v2__console-row'>
                <span className='home-v2__console-base'>
                  {serverAddress.replace(/\/$/, '')}
                </span>
                <span className='home-v2__console-path'>{endpoint}</span>
                <button type='button' className='home-v2__copy-btn' onClick={handleCopy}>
                  <CopyIcon />
                  {copied ? t('已复制 ✓') : t('复制')}
                </button>
              </div>
              <div className='home-v2__console-note'>
                <span>
                  <span className='home-v2__pulse' />
                  {t('延迟 {{ms}}ms', { ms: 68 })}
                </span>
                <span>
                  {t('路由中: {{model}}', { model: ROUTING_MODELS[routingIndex] })}
                </span>
              </div>
            </div>
          </div>

          <div className='home-v2__cta-row'>
            <Link to='/console' className='home-v2__btn-primary'>
              <PlayIcon />
              {t('获取密钥')}
            </Link>
            {docsLink && (
              <button
                type='button'
                className='home-v2__btn-secondary'
                onClick={() => openDocsLink(docsLink)}
              >
                <DocIcon />
                {t('查看文档')}
              </button>
            )}
          </div>
        </div>

        <OrbitDiagram />
      </section>

      <section className='home-v2__trust'>
        <div className='home-v2__trust-label'>{t('支持众多大模型供应商 · 30+ Providers')}</div>
        <div className='home-v2__provider-grid'>
          {PROVIDER_CHIPS.map((name) => (
            <div key={name} className='home-v2__provider-chip'>
              <span className='swatch' />
              {name}
            </div>
          ))}
          <div className='home-v2__provider-chip home-v2__provider-chip--more'>
            {t('+ {{count}} 更多', { count: 19 })}
          </div>
        </div>
      </section>

      <section className='home-v2__features'>
        {features.map((item) => (
          <div key={item.key} className='home-v2__feature-card'>
            <div className='home-v2__feature-icon'>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span className='home-v2__feature-tag'>{item.tag}</span>
          </div>
        ))}
      </section>

      <section className='home-v2__footer-cta'>
        <div className='home-v2__footer-cta-inner'>
          <div>
            <h2 className='home-serif'>{t('开始你的第一次调用')}</h2>
            <p>{t('注册即送体验额度,无需信用卡')}</p>
          </div>
          <div className='home-v2__cta-row'>
            <Link to='/console' className='home-v2__btn-primary'>
              <PlayIcon />
              {t('免费获取密钥')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeDefault;
