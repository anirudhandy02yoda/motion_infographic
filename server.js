import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Ensure public/exports directory exists
const exportsDir = path.join(__dirname, 'public', 'exports');
if (!fs.existsSync(exportsDir)) {
  fs.mkdirSync(exportsDir, { recursive: true });
}

// Serve public directory statically
app.use(express.static(path.join(__dirname, 'public')));

// Serve the exports folder statically specifically
app.use('/exports', express.static(exportsDir));

app.post('/api/render', (req, res) => {
  const {
    jsCode,
    logoPreview,
    customFont,
    customFontName,
    adCopy,
    brandTone,
    durationInSeconds = 5,
    fps = 30
  } = req.body;

  const durationInFrames = durationInSeconds * fps;
  const filename = `render-${Date.now()}.mp4`;
  const outputPath = path.join(exportsDir, filename);
  const propsPath = path.join(__dirname, 'public', 'temp-props.json');

  // Write props file
  const props = {
    jsCode,
    logoPreview,
    customFont,
    customFontName,
    adCopy,
    brandTone,
    durationInFrames
  };

  try {
    fs.writeFileSync(propsPath, JSON.stringify(props, null, 2));
  } catch (err) {
    console.error('Failed to write temp-props.json:', err);
    return res.status(500).json({ error: 'Failed to write config', details: err.message });
  }

  console.log(`Starting Remotion render for ${filename}...`);

  // Execute Remotion CLI render. Under Windows, we use local binary or npx.cmd
  // We append path variables in the environment to make sure node is accessible.
  const cmd = `node_modules\\.bin\\remotion.cmd render src/remotion/entry.jsx CanvasComposition "${outputPath}" --props="${propsPath}"`;

  exec(cmd, { env: { ...process.env, PATH: process.env.PATH + ';C:\\Program Files\\nodejs' } }, (error, stdout, stderr) => {
    // Clean up props file
    try {
      if (fs.existsSync(propsPath)) {
        fs.unlinkSync(propsPath);
      }
    } catch (e) {
      console.error('Failed to delete temp props:', e);
    }

    if (error) {
      console.error(`Render error: ${error.message}`);
      console.error(stderr);
      return res.status(500).json({ error: 'Rendering failed', details: stderr || error.message });
    }

    console.log(`Render completed successfully: ${filename}`);
    res.json({
      success: true,
      videoUrl: `http://localhost:${PORT}/exports/${filename}`,
      filename
    });
  });
});

app.listen(PORT, () => {
  console.log(`Render backend server running at http://localhost:${PORT}`);
});
