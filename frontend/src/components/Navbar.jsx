import React, { useState } from 'react';
import { Image, Layers, Minimize2, Maximize2, Crop, RotateCw, Type, Grid, UserCheck, Palette, Menu, X, LogIn, LogOut, User as UserIcon, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const tools = [
  { id: 'convert', name: 'Convert', icon: Layers },
  { id: 'compress', name: 'Compress', icon: Minimize2 },
  { id: 'resize', name: 'Resize', icon: Maximize2 },
  { id: 'filter', name: 'Filters', icon: Palette },
  { id: 'crop', name: 'Crop', icon: Crop },
  { id: 'rotate', name: 'Rotate', icon: RotateCw },
  { id: 'watermark', name: 'Watermark', icon: Type },
  { id: 'nameDate', name: 'Name & Date', icon: UserCheck },
  { id: 'merge', name: 'Merge', icon: Grid },
];

const toolDescriptions = {
  convert: '🔄 Convert between JPG, PNG, WEBP, AVIF, GIF, PDF, DOCX and more — fast, lossless, right in your browser',
  compress: '📦 Reduce file size while keeping quality — or compress to an exact target KB',
  resize: '📐 Resize images to exact pixel dimensions, percentage scale, or target KB/MB file size',
  filter: '🎨 Apply Black & White, Sepia, Invert, Warm Sunset, Cool Cyan, and Cyber Neon filters to your photos',
  crop: '✂️ Crop to aspect ratio presets or custom pixel region',
  rotate: '🔁 Rotate 90° / 180° or flip horizontally & vertically',
  watermark: '🔏 Add text or logo watermark with custom opacity, size & position',
  nameDate: '🪪 Add Candidate Name & Date banner (DOP/DOB) for official passport & exam photos',
  merge: '🖼️ Merge multiple images side-by-side, stacked, or in a grid collage',
};

export default function Navbar({ activeTool, setActiveTool, onOpenAuth, onOpenPricing, onOpenAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logoutUser, isPro } = useAuth();

  const handleToolSelect = (id) => {
    setActiveTool(id);
    setMenuOpen(false);
  };

  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <header className="navbar-header">

      {/* ── Main Row ── */}
      <div className="navbar-row">

        {/* Logo */}
        <div className="navbar-logo">
          <div className="navbar-logo-icon">
            <Image size={18} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="grad-text navbar-brand">PicCraft</span>
              {isPro && <span className="badge badge-indigo" style={{ padding: '2px 6px', fontSize: '0.6rem' }}>PRO</span>}
            </div>
            <p className="navbar-tagline">All-in-One Toolbox</p>
          </div>
        </div>

        {/* Logo */}
        {/* <div className="navbar-logo"> */}
        {/* Replace icon container with your custom image logo */}
        {/* <img
            src="/logo.svg"
            alt="Logo"
            style={{ width: 32, height: 32, objectFit: 'contain' }}
          />
          <div>
            <span className="grad-text navbar-brand">YourNewName</span>
            <p className="navbar-tagline">All-in-One Toolbox</p>
          </div>
        </div> */}


        {/* Desktop Tool Tabs */}
        <nav className="navbar-tools-desktop">
          {tools.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleToolSelect(id)}
              className={`tool-tab${activeTool === id ? ' active' : ''}`}
              style={{ flexShrink: 0, padding: '6px 9px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <Icon size={13} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="navbar-right">

          {/* Admin Panel Button — for Admin users */}
          {user?.is_admin && (
            <button
              onClick={onOpenAdmin}
              className="btn btn-ghost btn-sm"
              style={{ borderRadius: 9, padding: '5px 10px', fontSize: '0.76rem', fontWeight: 800, background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE' }}
              title="Admin Control Panel"
            >
              👑 Admin Panel
            </button>
          )}

          {/* PRO Button — for non-Pro users */}
          {!isPro && (
            <button onClick={onOpenPricing} className="navbar-pro-btn">
              <Crown size={13} fill="#fff" />
              <span>PRO</span>
            </button>
          )}

          {/* Desktop auth */}
          <div className="navbar-auth-desktop">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 5px', borderRadius: 99, background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getInitials(user.name)}
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </span>
                </div>
                <button onClick={logoutUser} className="btn btn-ghost btn-sm" style={{ padding: '6px 9px', borderRadius: 8 }} title="Sign Out">
                  <LogOut size={13} color="#64748B" />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={() => onOpenAuth('login')} className="btn btn-ghost btn-sm" style={{ borderRadius: 9, padding: '6px 11px', fontWeight: 700, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                  <LogIn size={13} color="#3B82F6" />
                  <span>Sign In</span>
                </button>
                <button onClick={() => onOpenAuth('register')} className="btn btn-primary btn-sm" style={{ borderRadius: 9, padding: '7px 13px', fontWeight: 800, fontSize: '0.78rem', boxShadow: '0 3px 12px rgba(59,130,246,0.3)', whiteSpace: 'nowrap' }}>
                  <UserIcon size={13} />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button className="navbar-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} color="#334155" /> : <Menu size={20} color="#334155" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {/* 3x3 tool grid on mobile */}
          <div className="navbar-mobile-tools-grid">
            {tools.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleToolSelect(id)}
                className={`navbar-mobile-tool-btn${activeTool === id ? ' active' : ''}`}
              >
                <Icon size={18} />
                <span>{name}</span>
              </button>
            ))}
          </div>

          {/* Auth row in mobile menu */}
          <div className="navbar-mobile-auth-row">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getInitials(user.name)}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>{user.name}</span>
                </div>
                <button onClick={logoutUser} className="btn btn-ghost btn-sm" style={{ gap: 5, borderRadius: 8 }}>
                  <LogOut size={14} color="#64748B" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => { onOpenAuth('login'); setMenuOpen(false); }} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center', borderRadius: 9, padding: '9px 12px', fontWeight: 700 }}>
                  <LogIn size={15} color="#3B82F6" />
                  <span>Sign In</span>
                </button>
                <button onClick={() => { onOpenAuth('register'); setMenuOpen(false); }} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center', borderRadius: 9, padding: '9px 12px', fontWeight: 800, boxShadow: '0 3px 12px rgba(59,130,246,0.3)' }}>
                  <UserIcon size={15} />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
