import { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { errorMessage, fieldErrors } from '../../utils/errors';

const inputClass = 'w-full border border-[#deddd3] bg-transparent px-3 py-3 text-[11px] text-ink placeholder:text-[#b0b1a7] focus:border-olive focus:outline-none';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) return <Navigate to="/products" replace />;

  async function submit(event) {
    event.preventDefault();
    setError('');
    setErrors([]);
    if (!form.email || !form.password) {
      setError('Enter your email and password to continue.');
      return;
    }
    setBusy(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/products', { replace: true });
    } catch (err) {
      setError(errorMessage(err, 'Could not log in.'));
      setErrors(fieldErrors(err));
    } finally {
      setBusy(false);
    }
  }

  const emailError = errors.find(item => item.field === 'email')?.message;
  const passwordError = errors.find(item => item.field === 'password')?.message;

  return <main className="grid min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-76px)] md:grid-cols-2">
    <div className="relative hidden flex-col justify-between overflow-hidden bg-[#e9e9dd] p-8 md:flex lg:px-11">
      <div className="absolute -bottom-28 -right-24 size-[430px] rounded-full border border-[#78816d23] shadow-[0_0_0_33px_#78816d0c,0_0_0_70px_#78816d09]" />
      <Link to="/products" className="relative z-10 inline-flex items-center gap-2 text-[10px] text-muted"><ArrowLeft size={15} /> Back to the shop</Link>
      <div className="relative z-10 my-auto ml-[12%] py-9">
        <span className="mb-11 grid size-14 place-items-center rounded-full border border-[#7f8973] font-serif text-4xl italic text-[#66745e]">f<span className="text-clay">.</span></span>
        <span className="text-[8px] font-semibold uppercase tracking-[.17em] text-[#8a8d81]">A GOOD PLACE TO BEGIN</span>
        <h2 className="mt-5 font-serif text-[clamp(43px,5.2vw,64px)] leading-none tracking-[-.06em]">Welcome back<br />to <em className="font-normal text-[#697660]">good things.</em></h2>
        <p className="mt-4 max-w-[290px] text-[11px] leading-6 text-muted">Your considered collection is waiting.</p>
      </div>
      <span className="relative z-10 text-[8px] tracking-[.13em] text-[#878a7e]">FIELDWORK GOODS · EST. 2024</span>
    </div>

    <section className="flex items-center justify-center px-6 py-12 sm:px-10">
      <div className="w-full max-w-[370px]">
        <span className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#8a8d81]">YOUR ACCOUNT</span>
        <h1 className="mt-4 font-serif text-[55px] leading-none tracking-[-.06em] sm:text-[59px]">Good to see<br /><em className="font-normal text-[#697660]">you again.</em></h1>
        <p className="mb-6 mt-3 text-[11px] text-muted">Sign in to manage your collection.</p>
        {location.state?.message && <div className="mb-4 bg-[#e9ede3] px-3 py-2.5 text-[11px] text-[#4b6447]" role="status">{location.state.message}</div>}
        {error && <div className="mb-4 bg-[#f3e7e2] px-3 py-2.5 text-[11px] text-[#9a4e3f]" role="alert">{error}</div>}
        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <label className="flex flex-col gap-2 text-[10px] text-[#52564d]"><span>Email address</span><input type="email" autoComplete="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" className={inputClass} />{emailError && <small className="text-[9px] text-[#a14f42]">{emailError}</small>}</label>
          <label className="flex flex-col gap-2 text-[10px] text-[#52564d]"><span>Password</span><input type="password" autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="Your password" className={inputClass} />{passwordError && <small className="text-[9px] text-[#a14f42]">{passwordError}</small>}</label>
          <button className="mt-1 inline-flex w-full items-center justify-center gap-4 bg-green px-4 py-3 text-[10px] text-white transition-colors hover:bg-[#25372d] disabled:cursor-wait disabled:opacity-55" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <ArrowUpRight size={16} /></button>
        </form>
        <p className="mt-5 text-[10px] text-muted">New around here? <Link to="/register" className="inline-flex items-center gap-1 font-semibold text-[#475b48]">Create an account <ArrowUpRight size={14} /></Link></p>
      </div>
    </section>
  </main>;
}
