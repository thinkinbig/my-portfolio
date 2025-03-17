/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

declare module 'react' {
  interface Component {
    whyDidYouRender?: boolean | {
      customName?: string;
      logOnDifferentValues?: boolean;
      logOwnerReasons?: boolean;
      ignorePaths?: string[];
      include?: RegExp[];
      exclude?: RegExp[];
    };
  }
}