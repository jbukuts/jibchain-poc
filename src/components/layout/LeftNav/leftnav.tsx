import React from 'react';
import { cn } from '#/lib/utils';
import NavItem from './navitem';

const LeftNav = () => {
  const c = cn(
    'flex flex-col sticky top-20',
    'border-r border-border bg-white',
    'w-[15vw] max-w-60 min-w-48 h-[calc(100vh-5rem)]'
  );

  return (
    <nav className={c}>
      <NavItem renderIcon='Add' href={'/dashboard'}>
        Dashboard
      </NavItem>
      <NavItem href={'/dashboard/test'}>Summaries</NavItem>
    </nav>
  );
};

export default LeftNav;
