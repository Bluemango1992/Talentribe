interface PaperProps {
    children?: React.ReactNode;
  }
 
const Paper = ({ children }: PaperProps) => {
    return (
      <div className='bg-white rounded-sm border gap-2 border-gray-200 w-full h-full'>
        {children}
      </div>
    )
  }

export default Paper;
