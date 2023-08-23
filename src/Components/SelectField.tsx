import { useState, useRef, useEffect } from "react";
import { FaFlag } from "react-icons/fa";

const SelectField = ({ placeholder, options, label, onSelect, errorMessage }: any) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(placeholder);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        // Add the event listener for mousedown (better than click for this purpose)
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const handleSelect = (option: string) => {
      setSelectedOption(option);
      onSelect(option);
      setIsOpen(false);
    };
  
    return (
      <div className="relative w-full font-maven-pro max-w-[320px]" ref={wrapperRef}>
        <label className="text-sm text-gray-500">{label}</label>
        {errorMessage && <span className={`flex gap-2 items-center text-sm text-red-500`}><FaFlag />{errorMessage}</span>}
        <button
          className="w-full bg-white border border-gray-500 rounded-md px-4 py-2 text-sm font-medium flex justify-between items-center mb-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <span className="ml-2">
            <svg
              className={`w-3 h-3 transition-transform transform ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fill="#374151"
                fillRule="evenodd"
                d="M10 13.333l6-6-1.333-1.334L10 10.667 5.333 5.333 4 6.667z"
              />
            </svg>
          </span>
        </button>
        
        {isOpen && (
            <div 
              className="absolute top-full w-full bg-white border border-gray-500 rounded-md px-4 py-2 text-sm font-medium max-h-60 overflow-y-auto postion-absolute z-10 scrollbar-track-white scrollbar-thumb-rounded">
              {options.map((option: string, index: number) => (
                <div
                  key={index}
                  className="w-full py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}

      </div>
    );
  }

  export default SelectField;


  