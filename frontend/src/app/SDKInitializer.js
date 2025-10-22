'use client'
import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';
import { useEffect } from 'react';

export default function SDKInitializer() {
  useEffect(() => {
    // Only initialize once
    if (typeof window !== 'undefined' && !datadogRum.getInitConfiguration()) {
      datadogRum.init({
        // RUM Setup
        applicationId: '6e7aa102-17b8-47a4-922c-b578599f68d7',
        clientToken: 'pubb0f4fc9fa8618c395e248b945af91bcf',
        site: 'datadoghq.com',
        service: 'fruit-blender-frontend',
        env: 'dev',
        version: '1.0.0',
        sessionSampleRate: 100,
        sessionReplaySampleRate: 20,
        defaultPrivacyLevel: 'mask-user-input',
        plugins: [reactPlugin({ router: false })],
        // this is connecting APM <> RUM
        allowedTracingUrls: ['http://localhost:3001'],
        trackResources: true,
        trackLongTasks: true,
        trackUserInteractions: true,
        trackViewsManually: true // Manual view tracking enabled
      });

      // Start the session
      datadogRum.startSessionReplayRecording();
      
      console.log('✅ Datadog RUM initialized successfully');
    }
  }, []);

  return null;
}