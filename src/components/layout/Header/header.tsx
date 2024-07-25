import Image from 'next/image';
import { cn } from '#/lib/utils';
import HeaderNavItem from './navitem';

const Header = () => {
  const c = cn(
    'bg-background h-20 p-5',
    'flex flex-row items-center sticky top-0',
    'border-b border-border'
  );

  return (
    <header className={c}>
      <nav className='flex flex-row w-fit items-center'>
        <HeaderNavItem href={'/dashboard'}>Dashboard</HeaderNavItem>
        <HeaderNavItem href={'/help'}>Help & Support</HeaderNavItem>
        <HeaderNavItem href={'/training'}>Training Documents</HeaderNavItem>
        <Image src={'/logo.png'} alt='logo' width={100} height={200} />
      </nav>
    </header>
  );
};

export default Header;
