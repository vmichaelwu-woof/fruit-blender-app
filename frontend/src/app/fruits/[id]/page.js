'use client'

import { useEffect, use } from 'react';
import { datadogRum } from '@datadog/browser-rum';
import AppLayout from '../../../components/AppLayout';
import FruitDetailPage from '../../../components/FruitDetailPage';
import { FRUIT_ID_TO_NAME, FRUIT_ID_TO_DISPLAY } from '../../../config';

export default function FruitDetail({ params }) {
  const resolvedParams = use(params);
  const fruitId = resolvedParams.id;
  const fruitName = FRUIT_ID_TO_NAME[fruitId];
  const displayName = FRUIT_ID_TO_DISPLAY[fruitId];

  // Track view when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && datadogRum.getInitConfiguration()) {
      datadogRum.startView({
        name: `${displayName} Detail Page`,
        service: 'fruit-blender-frontend',
        version: '1.0.0'
      });
      console.log(`📊 Datadog RUM: Tracked view - ${displayName} Detail Page`);
    }
  }, [displayName]);

  if (!fruitName) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-xl text-gray-600">Fruit not found</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <FruitDetailPage fruitId={fruitName} />
    </AppLayout>
  );
}

