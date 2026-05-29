import React, { useState, useEffect, useRef } from 'react';
import { Player } from '@remotion/player';
import { CanvasComposition } from './remotion/CanvasComposition';
import { 
  Upload, 
  Type, 
  Palette, 
  Image as ImageIcon, 
  Play, 
  Pause,
  Copy, 
  Check, 
  Code2, 
  Sparkles, 
  RefreshCw, 
  AlertCircle,
  FileCode,
  X,
  Type as FontIcon,
  Stamp,
  Sliders,
  Film,
  Download,
  Settings,
  Info,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

const defaultJsCode = `window.drawGraphic = function(ctx, width, height, logoImg, options) {
  const p = options.progress;
  
  // 1. Antigravity Deep Rich Dark Space Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#090B11');
  bgGrad.addColorStop(1, '#151928');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Spatial Grid / Floating Particles (Antigravity Parallax)
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSpacing = 40;
  const parallaxOffset = p * 15;
  for (let x = parallaxOffset % gridSpacing; x < width; x += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = parallaxOffset % gridSpacing; y < height; y += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Safe Area Margin Reference
  const margin = 72;
  const safeW = width - (margin * 2);
  const safeH = height - (margin * 2);

  // 4. Draw Brand Logo with Strict Aspect Ratio & Placement Rules
  if (logoImg) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, p * 2.5);
    const aspect = logoImg.width / logoImg.height;
    const logoHeight = 45;
    const logoWidth = logoHeight * aspect;
    
    // Centered placement inside safe area top boundary:
    const logoX = (width - logoWidth) / 2;
    const logoY = 72;
    
    // Soft under-glow for logo
    ctx.shadowColor = 'rgba(215, 31, 39, 0.4)';
    ctx.shadowBlur = 15;
    ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
    ctx.restore();
  } else {
    // Elegant fallback brand stamp with neon reflection
    ctx.save();
    ctx.globalAlpha = Math.min(1, p * 2.5);
    ctx.fillStyle = '#D71F27'; // Truckstop Red
    ctx.font = 'bold 22px "Inter, sans-serif"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.shadowColor = 'rgba(215, 31, 39, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText('TRUCKSTOP', width / 2, 72);
    ctx.restore();
  }

  // 5. Content Card Container (Floating Glassmorphism Card)
  ctx.save();
  const cardX = margin;
  const cardY = 190;
  const cardW = safeW;
  const cardH = 720;
  const radius = 28;

  // Animate card sliding up and fading in from bottom
  const slideProgress = Math.min(1, p * 1.3);
  const easedSlide = 1 - Math.pow(1 - slideProgress, 3); // Cubic Out
  const currentCardY = cardY + (1 - easedSlide) * 40;
  ctx.globalAlpha = Math.min(1, slideProgress);

  // Massive diffused soft drop shadow (Antigravity Floating Effect)
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;

  // Background Glass: Translucent deep slate card with blur illusion
  ctx.fillStyle = 'rgba(18, 21, 35, 0.75)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(cardX, currentCardY, cardW, cardH, radius);
  } else {
    ctx.rect(cardX, currentCardY, cardW, cardH);
  }
  ctx.fill();

  // Reset shadow for inner elements
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // High-fidelity thin neon accent border
  const borderGrad = ctx.createLinearGradient(cardX, currentCardY, cardX + cardW, currentCardY + cardH);
  borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
  borderGrad.addColorStop(0.5, 'rgba(215, 31, 39, 0.15)'); // Subtle Truckstop Red bleed
  borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // 6. Draw Dynamic Route Line Component (Glowing Neon Route)
  ctx.save();
  ctx.globalAlpha = Math.min(1, Math.max(0, (p - 0.2) * 1.5));
  
  const routeY = currentCardY + 95;
  const routeStartX = cardX + 80;
  const routeEndX = cardX + cardW - 80;
  const routeLength = routeEndX - routeStartX;
  
  // Outer Neon Glow for the active route line
  ctx.strokeStyle = 'rgba(215, 31, 39, 0.25)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(routeStartX, routeY);
  const drawProgress = Math.min(1, Math.max(0, (p - 0.2) * 1.8));
  ctx.lineTo(routeStartX + routeLength * drawProgress, routeY);
  ctx.stroke();

  // Primary Neon Red Core Line
  ctx.strokeStyle = '#D71F27';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(routeStartX, routeY);
  ctx.lineTo(routeStartX + routeLength * drawProgress, routeY);
  ctx.stroke();

  // Draw Origin Anchor Node
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(routeStartX, routeY, 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw Destination Anchor Node (Glows Red when progress hits it)
  if (drawProgress >= 1.0) {
    ctx.fillStyle = '#D71F27';
    ctx.shadowColor = 'rgba(215, 31, 39, 0.8)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(routeEndX, routeY, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Route Labels (Origin / Destination)
  ctx.save();
  ctx.globalAlpha = Math.min(1, Math.max(0, (p - 0.3) * 2));
  ctx.fillStyle = '#A0A5B5'; // Clean silver gray
  ctx.font = 'bold 18px "Inter, sans-serif"';
  ctx.textAlign = 'left';
  ctx.fillText('CHICAGO, IL', routeStartX, routeY - 24);
  ctx.textAlign = 'right';
  ctx.fillText('DALLAS, TX', routeEndX, routeY - 24);
  ctx.restore();

  // 7. Draw Animating Count-Up Stat (Glowing Neon Stat)
  ctx.save();
  const statProgress = Math.min(1, Math.max(0, (p - 0.4) * 1.8));
  const easedStat = 1 - Math.pow(1 - statProgress, 3);
  const targetStat = 98;
  const currentStat = Math.floor(targetStat * easedStat);
  
  ctx.textAlign = 'center';
  ctx.globalAlpha = Math.min(1, Math.max(0, (p - 0.4) * 2));
  
  // Neon Glow for Large Number
  ctx.shadowColor = 'rgba(215, 31, 39, 0.45)';
  ctx.shadowBlur = 20;
  ctx.font = '900 120px "Inter, sans-serif"'; 
  ctx.fillStyle = '#D71F27';
  ctx.fillText(currentStat + '%', width / 2, routeY + 145); 

  // Reset shadow for description label
  ctx.shadowBlur = 0;
  ctx.font = '600 20px "Inter, sans-serif"'; 
  ctx.fillStyle = '#E2E8F0'; // Smooth off-white
  ctx.fillText('ON-TIME FREIGHT DELIVERY', width / 2, routeY + 205); 
  ctx.restore();

  // 8. Render Ad Copy (Smooth sliding/fading Kinetic Typography)
  ctx.save();
  const textProgress = Math.min(1, Math.max(0, (p - 0.5) * 2));
  ctx.globalAlpha = textProgress;
  ctx.fillStyle = '#FFFFFF'; // High contrast white
  ctx.textAlign = 'center';
  ctx.font = '800 36px "' + options.customFontName + '"';
  
  const textY = routeY + 285;
  const words = options.adCopy.split(' ');
  let line = '';
  let currentY = textY;
  
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    if (metrics.width > 700 && n > 0) {
      ctx.fillText(line.trim(), width / 2, currentY);
      line = words[n] + ' ';
      currentY += 48;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), width / 2, currentY);
  ctx.restore();

  // 9. Draw Verified Trust Badge (Premium Glass Capsule with emerald glow)
  ctx.save();
  ctx.globalAlpha = Math.min(1, Math.max(0, (p - 0.7) * 2));
  
  const badgeY = currentCardY + cardH - 50 - 46;
  const badgeW = 240;
  const badgeH = 46;
  const badgeX = (width - badgeW) / 2;
  
  // Capsule body (Transparent green glassmorphism)
  ctx.fillStyle = 'rgba(31, 138, 76, 0.15)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 23);
  } else {
    ctx.rect(badgeX, badgeY, badgeW, badgeH);
  }
  ctx.fill();

  // Glow Border
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Text & Checkmark
  ctx.fillStyle = '#34D399'; // Vibrant emerald
  ctx.font = 'bold 15px "Inter, sans-serif"'; 
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✓ VERIFIED NETWORK', width / 2, badgeY + badgeH / 2);
  ctx.restore();
};`;

const App = () => {
  // Config & Keys
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [selectedModel, setSelectedModel] = useState('gemini-3.5-flash');
  const [customModel, setCustomModel] = useState('gemini-2.5-flash');
  
  // Sections toggle
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [showAssets, setShowAssets] = useState(true);
  const [showRenderStudio, setShowRenderStudio] = useState(true);

  // Brand Guideline States
  const [guidelineMode, setGuidelineMode] = useState('file'); 
  const [brandGuidelines, setBrandGuidelines] = useState('');
  const [markdownGuidelines, setMarkdownGuidelines] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [fileGuidelines, setFileGuidelines] = useState('');

  // Asset States
  const [customFont, setCustomFont] = useState(null);
  const [customFontName, setCustomFontName] = useState('BrandHeadingFont');
  const [logoPreview, setLogoPreview] = useState(null);

  // Other Input States (Kept for internal compatibility but hidden from the UI)
  const [adCopy, setAdCopy] = useState('Verify partners and move freight with confidence.');
  const [referenceType, setReferenceType] = useState('text'); 
  const [layoutDescription, setLayoutDescription] = useState('Clean minimal light layout with Truckstop branding');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [brandTone, setBrandTone] = useState('modern');

  // Animation States
  const [durationInSeconds, setDurationInSeconds] = useState(5);
  
  // Generation & Editor States
  const [generatedCode, setGeneratedCode] = useState(defaultJsCode);
  const [editingCode, setEditingCode] = useState(defaultJsCode);
  const [designExplanation, setDesignExplanation] = useState('This is a modern premium slate-indigo animated mockup.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Video Rendering States
  const [isRenderingVideo, setIsRenderingVideo] = useState(false);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState(null);
  const [renderError, setRenderError] = useState(null);
  
  const playerRef = useRef(null);

  // Save API Key
  const handleApiKeyChange = (e) => {
    const val = e.target.value;
    setApiKey(val);
    localStorage.setItem('gemini_api_key', val);
  };

  // Sync editing code with generated code on change
  useEffect(() => {
    setEditingCode(generatedCode);
  }, [generatedCode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFontUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCustomFont(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogoPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
        setError("Please upload a .md or .txt file.");
        return;
      }
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileGuidelines(event.target.result);
        setError(null);
      };
      reader.readAsText(file);
    }
  };

  const removeMdFile = () => {
    setUploadedFileName('');
    setFileGuidelines('');
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const fetchWithRetry = async (url, options, retries = 5, backoff = 1000) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        let errMsg = `HTTP error! status: ${response.status}`;
        const isTransient = response.status === 429 || response.status >= 500;
        try {
          const errData = await response.json();
          if (errData?.error?.message) {
            errMsg = errData.error.message;
          }
        } catch (_) {}
        const errorObj = new Error(errMsg);
        errorObj.isTransient = isTransient;
        throw errorObj;
      }
      return await response.json();
    } catch (err) {
      const shouldRetry = retries > 0 && (
        err.isTransient || 
        err.message.includes('Failed to fetch') || 
        err.message.includes('NetworkError')
      );
      if (shouldRetry) {
        await new Promise(res => setTimeout(res, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
      throw err;
    }
  };

  const generateDesign = async () => {
    if (!apiKey) {
      setError("Please input your Gemini API Key in the settings panel to continue.");
      return;
    }

    let resolvedGuidelines = "";
    if (guidelineMode === 'text') resolvedGuidelines = brandGuidelines;
    else if (guidelineMode === 'markdown') resolvedGuidelines = markdownGuidelines;
    else if (guidelineMode === 'file') resolvedGuidelines = fileGuidelines;

    if (!resolvedGuidelines) {
      setError(`Please provide brand guidelines.`);
      return;
    }
    if (!adCopy) {
      setError(`Please provide ad copy.`);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedCode('');
    setDesignExplanation('');
    setRenderedVideoUrl(null);

    try {
      let parts = [];
      
      const systemPrompt = `You are a professional Creative Technologist specializing in interactive Canvas API motion graphics and Remotion.
Generate valid, premium JavaScript code for a 1080x1080 social media animation.

CRITICAL TECHNICAL RULES:
1. Define a function: drawGraphic(ctx, width, height, logoImg, options). Do NOT wrap it in a class or change the signature.
2. Output ONLY a valid JSON object with keys 'jsCode' and 'designExplanation'.
3. OPTIONS ARGUMENT (Crucial for Animation):
   The 'options' argument is passed automatically on every frame and contains:
   { progress, frame, fps, durationInFrames, adCopy, customFontName }
   - progress: a floating number from 0.0 to 1.0 representing the video timeline.
   - You MUST use options.progress to animate elements (positions, opacity, rotation, scales, colors).
   - Use options.adCopy to render the text.
   - For HEADLINE: You MUST use options.customFontName.
   - For SECONDARY FONTS (ALL other text like subheadings, body text, stats numbers, percentage units, labels, badges, buttons, etc.): You MUST strictly and exclusively use '\"Inter\", sans-serif'. Do not use any other font family!
4. MANDATORY: Path2D objects DO NOT have .fill() or .stroke() methods. You MUST use ctx.fill(path) or ctx.stroke(path).
5. Animation must be fluid, smooth, and extremely professional (e.g. kinetic typography, sliding panels, fading overlays, rotating accents, glowing elements).

STRICT LOGO ASPECT RATIO & PLACEMENT RULES:
- ASPECT RATIO: Never stretch the logo! Use the logo image's native aspect ratio:
  const aspect = logoImg.width / logoImg.height; const logoHeight = 45; const logoWidth = logoHeight * aspect;
- PLACEMENT: The logo MUST only be placed in one of two places:
  1. TOP-CENTER (if the rest of the layout/design is centered). Place at:
     const logoX = (width - logoWidth) / 2; const logoY = 72;
  2. TOP-LEFT (if the rest of the layout/design is left-aligned). Place at:
     const logoX = 72; const logoY = 72;
  - NEVER place the logo in the middle, in the bottom, or floating between design elements.
  - The top of the logo bounding box must be exactly at y = 72 (the safe area boundary).

STRICT NUMERIC & PERCENTAGE COUNT-UP ANIMATION RULES:
- For any numbers, stats, metrics, or percentages (e.g., '98%', '30 yrs', '$2.85/mi', '4x') in the copy or cards, you MUST programmatically animate them!
- Use a count-up animation from 0 to the target number based on options.progress. E.g.
  const easedProgress = 1 - Math.pow(1 - Math.min(1, options.progress * 1.5), 3); (Cubic Out easing)
  const currentStat = Math.floor(targetNumber * easedProgress);
- Draw the numeric value and the units cleanly together.
- DYNAMIC COLOR EXTRACTION & ANTIGRAVITY AESTHETICS:
  * Extract the brand colors (hex color codes) from the uploaded brand guidelines file dynamically. Use them for background, text, shapes, and badges.
  * ANTIGRAVITY AESTHETICS: Incorporate spatial depth and weightless glassmorphism! Cards must appear to float using massive, soft, layered drop shadows (e.g. shadowColor='rgba(0,0,0,0.45)', shadowBlur=40, shadowOffsetY=20).
  * Use a premium dark space-themed linear gradient background (e.g. '#090B11' to '#151928') or deep rich slate. Draw a subtle background grid of dots or lines ('rgba(255,255,255,0.03)') that reacts slightly to progress to show parallax depth.
  * Use translucent card fills ('rgba(18, 21, 35, 0.75)') with thin, high-fidelity glowing accent borders to create a glassy, premium feel.
  * Apply soft, glowing neon outlines around route lines, charts, large stats percentage numbers, and badges using shadowBlur and brand color glow anchors. Keep text highly readable, clean, and professional with high contrast (pure white/silver on dark glass).

STRICT ART DIRECTION AND DESIGN RULES (1080x1080 social media design):
- SAFE AREA & BORDER MARGINS: Ensure all key content (text, stats, CTAs, cards, charts) is strictly kept inside the safe area:
  * Top: 72px, Right: 72px, Bottom: 72px, Left: 72px. Working content area is exactly 936x936px.
  * Never let any text, logo, CTA, or critical visuals extend outside the safe area or touch the canvas edges!
- GRID SYSTEM & STRICT VERTICAL SPACING (ZERO COLLISION LAYOUTS):
  * Structure layouts cleanly with columns, rows, alignment rules, and gaps.
  * Spacing Gaps: Spacing between sections must be generous. Tight = 24px, standard = 32px, premium = 48px, hero = 64px.
  * LOGO SPACING: Ensure there is a massive visual gap (at least 100px to 130px) between the logo at y = 72 and any content card or title beneath it. Main content cards or top elements must start no higher than 'y = 220'.
  * STRICT COORDINATE BUDGETING & VERTICAL FLOW:
    - Never hardcode absolute static coordinates for succeeding elements that could collide.
    - Track vertical positions dynamically using a currentY tracker, or place elements inside separate, mathematically bounded zones.
    - If a card container is used, it should start at cardY = 200 to 240, and have a maximum height of 680 to 720 so that its bottom edge (cardY + cardH) never exceeds y = 920. This leaves a safe bottom border margin of at least 88px.
    - Inside the Card (padding of 50px): Content starts at y = cardY + 50.
    - Top graphics (e.g. route lines, charts, icons) should have a bounded y range (e.g. y = cardY + 80 to cardY + 160).
    - Hero Stats (e.g. large numbers) should sit around y = cardY + 230 to cardY + 310.
    - Multi-line Ad Copy / Headline: Starts at y = cardY + 360. Loop through words, measure text bounds, wrap lines cleanly, and calculate the ending Y coordinate of the text dynamically:
      let textEndY = textStartY + (lineCount * lineSpacing);
    - Badges or CTAs: MUST never collide with the text block above! Anchor them strictly:
      a) Either bottom-anchored to the card bottom: e.g. badgeY = cardY + cardH - 60 - badgeH;
      b) Or placed dynamically relative to textEndY: e.g. badgeY = textEndY + 60;
    - If copy is extremely long and would overflow, automatically scale down text sizes (e.g. headline to 30px, stats to 80px) in the generated canvas code to ensure everything fits inside the card without clipping, border contact, or overlaps!
- TYPOGRAPHY & SCALING:
  * Headline / Main copy: 32px–42px (Text width max: 700px) - ONLY this is permitted to use the custom font.
  * Secondary Elements (ALL other texts, subheadlines, body labels, stats, numbers, percentages, route points, CTAs, badges): 18px–28px - MUST strictly and exclusively use the secondary font '\"Inter\", sans-serif'.
  * Hero Stat: 110px–130px (Stat gets the most visual weight, must strictly use '\"Inter\", sans-serif')
  * CTA / Buttons: 20px–26px
  * Ensure line breaks are balanced (no widows/orphans, no collisions, no overlapping lines).
- CTA BUTTON GENERATION RULE:
  * Only include a CTA button if a clear CTA is explicitly present in the user copy (e.g. "Register Now", "Learn More").
  * If no CTA is present in the copy: Do not generate a button, do not invent text, do not reserve button space! Instead, redistribute space to graphics, content, or clean margin padding.
- DESIGN LAYOUT INTELLIGENCE (Choose based on copy style):
  1. Single Big Stat: Headline (top), Hero number (middle), Explanation (bottom). Visual column optional (max 30% width, min 48px gap, never behind text).
  2. 2-4 Key Stats: Grid cards (2 stats = 2 cols, 3 stats = 3 cols, 4 stats = 2x2 grid). Gap = 24px, card padding = 32px, equal heights. Number on top, label below.
  3. 5+ Data Points: Chart-first layout. Headline (top), flexible chart container (middle, 60-70% height), legend/takeaway below.
  4. Distribution: Centered Donut/Pie/Stacked chart (max width 420px) in middle, legend stacked with 20px gaps below.
  5. Before/After: 2-column grid. Left = Before, Right = After. Gap = 48px, equal widths.
  6. Timeline/Process: Column-based layout (3 steps = 3 cols, 4-5 steps = vertical stack). Gap = 28px. Step cards have auto-height.
  7. Risk/Insight: Editorial Split (Text column = 60%, visual column = 40% with a 48px-72px gap). Visual is softened/abstract, never behind text.
- BACKGROUND: Keep background clean, light, or solid neutral. Use soft contrast and solid overlays if busy.
- CARD / CONTAINER RULES: Minimum card padding = 32px (preferred 40px). No text within 24px of border. No card overflows.
- STRICT AVOID: Overlapping, cropped text, invented CTAs, misaligned cards, elements touching canvas edges, crowded layout, or cheap template feel.
- ANIMATION FLOW: Transition elements cleanly based on options.progress (0.0 to 1.0) using easing (e.g. smooth sliding in from safe area boundaries, cards fading in, stats count-up, charts expanding, accents rotating gently).
`;


      let userPromptText = `
        Brand Guidelines: ${resolvedGuidelines}
        Ad Copy: ${adCopy}
        Logo Provided: ${logoPreview ? 'Yes' : 'No'}
        Custom Heading Font Active: ${customFont ? 'Yes' : 'No'}
        Layout Instruction: Analyze the brand guidelines and ad copy, select the most matching layout strategy (Single Big Stat, 2-4 Key Stats, Editorial Split, timeline, or route line) based on the copy content. Draw a high-fidelity visual matching the guidelines. Apply smooth animations to all visual elements based on options.progress. IMPORTANT: If there is a number or percentage in the copy, draw it beautifully and count it up programmatically using options.progress (from 0 to target). Put the logo strictly at y = 72 at TOP-CENTER (if centered) or TOP-LEFT (if left-aligned).
      `;

      parts.push({ text: userPromptText });

      const payload = {
        contents: [{ parts }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              jsCode: { type: "STRING" },
              designExplanation: { type: "STRING" }
            },
            required: ["jsCode", "designExplanation"]
          }
        }
      };

      const modelToUse = selectedModel === 'custom' ? customModel.trim() : selectedModel;
      
      const result = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      const textOutput = result.candidates[0].content.parts[0].text;
      const parsedResponse = JSON.parse(textOutput);
      
      if (parsedResponse.jsCode) {
        setGeneratedCode(parsedResponse.jsCode);
        setDesignExplanation(parsedResponse.designExplanation || 'Design generated successfully!');
      } else {
        throw new Error("No drawing code returned from model.");
      }

    } catch (err) {
      console.error(err);
      const errMsg = err.message || String(err);
      if (errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('limit') || errMsg.toLowerCase().includes('exceeded')) {
        setError(
          <div className="space-y-2">
            <span className="font-extrabold text-sm block">⚠️ Google Free Tier Quota Exceeded</span>
            <span className="block text-[11px] leading-normal opacity-90">
              The model <strong>{selectedModel}</strong> has temporarily reached its capacity or daily free request limits on your API key.
            </span>
            <div className="bg-slate-950/40 p-2.5 rounded-xl border border-rose-500/10 text-[10px] space-y-1 text-slate-300 font-medium">
              <p className="font-bold text-rose-300">Quick Resolutions:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>💡 <strong>Switch to Gemini 1.5 Flash:</strong> Use the model dropdown in the sidebar. It has independent free-tier limits and is highly available.</li>
                <li>⏳ <strong>Wait 60 Seconds:</strong> Free-tier rate limits are rolling per minute. Trying again shortly will unblock you.</li>
                <li>💳 <strong>Billing Upgrade:</strong> Add a billing account to Google AI Studio to unlock pay-as-you-go keys with near-infinite limits.</li>
              </ul>
            </div>
            <span className="block text-[9px] font-mono opacity-50 pt-1 truncate">Raw Error: {errMsg}</span>
          </div>
        );
      } else {
        setError(`AI Generation failed: ${errMsg}. Please ensure guidelines are not too large and your API key is correct.`);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(editingCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const applyLiveEdits = () => {
    setGeneratedCode(editingCode);
  };

  // Trigger Video Compilation on Local Server
  const renderVideo = async () => {
    setIsRenderingVideo(true);
    setRenderError(null);
    setRenderedVideoUrl(null);

    try {
      const payload = {
        jsCode: generatedCode,
        logoPreview,
        customFont,
        customFontName,
        adCopy,
        brandTone,
        durationInSeconds,
        fps: 30
      };

      const response = await fetch('http://localhost:5001/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Server error during render.');
      }

      const data = await response.json();
      if (data.success) {
        setRenderedVideoUrl(data.videoUrl);
      } else {
        throw new Error('Video render failed.');
      }
    } catch (err) {
      console.error(err);
      setRenderError("Rendering failed. Ensure the local server is running on port 5001: " + err.message);
    } finally {
      setIsRenderingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090b11] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-12">
      {/* Header Panel */}
      <header className="border-b border-slate-900 bg-[#0d0f17]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Motion Graphics Studio
            </h1>
            <p className="text-xs text-slate-500 font-medium">Programmatic Social Video Creator with Remotion & Canvas</p>
          </div>
        </div>

        {/* Dynamic API settings */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#131622] px-3 py-2 rounded-2xl border border-slate-800">
            <Settings className="w-4 h-4 text-slate-400" />
            <input 
              type="password" 
              placeholder="Gemini API Key..."
              value={apiKey}
              onChange={handleApiKeyChange}
              className="bg-transparent text-xs text-slate-300 placeholder-slate-600 focus:outline-none w-48"
            />
          </div>
          <button 
            onClick={generateDesign}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-indigo-600/15 active:scale-95 transition-all"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isGenerating ? 'Generating...' : 'Generate Motion'}
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Collapsible Brand Guidelines Section */}
          <div className="bg-[#0e111a] rounded-3xl border border-slate-900 overflow-hidden shadow-xl">
            <button 
              onClick={() => setShowGuidelines(!showGuidelines)}
              className="w-full p-5 flex items-center justify-between border-b border-slate-900 bg-slate-950/20"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Brand Guidelines</h2>
              </div>
              {showGuidelines ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </button>
            
            {showGuidelines && (
              <div className="p-5 space-y-4 animate-in fade-in duration-200">
                <div className="flex bg-[#161a29] p-1 rounded-xl border border-slate-900">
                  {['text', 'markdown', 'file'].map(mode => (
                    <button 
                      key={mode}
                      onClick={() => setGuidelineMode(mode)}
                      className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all capitalize ${guidelineMode === mode ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {guidelineMode === 'text' && (
                  <textarea 
                    className="w-full h-32 p-3 bg-[#131622] text-slate-300 border border-slate-900 rounded-xl focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all resize-none text-xs custom-scrollbar"
                    placeholder="Enter visual guidelines, primary colors (hex), and tone descriptions..."
                    value={brandGuidelines}
                    onChange={(e) => setBrandGuidelines(e.target.value)}
                  />
                )}

                {guidelineMode === 'markdown' && (
                  <textarea 
                    className="w-full h-32 p-3 bg-[#0d0f17] text-emerald-400 font-mono border border-slate-900 rounded-xl focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all resize-none text-[10px] custom-scrollbar"
                    placeholder="# Brand Kit&#10;Primary: #6366f1&#10;Secondary: #f43f5e"
                    value={markdownGuidelines}
                    onChange={(e) => setMarkdownGuidelines(e.target.value)}
                  />
                )}

                {guidelineMode === 'file' && (
                  <div className="relative group">
                    {uploadedFileName ? (
                      <div className="w-full h-32 border border-indigo-500/20 bg-indigo-500/5 rounded-xl flex flex-col items-center justify-center p-4">
                        <FileCode className="w-8 h-8 text-indigo-400 mb-2" />
                        <span className="text-xs font-bold text-indigo-300 truncate w-full text-center">{uploadedFileName}</span>
                        <button 
                          onClick={removeMdFile}
                          className="mt-3 text-[10px] text-rose-400 font-bold hover:underline flex items-center gap-1"
                        >
                          <X className="w-3 h-3" /> Remove File
                        </button>
                      </div>
                    ) : (
                      <>
                        <input type="file" accept=".md,.txt" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full h-32 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 bg-[#131622] text-slate-500 group-hover:border-indigo-500/50 group-hover:text-slate-400 transition-all">
                          <Upload className="w-6 h-6" />
                          <span className="text-xs font-bold uppercase tracking-tighter">Upload design.md</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Collapsible Asset Management Section */}
          <div className="bg-[#0e111a] rounded-3xl border border-slate-900 overflow-hidden shadow-xl">
            <button 
              onClick={() => setShowAssets(!showAssets)}
              className="w-full p-5 flex items-center justify-between border-b border-slate-900 bg-slate-950/20"
            >
              <div className="flex items-center gap-3">
                <Stamp className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Brand Assets</h2>
              </div>
              {showAssets ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </button>
            
            {showAssets && (
              <div className="p-5 space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest">Custom Brand Font</label>
                  <div className="relative h-12">
                    <input type="file" accept=".ttf,.otf,.woff" onChange={handleFontUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className={`w-full h-full border rounded-xl flex items-center px-4 gap-3 transition-all ${customFont ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-slate-800 bg-[#131622]'}`}>
                      <FontIcon className={`w-4 h-4 ${customFont ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <span className="text-xs text-slate-400 truncate">
                        {customFont ? 'Font Loaded Successfully' : 'Upload TTF, OTF, or WOFF'}
                      </span>
                    </div>
                  </div>
                  {customFont && (
                    <div className="mt-2">
                      <input 
                        type="text" 
                        value={customFontName}
                        onChange={(e) => setCustomFontName(e.target.value)}
                        placeholder="Font family name..."
                        className="w-full px-3 py-1.5 bg-[#161a29] border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest">Brand Logo</label>
                  <div className="relative h-24">
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className={`w-full h-full border rounded-xl flex items-center justify-center overflow-hidden transition-all ${logoPreview ? 'border-indigo-500/30 bg-[#131622]' : 'border-slate-800 bg-[#131622]'}`}>
                      {logoPreview ? (
                        <div className="relative w-full h-full p-2 flex items-center justify-center bg-slate-900/50">
                          <img src={logoPreview} className="max-h-full max-w-full object-contain" alt="Logo" />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setLogoPreview(null);
                            }}
                            className="absolute top-1 right-1 p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/20"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-slate-500">
                          <ImageIcon className="w-5 h-5 mb-1 text-slate-600" />
                          <span className="text-[10px] font-bold uppercase tracking-wide">Upload PNG / SVG</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ad Copy Section */}
          <div className="bg-[#0e111a] rounded-3xl border border-slate-900 p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Type className="w-4 h-4 text-indigo-400" />
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ad Copy</label>
            </div>
            <textarea 
              className="w-full h-24 p-3 bg-[#131622] text-slate-300 border border-slate-900 rounded-xl focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all resize-none text-xs custom-scrollbar"
              placeholder="Text copy for the motion graphic..."
              value={adCopy}
              onChange={(e) => setAdCopy(e.target.value)}
            />
          </div>

          {/* Controls & Tone Settings */}
          <div className="bg-[#0e111a] rounded-3xl border border-slate-900 p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Motion Style Kit</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">AI Model Selection</label>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#131622] border border-slate-900 rounded-xl text-xs text-slate-350 focus:outline-none focus:border-indigo-500/50 font-medium"
                >
                  <option value="gemini-3.5-flash">Gemini 3.5 Flash (Recommended Default)</option>
                  <option value="gemini-3-flash-preview">Gemini 3 Flash (Preview)</option>
                  <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Advanced Preview)</option>
                  <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (High-Fidelity Reasoning)</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ultra Stable)</option>
                  <option value="custom">Custom Model Identifier...</option>
                </select>
                {selectedModel === 'custom' && (
                  <div className="mt-2 animate-in slide-in-from-top-1 duration-150">
                    <input 
                      type="text" 
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      placeholder="e.g. gemini-2.0-flash-exp"
                      className="w-full px-3 py-1.5 bg-[#161a29] border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50 font-mono"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">Duration</label>
                <select 
                  value={durationInSeconds}
                  onChange={(e) => setDurationInSeconds(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#131622] border border-slate-900 rounded-xl text-xs text-slate-350 focus:outline-none focus:border-indigo-500/50 font-medium"
                >
                  <option value={3}>3 Seconds</option>
                  <option value={5}>5 Seconds</option>
                  <option value={8}>8 Seconds</option>
                  <option value={10}>10 Seconds</option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-rose-500/10 text-rose-400 p-4 rounded-2xl flex items-start gap-3 border border-rose-500/20 animate-in zoom-in-95">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold leading-relaxed">{error}</p>
            </div>
          )}
        </div>

        {/* Center Panel - Remotion Player & Code Editor (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Remotion Player Preview Card */}
          <section className="bg-[#0e111a] p-5 rounded-[2rem] shadow-xl border border-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Interactive Player Workspace</h2>
              </div>
              <span className="text-[9px] font-bold tracking-widest text-slate-500 bg-[#131622] border border-slate-800 px-3 py-1 rounded-full uppercase">
                1080x1080 @30 FPS
              </span>
            </div>

            {/* Embed Remotion Player */}
            <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-900 relative shadow-inner">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4">
                  <RefreshCw className="w-12 h-12 text-indigo-400 animate-spin" />
                  <p className="text-slate-400 font-bold tracking-widest animate-pulse text-xs uppercase">AI is scripting motion...</p>
                </div>
              ) : generatedCode ? (
                <Player
                  ref={playerRef}
                  component={CanvasComposition}
                  durationInFrames={durationInSeconds * 30}
                  fps={30}
                  compositionWidth={1080}
                  compositionHeight={1080}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  inputProps={{
                    jsCode: generatedCode,
                    logoPreview,
                    customFont,
                    customFontName,
                    adCopy,
                    brandTone
                  }}
                  controls
                  loop
                />
              ) : (
                <div className="text-center p-10 opacity-60">
                  <Film className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                  <p className="text-xs text-slate-500 font-bold max-w-xs mx-auto uppercase tracking-wide">Generate code to trigger motion playback</p>
                </div>
              )}
            </div>
          </section>

          {/* Source Code Editor Panel */}
          <section className="bg-[#0e111a] rounded-[2rem] shadow-xl border border-slate-900 overflow-hidden">
            <div className="flex items-center justify-between p-5 bg-slate-950/20 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <h2 className="text-slate-300 font-bold text-xs tracking-wider uppercase">Motion Controller Script</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={applyLiveEdits}
                  className="px-4 py-1.5 bg-[#161a29] hover:bg-slate-800 text-indigo-400 text-xs font-bold rounded-xl border border-slate-850 active:scale-95 transition-all"
                >
                  Apply Changes
                </button>
                <button 
                  onClick={copyCode}
                  className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copySuccess ? 'Copied' : 'Copy JS'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Code TextArea Editor (8 Cols) */}
              <div className="md:col-span-8 border-r border-slate-900">
                <textarea 
                  value={editingCode}
                  onChange={(e) => setEditingCode(e.target.value)}
                  className="w-full h-80 p-5 bg-[#080a0f] text-emerald-400 font-mono text-[11px] leading-relaxed focus:outline-none custom-scrollbar"
                />
              </div>

              {/* Explanations Panel (4 Cols) */}
              <div className="md:col-span-4 p-5 bg-[#090b10] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-indigo-400">
                    <Info className="w-4 h-4" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">AI Rationale</h4>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed custom-scrollbar max-h-48 overflow-y-auto">
                    {designExplanation || 'AI generated creative layout strategies will display here.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900/50 mt-4">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                    Directives
                  </span>
                  <p className="text-[10px] text-slate-500 italic leading-snug">
                    Modify drawGraphic directly. Tap "Apply Changes" to hot-reload the canvas player instantly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Video Compile / Export Card */}
          <div className="bg-[#0e111a] rounded-[2rem] border border-slate-900 overflow-hidden shadow-xl">
            <button 
              onClick={() => setShowRenderStudio(!showRenderStudio)}
              className="w-full p-5 flex items-center justify-between bg-slate-950/20"
            >
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Export Studio</h2>
              </div>
              {showRenderStudio ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </button>

            {showRenderStudio && (
              <div className="p-6 border-t border-slate-900 bg-slate-950/10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Compile to MP4 Video</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Send your custom drawing function and asset bundle to the local rendering engine. Remotion will spawn headless Chromium to export a high-fidelity MP4 directly to your workspace.
                    </p>
                  </div>
                  
                  <button 
                    onClick={renderVideo}
                    disabled={isRenderingVideo || isGenerating || !generatedCode}
                    className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-600/10 disabled:cursor-not-allowed active:scale-95"
                  >
                    {isRenderingVideo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Film className="w-4 h-4" />}
                    {isRenderingVideo ? 'Compiling Video...' : 'Export MP4 Video'}
                  </button>
                  
                  {renderError && (
                    <p className="text-[10px] font-bold text-rose-400 leading-normal bg-rose-500/5 border border-rose-500/10 p-3 rounded-lg">
                      {renderError}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center border border-slate-900 bg-slate-950/40 rounded-2xl h-44 overflow-hidden relative">
                  {isRenderingVideo ? (
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest animate-pulse">
                        Rendering Frame Canvas...
                      </p>
                    </div>
                  ) : renderedVideoUrl ? (
                    <div className="w-full h-full flex flex-col justify-between p-4">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" /> Render Complete
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">1080x1080</span>
                      </div>
                      
                      {/* Live exported video playback */}
                      <video 
                        src={renderedVideoUrl} 
                        controls 
                        className="max-h-24 w-auto mx-auto border border-slate-800 rounded-lg shadow-lg"
                      />

                      <a 
                        href={renderedVideoUrl} 
                        download
                        className="flex items-center justify-center gap-2 w-full py-2 bg-[#131622] hover:bg-slate-800 border border-slate-850 text-slate-300 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all"
                      >
                        <Download className="w-3.5 h-3.5" /> Download MP4 File
                      </a>
                    </div>
                  ) : (
                    <div className="text-center opacity-40">
                      <Film className="w-8 h-8 text-slate-800 mx-auto mb-2" />
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Export video to unlock downloads
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="max-w-7xl mx-auto mt-20 text-center text-slate-700 text-[9px] font-bold uppercase tracking-[0.4em] select-none border-t border-slate-950 pt-8">
        AI Dynamic Motion Graphics Studio • Programmatic Canvas Studio
      </footer>
    </div>
  );
};

export default App;
