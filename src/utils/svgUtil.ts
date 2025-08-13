// src/utils/svgUtil.ts
import { readFileSync } from 'fs';
import { join } from 'path';

// This function will load SVG content from a file
export const loadSvgContent = (name: string): string => {
  try {
    const path = join(__dirname, '..', 'assets', 'svg', `${name}.svg`);
    return readFileSync(path, 'utf8');
  } catch (error) {
    console.error(`Error loading SVG: ${name}`, error);
    return '';
  }
};
