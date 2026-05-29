import React, { useEffect, useRef, useState } from 'react';
import { useCurrentFrame, useVideoConfig, delayRender, continueRender } from 'remotion';

export const CanvasComposition = ({
  jsCode,
  logoPreview,
  customFont,
  customFontName = 'BrandHeadingFont',
  adCopy,
  brandTone = 'modern'
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const canvasRef = useRef(null);
  
  // Resources loading state (for Remotion rendering flow)
  const [handle] = useState(() => delayRender('Loading brand assets'));
  const [logoImage, setLogoImage] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load custom font dynamically
  useEffect(() => {
    if (customFont) {
      const newStyle = document.createElement('style');
      newStyle.id = 'dynamic-brand-font-composition';
      newStyle.appendChild(document.createTextNode(`
        @font-face {
          font-family: '${customFontName}';
          src: url(${customFont});
        }
      `));
      
      const existing = document.getElementById('dynamic-brand-font-composition');
      if (existing) existing.remove();
      document.head.appendChild(newStyle);

      // Verify the font is loaded in browser
      document.fonts.ready.then(() => {
        setFontLoaded(true);
      });
    } else {
      setFontLoaded(true);
    }
  }, [customFont, customFontName]);

  // Pre-load the logo image synchronously before rendering
  useEffect(() => {
    if (logoPreview) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setLogoImage(img);
      };
      img.onerror = () => {
        console.error('Failed to load logo in Remotion composition');
        setLogoImage(null);
      };
      img.src = logoPreview;
    } else {
      setLogoImage(null);
    }
  }, [logoPreview]);

  // Signal Remotion when everything is ready
  useEffect(() => {
    const isLogoReady = logoPreview ? logoImage !== null : true;
    if (isLogoReady && fontLoaded) {
      continueRender(handle);
    }
  }, [logoImage, logoPreview, fontLoaded, handle]);

  // Execute Canvas Code Frame-by-Frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset transformations and clear canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Compute dynamic parameters
    const progress = frame / durationInFrames;

    // Build options payload for the generated drawing function
    const options = {
      progress,
      frame,
      fps,
      durationInFrames,
      adCopy: adCopy || '',
      customFontName: customFont ? customFontName : 'Inter',
      brandTone: brandTone || 'modern'
    };

    try {
      // Safe execution wrapper for the AI-generated code
      const executionWrapper = `
        ${jsCode}
        if (typeof drawGraphic === 'function') {
          drawGraphic(ctx, width, height, logoImg, options);
        } else {
          throw new Error('drawGraphic function is missing from the generated code.');
        }
      `;

      // Instantiate drawing function dynamically
      const drawFunction = new Function('ctx', 'width', 'height', 'logoImg', 'options', executionWrapper);
      
      // Execute the frame drawing
      drawFunction(ctx, width, height, logoImage, options);
    } catch (err) {
      // Render clean error text on canvas for debugging
      ctx.fillStyle = '#ef4444';
      ctx.font = '24px monospace';
      ctx.fillText('Execution Error:', 50, 80);
      ctx.fillStyle = '#0f172a';
      ctx.font = '16px monospace';
      
      // Wrap text errors neatly
      const words = err.message.split(' ');
      let line = '';
      let y = 120;
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        if (metrics.width > width - 100 && n > 0) {
          ctx.fillText(line, 50, y);
          line = words[n] + ' ';
          y += 30;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 50, y);
    }
  }, [jsCode, logoImage, frame, width, height, fps, durationInFrames, adCopy, customFont, customFontName, brandTone]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full object-contain bg-white shadow-2xl rounded-3xl"
    />
  );
};
