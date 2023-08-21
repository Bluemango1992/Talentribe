interface PaperProps {
    children?: React.ReactNode;
  }
 
const Paper = ({ children }: PaperProps) => {
    return (
      <div className='bg-white rounded-sm border gap-2 border-gray-200'>
        {children}
      </div>
    )
  }

export default Paper;
