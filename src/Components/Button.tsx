
interface ButtonProps {
    children?: React.ReactNode;
    onClick: () => void;
    theme?: 'light' | 'dark';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary';
}

const baseStyles = {
    light: 'text-black',
    dark: 'text-white',
};

const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
};

const variantStyles = {
    primary: 'bg-slate-900 hover:bg-slate-800',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    tertiary: 'bg-transparent hover:bg-gray-100',
};

const Button = ({ children, onClick, theme = 'light', size = 'medium', disabled = false, variant = 'primary' }: ButtonProps) => {
    return (
        <button
            className={`rounded-md ${baseStyles[theme]} ${sizeStyles[size]} ${variantStyles[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;
