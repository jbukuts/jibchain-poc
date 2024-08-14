'use client';

import type * as CarbonIcons from '@carbon/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '#/lib/utils';

type IconName = keyof typeof CarbonIcons;

interface NavItemProps extends React.ComponentProps<typeof Link> {
  renderIcon?: IconName;
}

const NavItem = (props: NavItemProps) => {
  const { children, href, ...rest } = props;
  const pathname = usePathname();

  const c = cn(
    'flex flex-row items-center text-card-title',
    'uppercase text-sm',
    'py-2 pl-2.5 pr-1.5 h-12',
    'border-b border-border',
    'hover:bg-hover transition duration-150',
    href.toString() === pathname ? 'bg-hover' : ''
  );

  return (
    <Link {...rest} href={href} className={c}>
      {children}
    </Link>
  );
};

export default NavItem;
