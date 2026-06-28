/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React, { memo, useCallback } from 'react';
import { Select } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { LayoutGrid, Table2 } from 'lucide-react';

const MarketplaceToggle = ({ checked, onChange, label }) => (
  <button
    type='button'
    className={`mp-toggle${checked ? ' on' : ''}`}
    role='switch'
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
  />
);

const SearchActions = memo(
  ({
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
    isMobile = false,
    searchValue = '',
    setShowFilterModal,
    showWithRecharge,
    setShowWithRecharge,
    currency,
    setCurrency,
    showRatio,
    setShowRatio,
    viewMode,
    setViewMode,
    t,
  }) => {
    const handleFilterClick = useCallback(() => {
      setShowFilterModal?.(true);
    }, [setShowFilterModal]);

    const searchInput = (
      <div className='mp-search-wrap'>
        <span className='mp-search-icon'>
          <IconSearch />
        </span>
        <input
          type='search'
          className='mp-search-input'
          placeholder={t('搜索模型...')}
          value={searchValue}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );

    const viewControls = (
      <>
        <div className='mp-toggle-group'>
          <span>{t('充值价格显示')}</span>
          <MarketplaceToggle
            checked={showWithRecharge}
            onChange={setShowWithRecharge}
            label={t('充值价格显示')}
          />
        </div>

        {showWithRecharge && (
          <Select
            value={currency}
            onChange={setCurrency}
            optionList={[
              { value: 'USD', label: 'USD' },
              { value: 'CNY', label: 'CNY' },
              { value: 'CUSTOM', label: t('自定义货币') },
            ]}
            style={{ width: 100 }}
          />
        )}

        <div className='mp-toggle-group'>
          <span>{t('倍率')}</span>
          <MarketplaceToggle
            checked={showRatio}
            onChange={setShowRatio}
            label={t('倍率')}
          />
        </div>

        <button
          type='button'
          className={`mp-view-btn${viewMode === 'card' ? ' active' : ''}`}
          onClick={() => setViewMode?.('card')}
          aria-pressed={viewMode === 'card'}
          aria-label={t('卡片')}
        >
          <LayoutGrid size={14} />
          {t('卡片')}
        </button>
        <button
          type='button'
          className={`mp-view-btn${viewMode === 'table' ? ' active' : ''}`}
          onClick={() => setViewMode?.('table')}
          aria-pressed={viewMode === 'table'}
          aria-label={t('表格')}
        >
          <Table2 size={14} />
          {t('表格')}
        </button>
      </>
    );

    if (isMobile) {
      return (
        <div className='mp-topbar-panel'>
          <div className='mp-topbar'>
            {searchInput}
            <button
              type='button'
              className='mp-view-btn'
              onClick={handleFilterClick}
            >
              {t('筛选')}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className='mp-topbar-panel'>
        <div className='mp-topbar'>
          {searchInput}
          <div className='mp-topbar-right'>{viewControls}</div>
        </div>
      </div>
    );
  },
);

SearchActions.displayName = 'SearchActions';

export default SearchActions;
