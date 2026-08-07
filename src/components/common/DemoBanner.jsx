import React from 'react';
import { DEMO_ACCOUNTS } from '../../demo/fixtures';

const style = {
  position: 'sticky',
  top: 0,
  zIndex: 2000,
  width: '100%',
  padding: '8px 16px',
  background: '#0f3d4c',
  color: '#f4fafb',
  fontSize: '13px',
  lineHeight: 1.4,
  textAlign: 'center',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
};

const DemoBanner = () => (
  <div style={style} role="status">
    <strong>SOMNIA UI Demo</strong>
    {' — '}
    mock data; submit fields auto-filled (just click Next / Submit). Login:{' '}
    <code>
      {DEMO_ACCOUNTS.user.login_id} / {DEMO_ACCOUNTS.user.login_pw}
    </code>
  </div>
);

export default DemoBanner;
