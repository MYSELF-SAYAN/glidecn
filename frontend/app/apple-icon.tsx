import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fa5c4f',
          borderRadius: '40px',
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="1" width="11" height="11" rx="3.5" fill="#ffffff" fillOpacity="0.9" />
          <rect x="16" y="1" width="11" height="11" rx="3.5" fill="#ffffff" fillOpacity="0.6" />
          <rect x="1" y="16" width="11" height="11" rx="3.5" fill="#ffffff" fillOpacity="0.7" />
          <rect x="16" y="16" width="11" height="11" rx="3.5" fill="#ffffff" fillOpacity="0.4" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
