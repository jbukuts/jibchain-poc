import { Construction } from 'lucide-react';

export default function UnderConstruction() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Construction size={48} />
      <span className='text-2xl font-semibold italic'>
        This page is currently under construction
      </span>
    </div>
  );
}
