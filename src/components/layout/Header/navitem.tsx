'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '#/lib/utils';

const HeaderNavItem = (props: React.ComponentProps<typeof Link>) => {
  const { children, className, ...rest } = props;
  const pathname = usePathname();

  const c = cn(
    className,
    'text-xs h-fit',
    'border border-solid',
    pathname.startsWith(rest.href.toString())
      ? 'border-border'
      : 'border-transparent opacity-60',
    'transition-all hover:opacity-100',
    'py-1.5 px-2.5 rounded-md'
  );

  return (
    <Link {...rest} className={c}>
      {children}
    </Link>
  );
};

export default HeaderNavItem;
