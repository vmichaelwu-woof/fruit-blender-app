'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/shop');
  }, [router]);

  return (
    <div className="loading-container">
      <p>Redirecting...</p>
    </div>
  );
}
