/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React from 'react';
import { IconCopy } from '@douyinfe/semi-icons';
import PricingTopFilters from '../PricingTopFilters';
import PricingTopSection from '../header/PricingTopSection';
import SearchActions from '../header/SearchActions';
import PricingView from './PricingView';

const PricingContent = ({ isMobile, sidebarProps, ...props }) => {
  const { t } = props;
  const filteredModels = props.filteredModels || [];
  const modelCount = filteredModels.length;

  const sortOptions = [
    { value: 'latest', label: t('最新') },
    { value: 'price_asc', label: t('价格：低到高') },
    { value: 'price_desc', label: t('价格：高到低') },
  ];

  return (
    <div
      className={
        isMobile
          ? 'pricing-content-mobile model-marketplace-inner'
          : 'pricing-scroll-hide pricing-content-inner model-marketplace-inner'
      }
    >
      {!isMobile ? (
        <>
          <SearchActions
            isMobile={false}
            searchValue={sidebarProps.searchValue}
            handleChange={sidebarProps.handleChange}
            handleCompositionStart={sidebarProps.handleCompositionStart}
            handleCompositionEnd={sidebarProps.handleCompositionEnd}
            setShowFilterModal={sidebarProps.setShowFilterModal}
            showWithRecharge={sidebarProps.showWithRecharge}
            setShowWithRecharge={sidebarProps.setShowWithRecharge}
            currency={sidebarProps.currency}
            setCurrency={sidebarProps.setCurrency}
            showRatio={sidebarProps.showRatio}
            setShowRatio={sidebarProps.setShowRatio}
            viewMode={sidebarProps.viewMode}
            setViewMode={sidebarProps.setViewMode}
            t={t}
          />
          <PricingTopFilters {...sidebarProps} t={t} />
          <div className='mp-sort-row'>
            <div className='mp-sort-left'>
              <span className='mp-sort-label'>{t('排序')}</span>
              <select
                className='mp-sort-select'
                value={sidebarProps.sortOrder}
                onChange={(e) => sidebarProps.setSortOrder(e.target.value)}
                aria-label={t('排序')}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                type='button'
                className='mp-view-btn mp-copy-btn'
                onClick={() =>
                  sidebarProps.copyText?.(sidebarProps.selectedRowKeys)
                }
                disabled={!sidebarProps.selectedRowKeys?.length}
              >
                <IconCopy />
                {t('复制')}
              </button>
              <button
                type='button'
                className={`mp-view-btn${sidebarProps.tokenUnit === 'K' ? ' active' : ''}`}
                onClick={() =>
                  sidebarProps.setTokenUnit?.(
                    sidebarProps.tokenUnit === 'K' ? 'M' : 'K',
                  )
                }
              >
                {sidebarProps.tokenUnit}
              </button>
            </div>
            <span className='mp-model-count'>
              {t('共')} <strong>{modelCount}</strong> {t('个模型')}
            </span>
          </div>
        </>
      ) : (
        <div className='pricing-search-header'>
          <PricingTopSection
            {...props}
            isMobile={isMobile}
            sidebarProps={sidebarProps}
            showWithRecharge={sidebarProps.showWithRecharge}
            setShowWithRecharge={sidebarProps.setShowWithRecharge}
            currency={sidebarProps.currency}
            setCurrency={sidebarProps.setCurrency}
            showRatio={sidebarProps.showRatio}
            setShowRatio={sidebarProps.setShowRatio}
            viewMode={sidebarProps.viewMode}
            setViewMode={sidebarProps.setViewMode}
            tokenUnit={sidebarProps.tokenUnit}
            setTokenUnit={sidebarProps.setTokenUnit}
          />
        </div>
      )}

      <div
        className={
          isMobile ? 'pricing-view-container-mobile' : 'pricing-view-container'
        }
      >
        <PricingView {...props} viewMode={sidebarProps.viewMode} />
      </div>
    </div>
  );
};

export default PricingContent;
