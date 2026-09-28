import { ArrowUpRight, LogOut, Plus, ShoppingBag } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navClass = ({ isActive }) => `text-xs transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`;

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-line bg-paper sm:h-[76px]">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-4 sm:px-7 lg:px-[50px]">
        <Link to="/products" className="flex items-center gap-2.5 font-brand text-xl font-bold tracking-[-1px]">
          <span className="grid size-7 place-items-center rounded-full border border-[#a1a393] text-green"><ShoppingBag size={17} strokeWidth={1.8} /></span>
          <span>fieldwork<span className="text-clay">.</span></span>
        </Link>

        <nav className="hidden h-full items-center gap-9 md:flex" aria-label="Main navigation">
          <NavLink to="/products" end className={navClass}>Discover</NavLink>
          <a href="/products#collection" className="text-xs text-muted transition-colors hover:text-ink">The collection</a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          {isAuthenticated ? <>
            <span className="hidden text-xs text-muted sm:inline">Hi, {user?.name?.split(' ')[0]}</span>
            <Link to="/products/add" className="flex items-center gap-2 bg-green px-3 py-2.5 text-xs text-white transition-colors hover:bg-[#25372d] sm:px-4"><Plus size={15} /><span className="hidden sm:inline">Add item</span></Link>
            <button onClick={handleLogout} className="grid place-items-center p-1 text-muted hover:text-ink" aria-label="Log out" title="Log out"><LogOut size={17} /></button>
          </> : <>
            <Link to="/login" className="text-xs text-muted hover:text-ink">Log in</Link>
            <Link to="/register" className="flex items-center gap-2 bg-green px-3 py-2.5 text-xs text-white transition-colors hover:bg-[#25372d] sm:px-4">Join us <ArrowUpRight size={14} /></Link>
          </>}
        </div>
      </div>
    </header>
  );
}
