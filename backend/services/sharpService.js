const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '../output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

class SharpService {
  /**
   * Convert image to target format
   */
  async convertImage(inputPath, targetFormat = 'png', options = {}) {
    const quality = parseInt(options.quality) || 80;
    const format = targetFormat.toLowerCase();
    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const outputPath = path.join(outputDir, `converted_${uniqueId}.${format}`);
    const outputExt = format === 'jpg' ? 'jpg' : format; //

    let pipeline = sharp(inputPath);

    switch (format) {
      case 'jpg':
        pipeline = pipeline.flatten({ background: '#ffffff' }).jpeg({ quality });
        break;
      case 'jpeg':                          // ← add this separate case
        pipeline = pipeline.flatten({ background: '#ffffff' }).jpeg({ quality });
        break;
      case 'png':
        pipeline = pipeline.png({ compressionLevel: Math.round((100 - quality) / 10) });
        break;
      case 'webp':
        pipeline = pipeline.webp({ quality });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality });
        break;
      case 'gif':
        pipeline = pipeline.resize({ width: 1000, withoutEnlargement: true }).gif({ colours: 128 });
        break;
      default:
        pipeline = pipeline.png();
        break;
    }

    await pipeline.toFile(outputPath);
    return outputPath;
  }

  /**
   * Compress image with target quality or binary search for target KB
   */
  async compressImage(inputPath, quality = 80, targetKB = null) {
    const format = 'jpeg';
    if (!targetKB) {
      return this.convertImage(inputPath, 'jpg', { quality });
    }

    const targetBytes = targetKB * 1024;
    let minQ = 5;
    let maxQ = 98;
    let bestPath = null;
    let iterations = 0;

    while (iterations < 7) {
      const midQ = Math.round((minQ + maxQ) / 2);
      iterations++;
      const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const currentPath = path.join(outputDir, `compress_search_${uniqueId}_q${midQ}.jpg`);
      await sharp(inputPath).flatten({ background: '#ffffff' }).jpeg({ quality: midQ }).toFile(currentPath);

      const stats = fs.statSync(currentPath);
      bestPath = currentPath;

      if (stats.size > targetBytes) {
        maxQ = midQ - 1;
      } else {
        minQ = midQ + 1;
        if (targetBytes - stats.size < targetBytes * 0.05) break;
      }
    }

    return bestPath;
  }

  /**
   * Resize image
   */
  async resizeImage(inputPath, width, height, maintainAspect = true) {
    const w = parseInt(width) || null;
    const h = parseInt(height) || null;
    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const outputPath = path.join(outputDir, `resized_${uniqueId}.png`);

    await sharp(inputPath)
      .resize({
        width: w,
        height: h,
        fit: maintainAspect ? sharp.fit.inside : sharp.fit.fill,
        withoutEnlargement: false
      })
      .toFile(outputPath);

    return outputPath;
  }
}

module.exports = new SharpService();
