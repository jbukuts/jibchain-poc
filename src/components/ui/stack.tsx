import * as React from 'react';
import { cn } from '#/lib/utils';

interface StackProps extends React.ComponentProps<'div'> {
  dir: 'horizontal' | 'vertical';
}

const Stack = React.forwardRef<React.ElementRef<'div'>, StackProps>(
  (props, ref) => {
    const { dir, className, children, ...rest } = props;

    return (
      <div
        {...rest}
        ref={ref}
        className={cn(
          'flex',
          dir === 'horizontal' ? 'flex-row' : 'flex-col',
          className
        )}>
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

export { Stack };
