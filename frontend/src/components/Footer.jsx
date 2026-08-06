import React, { useState } from 'react';
import { Heart, Image } from 'lucide-react';
import PrivacyModal from './modals/PrivacyModal';
import TermsModal from './modals/TermsModal';
import ApiDocsModal from './modals/ApiDocsModal';

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [apiDocsOpen, setApiDocsOpen] = useState(false);

  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid #E2E8F0',
      background: '#FFFFFF',
      padding: '24px 0',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'linear-gradient(135deg, #3B82F6, #0EA5E9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(59,130,246,0.3)'
            }}>
              <Image size={16} color="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1rem', color: '#0F172A' }}>
              PicCraft
            </span>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 5, margin: 0, fontWeight: 500 }}>
            Made with <Heart size={13} fill="#F43F5E" color="#F43F5E" /> for creators worldwide
          </p>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span
              onClick={() => setPrivacyOpen(true)}
              style={{
                fontSize: '0.82rem', color: '#64748B', fontWeight: 600, cursor: 'pointer',
                transition: 'color 0.18s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#2563EB'}
              onMouseLeave={(e) => e.target.style.color = '#64748B'}
            >
              Privacy Policy
            </span>

            <span
              onClick={() => setTermsOpen(true)}
              style={{
                fontSize: '0.82rem', color: '#64748B', fontWeight: 600, cursor: 'pointer',
                transition: 'color 0.18s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#2563EB'}
              onMouseLeave={(e) => e.target.style.color = '#64748B'}
            >
              Terms of Service
            </span>

            <span
              onClick={() => setApiDocsOpen(true)}
              style={{
                fontSize: '0.82rem', color: '#64748B', fontWeight: 600, cursor: 'pointer',
                transition: 'color 0.18s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#2563EB'}
              onMouseLeave={(e) => e.target.style.color = '#64748B'}
            >
              API Docs
            </span>
          </div>
        </div>

      </div>

      {/* Modals */}
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <ApiDocsModal isOpen={apiDocsOpen} onClose={() => setApiDocsOpen(false)} />
    </footer>
  );
}
