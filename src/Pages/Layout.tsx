import { SideBar , Avatar, SearchBar } from '../Components';
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
                    <div className='flex flex-col ml-10 flex-1 p-6'>
                        {children}
                    </div>
                </div>
        </div>
    )
    }

  export default Layout;

  const Header = () => {
    return (
        <div className='bg-gradient-to-t from-cyan-950 to-cyan-900 fixed w-full h-12 top-0 left-0 z-50 flex px-4 py-1 items-center justify-between shadow-lg'>
            <div className='flex flex-row items-center space-x-2'>
            <img src={logo} alt="Talentribe" className='h-8' />
            </div>
            <SearchBar />
            <Avatar />
        </div>
    )
}