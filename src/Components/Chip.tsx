import { P2 } from '../Typography';

const Chip = ({ children }) => {
    return (
      <div className='flex items-center justify-center px-2 py-1 bg-gray-200 rounded-full'>
        <P2>{children}</P2>
      </div>
    );
  }

  export default Chip;