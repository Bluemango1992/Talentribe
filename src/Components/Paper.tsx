interface PaperProps {
    children?: React.ReactNode;
  }
 
const Paper = ({ children }: PaperProps) => {
    return (
      <div className='bg-white rounded-sm border border-gray-200'>
        {children}
      </div>
    )
  }

export default Paper;
