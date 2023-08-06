const Header = () => {
    return (
      <div className=' bg-slate-200 flex-0 flex items-center justify-between h-12 px-5'>
        <div className='h-10 bg-slate-500 w-40 rounded-lg'></div>
        <Search placeholder='Search...' />
        <div className='flex items-center justify-between gap-2'>
          <Avatar size='small' />
      </div>
      </div>
    )
  }

export default Header;
  

  
  interface SearchProps {
    placeholder?: string;
  }
  
  function Search({ placeholder }: SearchProps) {
  
    return (
      <div className='flex-1 flex items-center justify-center'>
        <Input placeholder={placeholder} />
      </div>
    )
  }
  
  interface InputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
  }
  
  function Input({
    placeholder,
    value,
    onChange
  }: InputProps) {
  
    return (
      <input 
        className='rounded-lg px-2 py-1 w-5/12'
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
    )
  }
  
  interface AvatarProps {
    size: 'small' | 'medium' | 'large';
  }
  
  const Avatar = ({ size }: AvatarProps) => {
  
    const account = {
      name: 'John Doe',
    }
  
    const initials = account.name.split(' ').map(name => name[0]).join('');
  
    const sizeClasses = {
      small: 'h-8 w-8 text-sm',
      medium: 'h-12 w-12 text-base',
      large: 'h-16 w-16 text-lg',
    };
  
    const classes = `
      ${sizeClasses[size]}
      bg-blue-500
      text-white
      font-medium
      rounded-full
      flex items-center justify-center
    `;
  
    return (
      <div className={classes}>
        {initials}
      </div>
    )
  
  }