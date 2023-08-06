import React from 'react';

interface BreadcrumbsProps {
    items?: string[];
    theme?: 'light' | 'dark';
  }
  

const Breadcrumbs = ({
    items = ['tab 1', 'tab 2', 'tab 3'],
    theme = 'light'
  }: BreadcrumbsProps) => {
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  
    return (
      <div className={`flex gap-2 ${textColor}`}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbsItem title={item} />
            {index < items.length - 1 && <span>&#8226;</span>} 
          </React.Fragment>
        ))}
      </div>
    );
  }
  
  export default Breadcrumbs;

  interface BreadcrumbsItemProps {
    title: string;
  }
  
  function BreadcrumbsItem({ title }: BreadcrumbsItemProps) {
    return (
      <div className='text-bg-200'>
        {title}
      </div>
    )
  }

