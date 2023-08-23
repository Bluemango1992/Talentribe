
interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary';
    type?: 'button' | 'submit' | 'reset';
}


const sizeStyles = {
    small: 'font-maven-pro px-2 py-1 text-sm font-medium',
    medium: 'font-maven-pro px-4 py-2 text-base font-medium',
    large: 'font-maven-pro px-6 py-3 text-lg font-medium',
};

const variantStyles = {
    primary: 'bg-slate-800 hover:bg-slate-900 text-white',
    secondary: 'bg-slate-500 hover:bg-slate-400 text-white',
    tertiary: 'bg-transparent hover:bg-slate-100',
};

const Button = ({ children, onClick, type = 'button', size = 'medium', disabled = false, variant = 'primary' }: ButtonProps) => {
    return (
        <button
            className={`rounded-md ${sizeStyles[size]} ${variantStyles[variant]}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button;
