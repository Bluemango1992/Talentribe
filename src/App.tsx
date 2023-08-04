function App() {

  return (
    <div className='bg-slate-100 h-screen flex flex-col'>
      <Header />
        <Layout />
    </div>
  )
}

export default App

function Header() {
  return (
    <div className=' bg-slate-100 flex-0 flex items-center justify-between h-12 px-5'>
      <div className='h-10 bg-slate-500 w-40 rounded-lg'></div>
      <Search placeholder='Search...' />
      <div className='flex items-center justify-between gap-2'>
        <Button children='Sign Up' />
        <Button children='Sign In' />
    </div>
    </div>
  )
}

function Layout() {
  return (
    <>
      <SideBar />
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 bg-slate-200'>
          <div className='flex flex-wrap'>
            <div className='flex-1 flex flex-col'>
              <div className='flex-1 bg-slate-300'></div>
              <div className='flex-1 bg-slate-400'></div>
            </div>
            <div className='flex-1 bg-slate-300'></div>
          </div>
        </div>
        <div className='flex-1 bg-slate-300'></div>
    </div>
    </>
  )
}


function SideBar () {

  return (
    <div className='bg-slate-300 h-screen w-12'>
      <div className='bg-slate-400 h-1/2'></div>
      <div className='bg-slate-500 h-1/2'></div>
    </div>
  )
}

interface SearchProps {
  placeholder?: string;
}

function Search({ placeholder }: SearchProps) {

  return (
    <div className='flex-1 flex items-center justify-center'>
      <input 
        className='h-8 rounded-lg px-2 w-64'
        placeholder={placeholder}
      />
    </div>
  )
}


interface ButtonProps {
  children: React.ReactNode;
  color?: 'red' | 'blue' | 'green';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void; 
}

function Button({ 
  children, 
  size = 'medium',
  onClick  
}: ButtonProps) {

  return (
    <button
      className={`bg-slate-500 hover:bg-slate-600 text-white rounded-sm px-4 py-2 ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-md' : 'text-lg'}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}




