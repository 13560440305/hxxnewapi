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
import { Button, Card, Select } from '@douyinfe/semi-ui';
import PricingQuotaTypes from '../filter/PricingQuotaTypes';
import PricingVendors from '../filter/PricingVendors';
import PricingTags from '../filter/PricingTags';
import { resetPricingFilters } from '../../../../helpers/utils';
import { usePricingFilterCounts } from '../../../../hooks/model-pricing/usePricingFilterCounts';

/**
 * 模型广场顶部筛选栏：将左侧边栏的筛选条件全部置于页面顶部，图一布局
 */
const PricingTopFilters = ({
  handleChange,
  setShowWithRecharge,
  setCurrency,
  setShowRatio,
  setViewMode,
  filterGroup,
  setFilterGroup,
  handleGroupClick,
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
  const {
    quotaTypeModels,
    vendorModels,
    tagModels,
  } = usePricingFilterCounts({
    models: categoryProps.models,
    filterGroup,
    filterQuotaType,
    filterEndpointType: 'all',
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

  const sortOptions = [
    { value: 'latest', label: t('最新') },
    { value: 'price_asc', label: t('价格：低到高') },
    { value: 'price_desc', label: t('价格：高到低') },
  ];

  return (
    <Card className='pricing-top-filters w-full mb-4' bodyStyle={{ padding: 16 }}>
      {/* 图二布局：标签加粗在左，值在右，所有筛选在一个卡片中 */}
      <div className='flex flex-col gap-0'>
        <PricingVendors
          layout='row'
          filterVendor={filterVendor}
          setFilterVendor={setFilterVendor}
          models={vendorModels}
          allModels={categoryProps.models}
          loading={loading}
          t={t}
        />
        <PricingTags
          layout='row'
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          models={tagModels}
          allModels={categoryProps.models}
          loading={loading}
          t={t}
        />
        <PricingQuotaTypes
          layout='row'
          filterQuotaType={filterQuotaType}
          setFilterQuotaType={setFilterQuotaType}
          models={quotaTypeModels}
          loading={loading}
          t={t}
        />
        <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-0'>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
            <span className='font-semibold text-semi-color-text-0 flex-shrink-0'>
              {t('排序')}
            </span>
            <Select
              value={sortOrder}
              onChange={(v) => setSortOrder(v)}
              optionList={sortOptions}
              style={{ width: 160 }}
            />
          </div>
          <Button
            theme='solid'
            type='primary'
            size='small'
            onClick={handleResetFilters}
          >
            {t('重置')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PricingTopFilters;
