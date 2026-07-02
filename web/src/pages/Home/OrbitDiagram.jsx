/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React, { useEffect, useRef } from 'react';

const PROVIDERS = [
  { name: 'OpenAI', angle: -90 },
  { name: 'Claude', angle: -50 },
  { name: 'Gemini', angle: -10 },
  { name: 'DeepSeek', angle: 30 },
  { name: 'Qwen', angle: 70 },
  { name: 'GLM', angle: 110 },
  { name: 'Kimi', angle: 150 },
  { name: 'Grok', angle: 190 },
  { name: 'Mistral', angle: 230 },
  { name: 'ERNIE', angle: 270 },
  { name: 'Spark', angle: 310 },
];

const CX = 240;
const CY = 240;
const R = 190;

const OrbitDiagram = () => {
  const linesRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    const linesG = linesRef.current;
    const nodesG = nodesRef.current;
    if (!linesG || !nodesG) return;

    linesG.innerHTML = '';
    nodesG.innerHTML = '';

    PROVIDERS.forEach((p, i) => {
      const rad = (p.angle * Math.PI) / 180;
      const x = CX + R * Math.cos(rad);
      const y = CY + R * Math.sin(rad);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      line.setAttribute('class', 'home-v2__node-line');
      line.setAttribute('d', `M${CX},${CY} L${x},${y}`);
      linesG.appendChild(line);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'home-v2__provider-node');
      const w = Math.max(58, p.name.length * 8 + 22);
      g.innerHTML = `
        <rect x="${x - w / 2}" y="${y - 13}" width="${w}" height="26" rx="8"></rect>
        <text x="${x}" y="${y + 4}" text-anchor="middle">${p.name}</text>
      `;
      nodesG.appendChild(g);

      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('r', '3');
      pulse.setAttribute('class', 'home-v2__node-pulse');

      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      anim.setAttribute('dur', '2.4s');
      anim.setAttribute('repeatCount', 'indefinite');
      anim.setAttribute('begin', `${i * 0.45}s`);
      anim.setAttribute('path', `M${CX},${CY} L${x},${y}`);
      pulse.appendChild(anim);

      const opacityAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      opacityAnim.setAttribute('attributeName', 'opacity');
      opacityAnim.setAttribute('values', '0;1;1;0');
      opacityAnim.setAttribute('dur', '2.4s');
      opacityAnim.setAttribute('repeatCount', 'indefinite');
      opacityAnim.setAttribute('begin', `${i * 0.45}s`);
      pulse.appendChild(opacityAnim);

      linesG.appendChild(pulse);
    });
  }, []);

  return (
    <div className='home-v2__orbit-wrap'>
      <svg viewBox='0 0 480 480' aria-hidden='true'>
        <defs>
          <radialGradient id='homeLineGrad' cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='#2F6FED' />
            <stop offset='100%' stopColor='#B9C6E6' stopOpacity='0.4' />
          </radialGradient>
        </defs>
        <circle
          cx={CX}
          cy={CY}
          r={120}
          stroke='var(--home-border)'
          strokeWidth='1'
          fill='none'
        />
        <circle
          cx={CX}
          cy={CY}
          r={190}
          stroke='var(--home-border)'
          strokeWidth='1'
          fill='none'
          strokeDasharray='2 6'
        />
        <g ref={linesRef} />
        <g>
          <circle cx={CX} cy={CY} r={34} fill='#fff' stroke='#2F6FED' strokeWidth='1.6' />
          <path
            d='M240 224 L244.8 235.2 L256 240 L244.8 244.8 L240 256 L235.2 244.8 L224 240 L235.2 235.2 Z'
            fill='#2F6FED'
          />
        </g>
        <g ref={nodesRef} />
      </svg>
    </div>
  );
};

export default OrbitDiagram;
