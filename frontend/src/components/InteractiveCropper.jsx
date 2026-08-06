import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Interactive Visual Image Cropper Overlay matching iLoveIMG design
 */
export default function InteractiveCropper({ item, cropRect, setCropRect }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rect: { ...cropRect } });

  const origW = item?.width || 800;
  const origH = item?.height || 600;

  const getScale = () => {
    if (!imgRef.current) return 1;
    return imgRef.current.clientWidth / origW;
  };

  const handleMouseDown = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragType(type);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      rect: { ...cropRect },
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !imgRef.current) return;
    const scale = getScale();
    if (scale <= 0) return;

    const dx = Math.round((e.clientX - dragStart.x) / scale);
    const dy = Math.round((e.clientY - dragStart.y) / scale);

    const { x: initialX, y: initialY, width: initialW, height: initialH } = dragStart.rect;

    let newX = initialX;
    let newY = initialY;
    let newW = initialW;
    let newH = initialH;

    switch (dragType) {
      case 'move':
        newX = Math.max(0, Math.min(origW - initialW, initialX + dx));
        newY = Math.max(0, Math.min(origH - initialH, initialY + dy));
        break;

      case 'se':
        newW = Math.max(20, Math.min(origW - initialX, initialW + dx));
        newH = Math.max(20, Math.min(origH - initialY, initialH + dy));
        break;

      case 'sw': {
        const maxDxSw = initialW - 20;
        const clampedDxSw = Math.max(-initialX, Math.min(maxDxSw, dx));
        newX = initialX + clampedDxSw;
        newW = initialW - clampedDxSw;
        newH = Math.max(20, Math.min(origH - initialY, initialH + dy));
        break;
      }

      case 'ne': {
        const maxDyNe = initialH - 20;
        const clampedDyNe = Math.max(-initialY, Math.min(maxDyNe, dy));
        newY = initialY + clampedDyNe;
        newH = initialH - clampedDyNe;
        newW = Math.max(20, Math.min(origW - initialX, initialW + dx));
        break;
      }

      case 'nw': {
        const clampedDxNw = Math.max(-initialX, Math.min(initialW - 20, dx));
        const clampedDyNw = Math.max(-initialY, Math.min(initialH - 20, dy));
        newX = initialX + clampedDxNw;
        newW = initialW - clampedDxNw;
        newY = initialY + clampedDyNw;
        newH = initialH - clampedDyNw;
        break;
      }

      case 'e':
        newW = Math.max(20, Math.min(origW - initialX, initialW + dx));
        break;

      case 'w': {
        const clampedDxW = Math.max(-initialX, Math.min(initialW - 20, dx));
        newX = initialX + clampedDxW;
        newW = initialW - clampedDxW;
        break;
      }

      case 's':
        newH = Math.max(20, Math.min(origH - initialY, initialH + dy));
        break;

      case 'n': {
        const clampedDyN = Math.max(-initialY, Math.min(initialH - 20, dy));
        newY = initialY + clampedDyN;
        newH = initialH - clampedDyN;
        break;
      }

      default:
        break;
    }

    setCropRect({
      x: Math.round(newX),
      y: Math.round(newY),
      width: Math.round(newW),
      height: Math.round(newH),
    });
  }, [isDragging, dragType, dragStart, origW, origH, setCropRect]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const pctX = (cropRect.x / origW) * 100;
  const pctY = (cropRect.y / origH) * 100;
  const pctW = (cropRect.width / origW) * 100;
  const pctH = (cropRect.height / origH) * 100;

  return (
    <div className="crop-overlay-wrap" style={{
      background: '#64748B',
      borderRadius: 16,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      userSelect: 'none',
      marginBottom: 20,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', width: '100%',
        marginBottom: 10, color: '#ffffff', fontSize: '0.8rem', fontWeight: 700
      }}>
        <span>Interactive Visual Crop Box</span>
        <span>{cropRect.width} × {cropRect.height} px</span>
      </div>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          maxWidth: '100%',
          display: 'inline-block',
          overflow: 'hidden',
          borderRadius: 8,
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          cursor: isDragging ? 'grabbing' : 'default',
        }}
      >
        {/* Base Image */}
        <img
          ref={imgRef}
          src={item.previewUrl}
          alt="Crop Target"
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: 460,
            objectFit: 'contain',
          }}
        />

        {/* Dark Overlay Outside Crop Area */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          pointerEvents: 'none',
        }} />

        {/* Highlighted Clear Crop Box */}
        <div
          onMouseDown={(e) => handleMouseDown(e, 'move')}
          style={{
            position: 'absolute',
            left: `${pctX}%`,
            top: `${pctY}%`,
            width: `${pctW}%`,
            height: `${pctH}%`,
            border: '2px solid #3B82F6',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45), 0 0 12px rgba(59,130,246,0.5)',
            cursor: 'move',
            boxSizing: 'border-box',
          }}
        >
          {/* Rule of Thirds Grid Lines */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
            <div style={{ flex: 1, borderBottom: '1px dashed rgba(255,255,255,0.4)' }} />
            <div style={{ flex: 1, borderBottom: '1px dashed rgba(255,255,255,0.4)' }} />
            <div style={{ flex: 1 }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', pointerEvents: 'none' }}>
            <div style={{ flex: 1, borderRight: '1px dashed rgba(255,255,255,0.4)' }} />
            <div style={{ flex: 1, borderRight: '1px dashed rgba(255,255,255,0.4)' }} />
            <div style={{ flex: 1 }} />
          </div>

          {/* Corner Handles */}
          {['nw', 'ne', 'sw', 'se'].map((dir) => {
            const styles = {
              nw: { top: -6, left: -6, cursor: 'nwse-resize' },
              ne: { top: -6, right: -6, cursor: 'nesw-resize' },
              sw: { bottom: -6, left: -6, cursor: 'nesw-resize' },
              se: { bottom: -6, right: -6, cursor: 'nwse-resize' },
            };
            return (
              <div
                key={dir}
                onMouseDown={(e) => handleMouseDown(e, dir)}
                style={{
                  position: 'absolute',
                  width: 12, height: 12,
                  background: '#FFFFFF',
                  border: '2px solid #3B82F6',
                  borderRadius: 3,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  ...styles[dir],
                }}
              />
            );
          })}

          {/* Edge Middle Handles */}
          {['n', 's', 'e', 'w'].map((dir) => {
            const styles = {
              n: { top: -5, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' },
              s: { bottom: -5, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' },
              w: { left: -5, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' },
              e: { right: -5, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' },
            };
            return (
              <div
                key={dir}
                onMouseDown={(e) => handleMouseDown(e, dir)}
                style={{
                  position: 'absolute',
                  width: dir === 'n' || dir === 's' ? 16 : 8,
                  height: dir === 'e' || dir === 'w' ? 16 : 8,
                  background: '#3B82F6',
                  borderRadius: 2,
                  ...styles[dir],
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
