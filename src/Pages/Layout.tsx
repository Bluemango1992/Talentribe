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
                    <div className='flex flex-col mt-10 ml-10 flex-1 p-6'>
                        {children}
                    </div>
                </div>
        </div>
    )
    }

  export default Layout;

  const Header = () => {
    return (
        <div className='bg-slate-800 fixed w-full h-12 top-0 left-0 z-50 flex px-4 py-1 items-center justify-between'>
            <div className='flex flex-row items-center space-x-2'>
            <img src={logo} alt="Talentribe" className='h-8' />
            <div className='font-maven-font text-white text-lg font-bold tracking-widest'>
                <span className='mr-2'>Talentribe</span>
                </div>
            </div>
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


  