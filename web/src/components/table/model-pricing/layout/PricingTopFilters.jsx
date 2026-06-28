/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React from 'react';
import PricingQuotaTypes from '../filter/PricingQuotaTypes';
import PricingVendors from '../filter/PricingVendors';
import PricingTags from '../filter/PricingTags';
import { resetPricingFilters } from '../../../../helpers/utils';
import { usePricingFilterCounts } from '../../../../hooks/model-pricing/usePricingFilterCounts';

/**
 * 模型广场顶部筛选栏 — marketplace pill 风格，保留全部筛选逻辑
 */
const PricingTopFilters = ({
  handleChange,
  setShowWithRecharge,
  setCurrency,
  setShowRatio,
  setViewMode,
  filterGroup,
  setFilterGroup,
  filterQuotaType,
  setFilterQuotaType,
  setFilterEndpointType,
  filterVendor,
  setFilterVendor,
  filterTag,
  setFilterTag,
  sortOrder,
  setSortOrder,
  setCurrentPage,
  setTokenUnit,
  loading,
  t,
  ...categoryProps
}) => {
  const { quotaTypeModels, vendorModels, tagModels } = usePricingFilterCounts({
    models: categoryProps.models,
    filterGroup,
    filterQuotaType,
    filterEndpointType: categoryProps.filterEndpointType ?? 'all',
    filterVendor,
    filterTag,
    searchValue: categoryProps.searchValue,
  });

  const handleResetFilters = () =>
    resetPricingFilters({
      handleChange,
      setShowWithRecharge,
      setCurrency,
      setShowRatio,
      setViewMode,
      setFilterGroup,
      setFilterQuotaType,
      setFilterEndpointType,
      setFilterVendor,
      setFilterTag,
      setSortOrder,
      setCurrentPage,
      setTokenUnit,
    });

  return (
    <div className='mp-filters'>
      <PricingVendors
        layout='row'
        variant='pill'
        filterVendor={filterVendor}
        setFilterVendor={setFilterVendor}
        models={vendorModels}
        allModels={categoryProps.models}
        loading={loading}
        t={t}
      />
      <PricingTags
        layout='row'
        variant='pill'
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        models={tagModels}
        allModels={categoryProps.models}
        loading={loading}
        t={t}
      />
      <PricingQuotaTypes
        layout='row'
        variant='pill'
        filterQuotaType={filterQuotaType}
        setFilterQuotaType={setFilterQuotaType}
        models={quotaTypeModels}
        loading={loading}
        t={t}
      />
      <div className='mp-filter-row mp-filters-actions'>
        <button
          type='button'
          className='mp-view-btn'
          onClick={handleResetFilters}
        >
          {t('重置')}
        </button>
      </div>
    </div>
  );
};

export default PricingTopFilters;
