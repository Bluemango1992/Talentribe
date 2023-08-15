interface PaperProps {
    children?: React.ReactNode;
  }
 
const Paper = ({ children }: PaperProps) => {
    return (
      <div className='flex flex-col flex-1 bg-white rounded-sm border border-gray-200 p-4 gap-3'>
        {children}
      </div>
    )
  }

export default Paper;
