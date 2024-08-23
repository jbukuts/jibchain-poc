'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '#/lib/utils';

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function SideNavItem(props: React.ComponentProps<typeof Link>) {
  const { children, href, ...rest } = props;
  const pathname = usePathname();

  const isCurrent = href === pathname;

  const c = cn(
    isCurrent ? 'opacity-100' : 'opacity-65',
    'text-sm border-b border-border p-3 uppercase font-semibold hover:bg-secondary transition-all'
  );

  return (
    <Link {...rest} href={href} className={c}>
      {children}
    </Link>
  );
}

function SideNav() {
  return (
    <nav className='border-r border-border h-[calc(100vh-4.5rem)] flex flex-col sticky top-[4.5rem]'>
      <SideNavItem href={'/dashboard'}>Dashboard</SideNavItem>
      <SideNavItem href={'/dashboard/risk-insights'}>Risk Insights</SideNavItem>
      <SideNavItem href={'/dashboard/summaries'}>Summaries</SideNavItem>
    </nav>
  );
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;

  return (
    <div className='grid grid-cols-[200px_1fr] h-full'>
      <SideNav />
      <div>{children}</div>
    </div>
  );
}
