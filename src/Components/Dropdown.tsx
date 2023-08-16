import { useState } from 'react';

interface DropdownProps {
    options: string[];
    onSelect: (option: string) => void;
    placeholder?: string;
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
            <button className='bg-cyan-700 px-2 py-2 w-full text-white font-semibold rounded-md min-w-[150px]' onClick={() => setIsOpen(!isOpen)}>
                {selectedOption || placeholder}
            </button>
            {isOpen && (
                <ul className='absolute left-0 top-full p-3 bg-white w-full mt-1 max-h-[200px] overflow-y-auto rounded-md border border-slate-200'>
                    {options.map(option => (
                        <li key={option} onClick={() => handleSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
