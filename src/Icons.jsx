/* ─── Social Media & Platform SVG Icons ─── */

export function IconInstagram({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig1" cx="30%" cy="107%" r="100%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig1)" />
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="white" />
    </svg>
  );
}

export function IconMeta({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="meta1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0081FB" />
          <stop offset="100%" stopColor="#0064E0" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#meta1)" />
      <path d="M4.5 15.5C4.5 13.5 5.5 11.5 7 10C8.2 8.8 9.5 8.5 10.5 9C11.2 9.4 11.8 10.2 12 11C12.2 10.2 12.8 9.4 13.5 9C14.5 8.5 15.8 8.8 17 10C18.5 11.5 19.5 13.5 19.5 15.5C19.5 17 18.5 17.5 17.5 17.5C16.2 17.5 15 16.5 14 15C13.5 14.2 13 13.2 12 13.2C11 13.2 10.5 14.2 10 15C9 16.5 7.8 17.5 6.5 17.5C5.5 17.5 4.5 17 4.5 15.5Z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGoogle({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#fff" />
      <path d="M21.5 12.2c0-.7-.1-1.3-.2-2H12v3.8h5.3c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1z" fill="#4285F4" />
      <path d="M12 22c2.7 0 4.9-.9 6.5-2.4l-3.2-2.4c-.9.6-2 .9-3.3.9-2.5 0-4.7-1.7-5.5-4H3.2v2.5C4.8 19.8 8.2 22 12 22z" fill="#34A853" />
      <path d="M6.5 14.1c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.6H3.2C2.4 9.1 2 10.5 2 12s.4 2.9 1.2 4.4l3.3-2.3z" fill="#FBBC05" />
      <path d="M12 5.7c1.4 0 2.7.5 3.7 1.4l2.7-2.7C16.9 2.9 14.6 2 12 2 8.2 2 4.8 4.2 3.2 7.6l3.3 2.5c.8-2.3 3-4.4 5.5-4.4z" fill="#EA4335" />
    </svg>
  );
}

export function IconLinkedIn({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="li1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A66C2" />
          <stop offset="100%" stopColor="#004182" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#li1)" />
      <path d="M7.5 9.5H5.5V18H7.5V9.5Z" fill="white" />
      <circle cx="6.5" cy="7" r="1.2" fill="white" />
      <path d="M18 18H16V13.5C16 12.4 15.1 11.5 14 11.5C12.9 11.5 12 12.4 12 13.5V18H10V9.5H12V10.8C12.6 10 13.7 9.5 14.8 9.5C16.6 9.5 18 11 18 12.8V18Z" fill="white" />
    </svg>
  );
}

export function IconYouTube({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="yt1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF0000" />
          <stop offset="100%" stopColor="#CC0000" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#yt1)" />
      <path d="M19.5 8.5C19.3 7.7 18.7 7.1 17.9 6.9C16.5 6.5 12 6.5 12 6.5C12 6.5 7.5 6.5 6.1 6.9C5.3 7.1 4.7 7.7 4.5 8.5C4.1 9.9 4.1 12 4.1 12C4.1 12 4.1 14.1 4.5 15.5C4.7 16.3 5.3 16.9 6.1 17.1C7.5 17.5 12 17.5 12 17.5C12 17.5 16.5 17.5 17.9 17.1C18.7 16.9 19.3 16.3 19.5 15.5C19.9 14.1 19.9 12 19.9 12C19.9 12 19.9 9.9 19.5 8.5Z" fill="white" fillOpacity="0.2" />
      <polygon points="10,9.5 10,14.5 15,12" fill="white" />
    </svg>
  );
}

export function IconTikTok({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#010101" />
      <path d="M10 5H13C13 7 14.5 8.5 16.5 8.5V11.5C15 11.5 13.7 11 12.7 10.2V15.5C12.7 17.9 10.7 19.8 8.4 19.8C6.1 19.8 4.2 17.9 4.2 15.5C4.2 13.1 6.1 11.2 8.4 11.2C8.7 11.2 8.9 11.2 9.2 11.3V14.3C9 14.2 8.7 14.2 8.4 14.2C7.7 14.2 7.2 14.8 7.2 15.5C7.2 16.2 7.7 16.8 8.4 16.8C9.1 16.8 9.7 16.2 9.7 15.4V5H10Z" fill="#EE1D52" />
      <path d="M10 5H13C13 7 14.5 8.5 16.5 8.5V11.5C15 11.5 13.7 11 12.7 10.2V15.5C12.7 17.9 10.7 19.8 8.4 19.8C6.1 19.8 4.2 17.9 4.2 15.5C4.2 13.1 6.1 11.2 8.4 11.2C8.7 11.2 8.9 11.2 9.2 11.3V14.3C9 14.2 8.7 14.2 8.4 14.2C7.7 14.2 7.2 14.8 7.2 15.5C7.2 16.2 7.7 16.8 8.4 16.8C9.1 16.8 9.7 16.2 9.7 15.4V5H10Z" fill="#69C9D0" fillOpacity="0.5" />
    </svg>
  );
}

export function IconFacebook({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="fb1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#18ACFE" />
          <stop offset="100%" stopColor="#0163E0" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#fb1)" />
      <path d="M13.5 21V13.5H16L16.5 10.5H13.5V8.5C13.5 7.7 13.7 7 15 7H16.5V4.3C15.8 4.2 14.6 4 13.4 4C11 4 9.5 5.4 9.5 8.2V10.5H7V13.5H9.5V21H13.5Z" fill="white" />
    </svg>
  );
}

export function IconXTwitter({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#000" />
      <path d="M17.8 4H20.5L14.5 10.8L21.5 20H16L11.5 14.1L6.3 20H3.5L9.9 12.8L3.2 4H8.9L13 9.4L17.8 4ZM16.8 18.4H18.3L7.8 5.5H6.2L16.8 18.4Z" fill="white" />
    </svg>
  );
}

export function IconGoogleAds({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#fff" />
      <path d="M5 17.5L9.5 9.5L14 17.5" stroke="#FBBC04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 9.5L14 17.5L18.5 9.5" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="17.5" r="1.8" fill="#34A853" />
    </svg>
  );
}
