import { useState } from 'react';

interface DropdownProps {
    options: string[];
    onSelect: (option: string) => void;
    placeholder?: string;
    type?: string;
}

const Dropdown = ({ options, onSelect, placeholder='text' }: DropdownProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(!isOpen);
        onSelect(option);
    };

    return (
        <div className="relative">
            <button className='p-2 border border-gray-500 rounded-md text-sm w-full' onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}>
                {selectedOption || placeholder}
            </button>
            {isOpen && (
                <ul className='absolute left-0 top-full p-3 bg-white w-full mt-1 max-h-[200px] overflow-y-auto rounded-md border border-slate-200'>
                    {options.map(option => (
                        <li key={option} onClick={(e) => { e.stopPropagation(); handleSelect(option) }}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
