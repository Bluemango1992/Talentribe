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

export default Avatar;