
  const Avatar = () => {
  
    const account = {
      name: 'John Doe',
    }

    const initials = account.name.split(' ').map(name => name[0]).join('');
  
  
    return (
      <div className='bg-slate-200 h-8 w-8 rounded-full flex items-center justify-center text-slate-800 font-bold'>
        {initials}
      </div>
    )
  
  }

export default Avatar;