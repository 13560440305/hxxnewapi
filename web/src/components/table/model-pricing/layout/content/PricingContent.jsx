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
import PricingTopFilters from '../PricingTopFilters';
import PricingTopSection from '../header/PricingTopSection';
import SearchActions from '../header/SearchActions';
import PricingView from './PricingView';

const PricingContent = ({ isMobile, sidebarProps, ...props }) => {
  const { t } = props;
  const filteredModels = props.filteredModels || [];
  const modelCount = filteredModels.length;

  return (
    <div
      className={
        isMobile
          ? 'pricing-content-mobile'
          : 'pricing-scroll-hide pricing-content-inner'
      }
    >
      {!isMobile ? (
        <>
          {/* 最顶部：模糊搜索行（筛选 + 输入框 + 全部: X 模型 + 复制/开关） */}
          <div className='pricing-search-header px-4 md:px-6 pt-4'>
            <SearchActions
              leftLabel={t('筛选')}
              rightLabel={`${t('全部')}: ${modelCount} ${t('模型')}`}
              isMobile={false}
              searchValue={sidebarProps.searchValue}
              handleChange={sidebarProps.handleChange}
              handleCompositionStart={sidebarProps.handleCompositionStart}
              handleCompositionEnd={sidebarProps.handleCompositionEnd}
              selectedRowKeys={sidebarProps.selectedRowKeys}
              copyText={sidebarProps.copyText}
              setShowFilterModal={sidebarProps.setShowFilterModal}
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
              t={t}
            />
          </div>
          {/* 筛选框：每种条件占一行 */}
          <div className='pricing-search-header px-4 md:px-6'>
            <PricingTopFilters {...sidebarProps} t={t} />
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

      {/* 可滚动的内容区域 */}
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
