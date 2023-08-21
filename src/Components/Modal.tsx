
import { FaWindowClose } from 'react-icons/fa';

const Model = ({isOpen, onClose, children }: any) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-slate-600 bg-opacity-50 flex justify-center items-center">
        <div className="flex flex-col items-end bg-white rounded-lg p-4 relative">
        <button className="ml-2" onClick={onClose}>
            <FaWindowClose size={24} />
          </button>
          <div>
            {children}
          </div>
        </div>
      </div>
    );
  }

  export default Model;

