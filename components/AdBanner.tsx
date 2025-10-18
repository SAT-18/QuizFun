import React, { useEffect } from 'react';

// Deklarasikan adsbygoogle pada window agar TypeScript tidak error
declare global {
  interface Window {
    // Fix: The type for `window.adsbygoogle` was incorrect. It should be an array of objects.
    // The previous type `{ push: (params: {}) => void; }[]` incorrectly implied
    // that the elements inside the array had a `push` method, rather than the array-like `adsbygoogle` object itself.
    adsbygoogle?: object[];
  }
}

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // Placeholder ini akan terlihat jika iklan gagal dimuat atau AdBlock aktif.
  // Anda bisa mengganti style ini sesuai kebutuhan.
  const adPlaceholderStyle: React.CSSProperties = {
    background: '#e9ecef',
    border: '2px dashed #adb5bd',
    padding: '20px',
    textAlign: 'center',
    color: '#495057',
    fontSize: '14px',
    minHeight: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontWeight: '500',
  };

  return (
    <div className="my-6">
      {/* 
        PENTING:
        Saat Anda siap, ganti 'ca-pub-XXXXXXXXXXXXXXXX' dengan ID Penayang AdSense Anda
        dan 'YYYYYYYYYY' dengan ID Unit Iklan (Ad Slot ID) Anda.
      */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="YYYYYYYYYY"
           data-ad-format="auto"
           data-full-width-responsive="true">
        <div style={adPlaceholderStyle}>
            Area Iklan
        </div>
      </ins>
    </div>
  );
};

export default AdBanner;