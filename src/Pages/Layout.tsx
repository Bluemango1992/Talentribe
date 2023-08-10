import { SideBar , Avatar } from '../Components';
import logo from '../assets/Talentribe.png';

interface LayoutProps {
    children: React.ReactNode;
  }
  
  const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
                <div className='flex flex-row flex-1'>
                    <SideBar />
                    <div className='flex flex-col flex-1'>
                        {children}
                    </div>
                </div>
        </div>
    )
    }

  export default Layout;

  const Header = () => {
    return (
        <div className='bg-slate-800 flex px-8 py-1 items-center justify-between'>
            <img src={logo} alt="Talentribe" className='h-8' />
            <SearchBar />
            <Avatar />
        </div>
    )
}

const SearchBar = () => {
    return (
        <>
            <input type="text" placeholder="Search" className="bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent rounded-md px-2 py-0.5 w-1/3" />
        </>
    )
}


  