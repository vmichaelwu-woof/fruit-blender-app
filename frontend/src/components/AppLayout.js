'use client'

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

const PAGE_MAP = {
  '/shop': 'shop',
  '/': 'shop',
  '/history': 'history',
  '/fruits/1': '1',
  '/fruits/2': '2',
  '/fruits/3': '3'
};

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const currentPage = PAGE_MAP[pathname] || 'shop';

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} />
      <div className="app-content">
        {children}
      </div>
    </div>
  );
}
