'use client';

import {
  CreditCard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Moon,
  Sun
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { createElement } from 'react';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import { cn } from '#/lib/utils';
import Logo from '../logo';

function HeaderLink(props: React.ComponentProps<typeof Link>) {
  const { children, href, ...rest } = props;
  const pathname = usePathname();
  const isCurrent = pathname.startsWith(href.toString());

  const c = cn(
    isCurrent ? 'border-border' : 'border-transparent',
    'text-sm opacity-70 hover:opacity-100 transition-opacity border  py-1.5 px-2.5 rounded-md'
  );

  return (
    <Link {...rest} href={href} className={c}>
      {children}
    </Link>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='rounded-[50%]' size={'icon'}>
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className='mr-2 h-4 w-4' />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className='mr-2 h-4 w-4' />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className='mr-2 h-4 w-4' />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className='mr-2 h-4 w-4' />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className='mr-2 h-4 w-4' />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className='mr-2 h-4 w-4' />
            <span>New Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LifeBuoy className='mr-2 h-4 w-4' />
          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeButton() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme !== 'light' ? 'light' : 'dark');
  };

  return (
    <Button
      variant='ghost'
      className='rounded-[50%]'
      size={'icon'}
      onClick={toggleTheme}>
      {createElement(theme === 'light' ? Moon : Sun)}
    </Button>
  );
}

export default function Header() {
  return (
    <header className='border-b border-border p-3 flex flex-row gap-3 items-center sticky top-0 bg-background h-[4.5rem] z-50'>
      <nav className='flex flex-row gap-2 items-center'>
        <HeaderLink href={'/'}>Home</HeaderLink>
        <HeaderLink href={'/dashboard'}>Dashboard</HeaderLink>
        <HeaderLink href={'/help'}>Help & Support</HeaderLink>
      </nav>
      <Logo className='fill-current h-12 w-auto' />
      <div className='ml-auto flex flex-row gap-2'>
        <ThemeButton />
        <UserMenu />
      </div>
    </header>
  );
}
