import { FaFlag } from "react-icons/fa";

interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
    errorMessage?: string;  // Add this line
}

const Input = ({ name, label, type, placeholder, onChange, value, errorMessage }: InputProps) => {
    return (
        <div className={`flex flex-col gap-1 z-10`}>
            <label className={`text-sm font-semibold text-gray-500`}>{label}</label>
            <input 
                className={`p-2 border border-gray-500 rounded-md text-sm min-w-0 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                type={type} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange}
                name={name}
            />
            {errorMessage && <span className={`flex gap-2 items-center text-sm text-red-500`}><FaFlag />{errorMessage}</span>}  {/* Conditionally render the error message */}
        </div>
    )
}

export default Input