import { Link } from 'react-router-dom'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Nav />
            <div className='flex-1'>
                {children}
            </div>
        </div>
    )
}

export default Layout;


const Nav = () => {
    return (
        <div className='flex justify-between items-center bg-gray-200 p-4'>
            <div className='flex items-center gap-4'>
                <Link to='/candidates'>Candidates</Link>
                <Link to='/jobs'>Jobs</Link>
                <Link to='/clients'>Clients</Link>
                <Link to='/organisations'>Organisations</Link>
            </div>
            <div className='flex items-center gap-4'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        </div>
    )
}



