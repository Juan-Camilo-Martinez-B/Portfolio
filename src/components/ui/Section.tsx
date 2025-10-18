import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLElement>;
}

const Section: React.FC<SectionProps> = ({
  id,
  children,
  className,
  ref,
}) => {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'p-4 sm:p-6 md:p-8 border-b border-orange-500 last:border-b-0',
        'w-full',
        'relative z-10',
        'overflow-visible',
        className
      )}
      data-section={id}
    >
      <div className="w-full">
        {children}
      </div>
    </section>
  );
};

export default Section;
