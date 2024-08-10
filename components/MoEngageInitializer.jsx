// components/MoEngageInitializer.jsx
'use client';  // Ensures this component is client-side only

import { useEffect } from 'react';
import moengage from '@moengage/web-sdk';

const MoEngageInitializer = () => {
  useEffect(() => {
    // Initialize MoEngage only on the client side
    moengage.initialize({ app_id: '5DWH5EWA6O661HFBFC5SUCCO' });
  }, []);

  return null; // This component doesn't need to render anything
};

export default MoEngageInitializer;
