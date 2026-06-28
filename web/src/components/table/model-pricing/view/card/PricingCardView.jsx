/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React from 'react';
import { Empty, Pagination, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from '@douyinfe/semi-illustrations';
import {
  Copy,
  Square,
  SquareCheck,
  ArrowRight,
  ArrowLeft,
  Coins,
  Gift,
  Sparkles,
} from 'lucide-react';
import {
  calculateModelPrice,
  getLobeHubIcon,
} from '../../../../../helpers';
import {
  getProviderAccentClass,
  isFreeTokenPrice,
  getProviderIconStyle,
} from '../../marketplaceUtils';
import PricingCardSkeleton from './PricingCardSkeleton';
import { useMinimumLoadingTime } from '../../../../../hooks/common/useMinimumLoadingTime';
import { renderLimitedItems } from '../../../../common/ui/RenderUtils';
import { useIsMobile } from '../../../../../hooks/common/useIsMobile';

const PricingCardView = ({
  filteredModels,
  loading,
  rowSelection,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  selectedGroup,
  groupRatio,
  copyText,
  setModalImageUrl,
  setIsModalOpenurl,
  currency,
  tokenUnit,
  displayPrice,
  showRatio,
  t,
  selectedRowKeys = [],
  setSelectedRowKeys,
  openModelDetail,
}) => {
  const showSkeleton = useMinimumLoadingTime(loading);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedModels = filteredModels.slice(
    startIndex,
    startIndex + pageSize,
  );
  const getModelKey = (model) => model.key ?? model.model_name ?? model.id;
  const isMobile = useIsMobile();

  const handleCheckboxChange = (model, e) => {
    e.stopPropagation();
    if (!setSelectedRowKeys) return;
    const modelKey = getModelKey(model);
    const checked = !selectedRowKeys.includes(modelKey);
    const newKeys = checked
      ? Array.from(new Set([...selectedRowKeys, modelKey]))
      : selectedRowKeys.filter((key) => key !== modelKey);
    setSelectedRowKeys(newKeys);
    rowSelection?.onChange?.(newKeys, null);
  };

  const getModelIcon = (model, accentClass) => {
    const iconStyle = getProviderIconStyle(accentClass);

    if (model?.icon) {
      return (
        <div className='mp-provider-icon' style={iconStyle}>
          {getLobeHubIcon(model.icon, 20)}
        </div>
      );
    }
    if (model?.vendor_icon) {
      return (
        <div className='mp-provider-icon' style={iconStyle}>
          {getLobeHubIcon(model.vendor_icon, 20)}
        </div>
      );
    }

    const avatarText = (model?.model_name || '?').slice(0, 2).toUpperCase();
    return (
      <div className='mp-provider-icon text-icon' style={iconStyle}>
        {avatarText}
      </div>
    );
  };

  const getModelSubtitle = (model) => {
    if (model.vendor_name) return model.vendor_name;
    return t('未知供应商');
  };

  const renderPriceBlock = (model, priceData) => {
    if (priceData.isPerToken) {
      const isFree = isFreeTokenPrice(priceData);
      const unitLabel = `/ ${priceData.unitLabel} tokens`;

      return (
        <div className='mp-pricing'>
          <div className='mp-price-item'>
            <div className='mp-price-dir'>
              <ArrowRight size={12} />
              {t('输入')}
            </div>
            <div className={`mp-price-val${isFree ? ' is-free' : ''}`}>
              {isFree ? (
                <>
                  {t('免费')}{' '}
                  <span className='mp-price-unit'>
                    {priceData.inputPrice} {unitLabel}
                  </span>
                </>
              ) : (
                <>
                  {priceData.inputPrice}{' '}
                  <span className='mp-price-unit'>{unitLabel}</span>
                </>
              )}
            </div>
          </div>
          <div className='mp-price-item'>
            <div className='mp-price-dir'>
              <ArrowLeft size={12} />
              {t('输出')}
            </div>
            <div className={`mp-price-val${isFree ? ' is-free' : ''}`}>
              {isFree ? (
                <>
                  {t('免费')}{' '}
                  <span className='mp-price-unit'>
                    {priceData.completionPrice} {unitLabel}
                  </span>
                </>
              ) : (
                <>
                  {priceData.completionPrice}{' '}
                  <span className='mp-price-unit'>{unitLabel}</span>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='mp-pricing'>
        <div className='mp-price-item' style={{ gridColumn: '1 / -1' }}>
          <div className='mp-price-dir'>{t('模型价格')}</div>
          <div className='mp-price-val'>{priceData.price}</div>
        </div>
      </div>
    );
  };

  const renderTags = (record, isFree) => {
    const tags = [];

    if (record.quota_type === 1) {
      tags.push(
        <span key='billing' className='mp-tag mp-tag-billing'>
          <Coins size={12} />
          {t('按次计费')}
        </span>,
      );
    } else if (record.quota_type === 0) {
      tags.push(
        <span key='billing' className='mp-tag mp-tag-billing'>
          <Coins size={12} />
          {t('按量计费')}
        </span>,
      );
    } else {
      tags.push(
        <span key='billing' className='mp-tag mp-tag-custom'>-</span>,
      );
    }

    if (isFree) {
      tags.push(
        <span key='free' className='mp-tag mp-tag-free'>
          <Gift size={12} />
          {t('免费')}
        </span>,
      );
    }

    const customTagElements = [];
    if (record.tags) {
      const tagArr = record.tags.split(',').filter(Boolean);
      tagArr.forEach((tg, idx) => {
        const trimmed = tg.trim();
        const isNewTag = /新|new/i.test(trimmed);
        customTagElements.push(
          <span
            key={`custom-${idx}`}
            className={`mp-tag ${isNewTag ? 'mp-tag-new' : 'mp-tag-custom'}`}
          >
            {isNewTag && <Sparkles size={12} />}
            {trimmed}
          </span>,
        );
      });
    }

    return (
      <div className='mp-card-footer-tags'>
        <div className='mp-tags'>{tags}</div>
        {customTagElements.length > 0 && (
          <div className='mp-tags mp-tags-custom'>
            {renderLimitedItems({
              items: customTagElements.map((el, idx) => ({
                key: `custom-${idx}`,
                element: el,
              })),
              renderItem: (item) => item.element,
              maxDisplay: 3,
            })}
          </div>
        )}
      </div>
    );
  };

  if (showSkeleton) {
    return (
      <PricingCardSkeleton rowSelection={!!rowSelection} showRatio={showRatio} />
    );
  }

  if (!filteredModels || filteredModels.length === 0) {
    return (
      <div className='flex justify-center items-center py-20'>
        <Empty
          image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
          darkModeImage={
            <IllustrationNoResultDark style={{ width: 150, height: 150 }} />
          }
          description={t('搜索无结果')}
        />
      </div>
    );
  }

  return (
    <div>
      <div className='mp-grid'>
        {paginatedModels.map((model, index) => {
          const modelKey = getModelKey(model);
          const isSelected = selectedRowKeys.includes(modelKey);
          const accentClass = getProviderAccentClass(model);

          const priceData = calculateModelPrice({
            record: model,
            selectedGroup,
            groupRatio,
            tokenUnit,
            displayPrice,
            currency,
          });

          const isFree = isFreeTokenPrice(priceData);
          const description = model.description || '';
          const shortId =
            model.model_name?.includes('/')
              ? model.model_name.split('/').pop()
              : model.model_name;

          return (
            <div
              key={modelKey || index}
              className={`mp-model-card ${accentClass}${isSelected ? ' selected' : ''}`}
              onClick={() => openModelDetail && openModelDetail(model)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openModelDetail?.(model);
                }
              }}
            >
              <div className='mp-card-header'>
                {getModelIcon(model, accentClass)}
                <div className='mp-card-meta'>
                  <div className='mp-model-name' title={model.model_name}>
                    {model.model_name}
                  </div>
                  <div className='mp-model-provider'>{getModelSubtitle(model)}</div>
                </div>
                <div className='mp-card-actions'>
                  <button
                    type='button'
                    className='mp-icon-btn'
                    title={t('复制')}
                    aria-label={t('复制')}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyText(model.model_name);
                    }}
                  >
                    <Copy size={14} />
                  </button>
                  {rowSelection && (
                    <button
                      type='button'
                      className={`mp-icon-btn${isSelected ? ' selected' : ''}`}
                      title={isSelected ? t('取消选择') : t('选择')}
                      aria-label={isSelected ? t('取消选择') : t('选择')}
                      onClick={(e) => handleCheckboxChange(model, e)}
                    >
                      {isSelected ? (
                        <SquareCheck size={14} />
                      ) : (
                        <Square size={14} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {renderPriceBlock(model, priceData)}

              {description && (
                <p className='mp-model-desc' title={description}>
                  {description}
                </p>
              )}

              <div className='mp-card-footer'>
                {renderTags(model, isFree)}
                <span className='mp-model-id' title={model.model_name}>
                  {shortId}
                </span>
              </div>

              {showRatio && (
                <div className='mp-ratio-block'>
                  <div className='flex items-center gap-1 mb-1'>
                    <span className='mp-ratio-title'>{t('倍率信息')}</span>
                    <Tooltip content={t('倍率是为了方便换算不同价格的模型')}>
                      <IconHelpCircle
                        className='mp-ratio-help'
                        size='small'
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalImageUrl?.('/ratio.png');
                          setIsModalOpenurl?.(true);
                        }}
                      />
                    </Tooltip>
                  </div>
                  <div className='mp-ratio-grid'>
                    <div>
                      {t('模型')}:{' '}
                      {model.quota_type === 0 ? model.model_ratio : t('无')}
                    </div>
                    <div>
                      {t('补全')}:{' '}
                      {model.quota_type === 0
                        ? parseFloat(model.completion_ratio.toFixed(3))
                        : t('无')}
                    </div>
                    <div>
                      {t('分组')}: {priceData?.usedGroupRatio ?? '-'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredModels.length > 0 && (
        <div className='mp-pagination'>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={filteredModels.length}
            showSizeChanger
            pageSizeOpts={[10, 20, 50, 100]}
            size={isMobile ? 'small' : 'default'}
            showQuickJumper={isMobile}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PricingCardView;
