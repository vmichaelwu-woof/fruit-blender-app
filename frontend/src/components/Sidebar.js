import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/shop', label: 'Shop', page: 'shop' },
  { href: '/history', label: 'History', page: 'history' }
];

const FRUIT_ITEMS = [
  { href: '/fruits/1', label: 'Banana', page: '1' },
  { href: '/fruits/2', label: 'Apple', page: '2' },
  { href: '/fruits/3', label: 'Strawberry', page: '3' }
];

export default function Sidebar({ currentPage }) {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Fruit Blender</h1>
      
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <Link 
            key={item.page}
            href={item.href} 
            className={`sidebar-link ${currentPage === item.page ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
        
        <div className="sidebar-divider"></div>
        <p className="sidebar-label">FRUIT INFO</p>
        
        {FRUIT_ITEMS.map(item => (
          <Link 
            key={item.page}
            href={item.href} 
            className={`sidebar-link ${currentPage === item.page ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
