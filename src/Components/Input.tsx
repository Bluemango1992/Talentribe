interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, placeholder, onChange }: InputProps) => {
    return (
        <div className={`flex flex-col gap-1`}>
            <label className={`text-sm font-semibold text-gray-500`}>{label}</label>
            <input className={`p-2 border border-gray-500 rounded-md text-sm`} type={type} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}   

export default Input
