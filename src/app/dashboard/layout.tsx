import { LeftNav } from '#/components/layout';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-row w-full h-full flex-1'>
      <LeftNav />
      <div className='flex-1'>{children}</div>
    </div>
  );
}
