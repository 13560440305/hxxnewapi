/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React from 'react';
import { Skeleton } from '@douyinfe/semi-ui';

const PricingCardSkeleton = ({ skeletonCount = 6 }) => {
  const placeholder = (
    <div className='mp-grid'>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className='mp-skeleton-card'>
          <div className='mp-card-header'>
            <Skeleton.Avatar size='small' style={{ width: 36, height: 36 }} />
            <div className='mp-card-meta' style={{ flex: 1 }}>
              <Skeleton.Title style={{ width: '70%', height: 14, marginBottom: 6 }} />
              <Skeleton.Title style={{ width: '45%', height: 12 }} />
            </div>
          </div>
          <div className='mp-pricing'>
            <Skeleton.Title style={{ width: '100%', height: 44 }} />
            <Skeleton.Title style={{ width: '100%', height: 44 }} />
          </div>
          <Skeleton.Title style={{ width: '60%', height: 20, marginTop: 8 }} />
        </div>
      ))}
    </div>
  );

  return <Skeleton loading active placeholder={placeholder} />;
};

export default PricingCardSkeleton;
