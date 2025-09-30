'use client'
import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';
import { useEffect } from 'react';

export default function SDKInitializer() {

  useEffect(() => {
    datadogRum.init({
      applicationId: '6e7aa102-17b8-47a4-922c-b578599f68d7',
      clientToken: 'pubb0f4fc9fa8618c395e248b945af91bcf',
      site: 'datadoghq.com',
      service:'next-js',
      env: 'dev',
      version: '1.0.0',
      sessionSampleRate:  100,
      sessionReplaySampleRate: 20,
      defaultPrivacyLevel: 'mask-user-input',
      plugins: [reactPlugin({ router: false })],
    });

    console.log('SDKInitializer loaded');
  }, []);

  return null;
}