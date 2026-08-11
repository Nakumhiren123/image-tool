const sharpService = require('../services/sharpService');
const fs = require('fs');

exports.convertImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const { format = 'png', quality = 80 } = req.body;
    const outputPath = await sharpService.convertImage(req.file.path, format, { quality });

    res.sendFile(outputPath, () => {
      // Clean up temp files
      fs.unlink(req.file.path, () => { });
      fs.unlink(outputPath, () => { });
    });
  } catch (err) {
    console.error('Convert controller error:', err);
    res.status(500).json({ error: 'Image conversion failed', details: err.message });
  }
};

exports.compressImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const { quality = 80, targetKB = null } = req.body;
    const outputPath = await sharpService.compressImage(req.file.path, parseInt(quality), targetKB ? parseInt(targetKB) : null);

    res.sendFile(outputPath, () => {
      fs.unlink(req.file.path, () => { });
      fs.unlink(outputPath, () => { });
    });
  } catch (err) {
    console.error('Compress controller error:', err);
    res.status(500).json({ error: 'Image compression failed', details: err.message });
  }
};

exports.resizeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const { width, height, maintainAspect = true } = req.body;
    const outputPath = await sharpService.resizeImage(req.file.path, width, height, maintainAspect === 'true' || maintainAspect === true);

    res.sendFile(outputPath, () => {
      fs.unlink(req.file.path, () => { });
      fs.unlink(outputPath, () => { });
    });
  } catch (err) {
    console.error('Resize controller error:', err);
    res.status(500).json({ error: 'Image resize failed', details: err.message });
  }
};
