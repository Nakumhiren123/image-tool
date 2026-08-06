import { useEffect } from 'react';

const SEO_PRESETS = {
  default: {
    title: 'PicCraft — Free Online Image Converter, Compressor & Resizer (Target KB)',
    description: 'Compress image to 20KB, 50KB, 100KB with target size precision. Convert JPG, PNG, WEBP, AVIF, HEIC online. Resize passport photos instantly.',
    keywords: 'image converter, compress image to 50kb, image compressor, resize image online, convert jpg to png, heic to jpg, passport photo resizer',
    canonical: 'https://piccraft.app/',
  },
  convert: {
    title: 'Image Converter — Convert JPG, PNG, WEBP, AVIF, HEIC Online | PicCraft',
    description: 'Convert images to JPG, PNG, WEBP, AVIF, or GIF online for free. Fast batch image format converter with zero quality loss.',
    keywords: 'image converter, convert jpg to png, convert png to webp, convert heic to jpg, online format converter, avif converter',
    canonical: 'https://piccraft.app/#convert',
  },
  compress: {
    title: 'Image Compressor (Target 20KB, 50KB, 100KB) | PicCraft',
    description: 'Compress images to exact target KB size (20KB, 50KB, 100KB, 200KB). Intelligent binary search compression algorithm for exam documents & web.',
    keywords: 'compress image to 50kb, compress image to 20kb, target kb image compressor, reduce image size in kb, reduce photo size online',
    canonical: 'https://piccraft.app/#compress',
  },
  resize: {
    title: 'Passport & Document Photo Resizer Online | PicCraft',
    description: 'Resize photos to exact pixel dimensions, inches, or millimeters. Passport photo resizer for US, Schengen, Indian Passport, and online applications.',
    keywords: 'passport photo resizer, resize image online, resize photo to 3.5x4.5 cm, photo resizer for admission form, crop image dimensions',
    canonical: 'https://piccraft.app/#resize',
  },
};

export default function SEOHead({ activeTab }) {
  useEffect(() => {
    const preset = SEO_PRESETS[activeTab] || SEO_PRESETS.default;

    // Update Document Title
    document.title = preset.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', preset.description);

    // Update Meta Keywords
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.setAttribute('name', 'keywords');
      document.head.appendChild(metaKw);
    }
    metaKw.setAttribute('content', preset.keywords);

    // Update Open Graph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', preset.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', preset.description);

    // Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', preset.canonical);

  }, [activeTab]);

  return null; // Head manager component does not render markup in body
}
