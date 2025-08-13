declare module '*.svg' {
  import React from 'react';
  
  type SvgProps = {
    width?: number | string;
    height?: number | string;
    fill?: string;
    color?: string;
    [key: string]: any;
  };
  
  const content: React.FC<SvgProps>;
  export default content;
}
