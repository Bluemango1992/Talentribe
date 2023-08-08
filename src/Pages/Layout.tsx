import { SideBar , Avatar } from '../Components';

interface LayoutProps {
    children: React.ReactNode;
  }
  
  const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
                <div className='flex min-h-screen'>
                    <SideBar />
                    <div className='flex-1'>
                    {children}
                </div>
                </div>
        </>
    )
    }

  export default Layout;

  const Header = () => {
    return (
        <div className='bg-slate-200 flex-1 flex h-12 items-center justify-between px-3'>
            <div className='bg-slate-900 h-10 w-12' />
            <SearchBar />
            <Avatar size='small' />
        </div>
    )
}

const SearchBar = () => {
    return (
        <div className='flex-1 flex items-center'>
            <input type="text" placeholder="Search" className="bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-md px-2 py-1" />
        </div>
    )
}


  