/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

/** 根据供应商/模型名推断卡片顶部色条样式 */
export const getProviderAccentClass = (model) => {
  const name = `${model?.vendor_name || ''} ${model?.model_name || ''}`.toLowerCase();

  if (/google|gemini/.test(name)) return 'provider-google';
  if (/openai|gpt|o1|o3|o4/.test(name)) return 'provider-openai';
  if (/zhipu|glm|智谱/.test(name)) return 'provider-zhipu';
  if (/minimax|abab/.test(name)) return 'provider-minimax';
  if (/anthropic|claude/.test(name)) return 'provider-anthropic';
  return 'provider-unknown';
};

/** 判断按量计费价格是否为免费 */
export const isFreeTokenPrice = (priceData) => {
  if (!priceData?.isPerToken) return false;
  const parseNum = (s) => parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0;
  return parseNum(priceData.inputPrice) === 0 && parseNum(priceData.completionPrice) === 0;
};

/** 供应商图标背景色 */
export const getProviderIconStyle = (accentClass) => {
  const map = {
    'provider-google': { background: '#F8FAFF' },
    'provider-openai': { background: '#F0FFF9' },
    'provider-zhipu': { background: '#F0EDFF', color: '#6C5CE7' },
    'provider-minimax': { background: '#FEF0F0', color: '#E74C3C', borderColor: '#FECACA' },
    'provider-anthropic': { background: '#FFF7F3', color: '#D97757' },
    'provider-unknown': { background: 'var(--mp-surface-1)' },
  };
  return map[accentClass] || map['provider-unknown'];
};
