import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    // 更精确的路径匹配
    include: [
      /src\/components\/previews\/D3Components\/CodeEditor/,
      /src\/components\/previews\/D3Components\/VisualizationPreview/,
      /src\/components\/previews\/D3Components\/.+/ // 匹配 D3Components 目录下的所有组件
    ],
    exclude: [
      /node_modules/,
      /\.next/
    ],
    // 日志配置
    logOnDifferentValues: true,
    collapseGroups: true,
    titleColor: '#43a047',
    diffNameColor: '#0063a6',
    // 显示详细原因
    logOwnerReasons: true
  });
}
