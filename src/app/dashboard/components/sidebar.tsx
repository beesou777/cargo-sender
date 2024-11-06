"use client"
import { useState } from 'react';
import classes from './styles/sidenavbar.module.css';
import Link from 'next/link';

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
  const [activeLink, setActiveLink] = useState('Dashboard');

  const links = linksMockdata.map((link) => (
    <Link
      className={classes.link}
      data-active={activeLink === link.label || undefined}
      href={`/dashboard/${link.link}`}
      onClick={() => {
        setActiveLink(link.label);
      }}
      key={link.label}
    >
      {link.label}
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          {links}
        </div>
      </div>
    </nav>
  );
}