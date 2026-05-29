import React from 'react';
import { registerRoot, Composition, getInputProps } from 'remotion';
import { CanvasComposition } from './CanvasComposition';

const Root = () => {
  // Retrieve input properties passed from the CLI or renderer
  const props = getInputProps() || {};

  return (
    <>
      <Composition
        id="CanvasComposition"
        component={CanvasComposition}
        durationInFrames={props.durationInFrames || 150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          jsCode: props.jsCode || `
            // Default preview graphic
            window.drawGraphic = function(ctx, width, height, logoImg, options) {
              const p = options.progress;
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(0, 0, width, height);
              
              ctx.fillStyle = '#6366f1';
              ctx.font = 'bold 48px sans-serif';
              ctx.fillText('Dynamic Motion Infographics', 100, 300 + p * 100);
            };
          `,
          logoPreview: props.logoPreview || null,
          customFont: props.customFont || null,
          customFontName: props.customFontName || 'BrandHeadingFont',
          adCopy: props.adCopy || 'Default Ad Copy Text',
          brandTone: props.brandTone || 'modern'
        }}
      />
    </>
  );
};

registerRoot(Root);
