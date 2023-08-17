interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    name?: string;
}

const Input = ({ name, label, type, placeholder, onChange, value }: InputProps) => {
    return (
        <div className={`flex flex-col gap-1`}>
            <label className={`text-sm font-semibold text-gray-500`}>{label}</label>
            <input 
                className={`p-2 border border-gray-500 rounded-md text-sm`} 
                type={type} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange}
                name={name}
            />
        </div>
    )
}

export default Input
