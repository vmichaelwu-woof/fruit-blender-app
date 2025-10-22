'use client'

import { useEffect } from 'react';
import { datadogRum } from '@datadog/browser-rum';
import AppLayout from '../../components/AppLayout';
import HistoryPage from '../../components/HistoryPage';
import { useCart } from '../../hooks/useCart';

export default function History() {
  const { blendHistory } = useCart();

  // Track view when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && datadogRum.getInitConfiguration()) {
      datadogRum.startView({
        name: 'History Page',
        service: 'fruit-blender-frontend',
        version: '1.0.0'
      });
      console.log('📊 Datadog RUM: Tracked view - History Page');
    }
  }, []);

  return (
    <AppLayout>
      <HistoryPage blendHistory={blendHistory} />
    </AppLayout>
  );
}

