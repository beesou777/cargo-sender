"use client"
import classes from './styles/sidenavbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linksMockdata = [
  {
    label: 'Dashboard',
    link: '',
  },
  {
    label: 'New Order',
    link: 'orders/new',
  },
  {
    label: 'Orders',
    link: 'orders',
  },
  {
    label: 'Profile',
    link: 'profile',
  },
];

export default function DoubleNavbar() {
  const pathname = usePathname();
  console.log(pathname.startsWith('/dashboard/orders'));
  const links = linksMockdata.map((link) => (
    <Link
      className={`py-6 px-6 hover:bg-blue-500 hover:text-gray-50 ${pathname === `/dashboard/${link.link}` ? 'bg-blue-500 text-gray-50' : ''}`}
      href={`/dashboard/${link.link}`}
      key={link.label}
    >
      {link.label}
    </Link>
  ));

  return (
    <nav className="bg-gray-50 min-h-[100dvh] h-full">
        <div className="flex flex-col"
        
        >
          {links}
        </div>
    </nav>
  );
}