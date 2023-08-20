import { useState } from "react";

const SelectField = ({ placeholder, options, label, onSelect }: any) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(placeholder);
  
    const handleSelect = (option: string) => {
      setSelectedOption(option);
      onSelect(option);
      setIsOpen(false);
    };
  
    return (
      <div className="relative">
        <label className="text-sm font-semibold text-gray-500">{label}</label>
        <button
          className="w-full bg-white border border-gray-500 rounded-md px-4 py-2 text-sm font-medium flex justify-between items-center"
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
          <div className="absolute top-full w-full bg-white border border-gray-500 rounded-md px-4 py-2 mt-2 text-sm font-medium">
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
  