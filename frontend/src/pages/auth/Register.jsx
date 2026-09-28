import { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { errorMessage, fieldErrors } from '../../utils/errors';

const inputClass = 'w-full border border-[#deddd3] bg-transparent px-3 py-3 text-[11px] text-ink placeholder:text-[#b0b1a7] focus:border-olive focus:outline-none';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/products" replace />;

  async function submit(event) {
    event.preventDefault();
    setError('');
    setErrors([]);
    if (form.password !== form.confirmPassword) {
      setError('Those passwords don’t match yet.');
      return;
    }
    setBusy(true);
    try {
      const result = await register({ name: form.name, email: form.email, password: form.password });
      navigate('/login', { replace: true, state: { message: result.message || 'Account created. You can now log in.', email: form.email } });
    } catch (err) {
      setError(errorMessage(err, 'Could not create your account.'));
      setErrors(fieldErrors(err));
    } finally {
      setBusy(false);
    }
  }

  function fieldError(field) { return errors.find(item => item.field === field)?.message; }

  return <main className="grid min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-76px)] md:grid-cols-2">
    <div className="relative hidden flex-col justify-between overflow-hidden bg-[#e9e7dc] p-8 md:flex lg:px-11">
      <div className="absolute -bottom-28 -right-24 size-[430px] rounded-full border border-[#78816d23] shadow-[0_0_0_33px_#78816d0c,0_0_0_70px_#78816d09]" />
      <Link to="/products" className="relative z-10 inline-flex items-center gap-2 text-[10px] text-muted"><ArrowLeft size={15} /> Back to the shop</Link>
      <div className="relative z-10 my-auto ml-[12%] py-9">
        <span className="mb-11 grid size-14 place-items-center rounded-full border border-[#7f8973] font-serif text-4xl italic text-[#66745e]">f<span className="text-clay">.</span></span>
        <span className="text-[8px] font-semibold uppercase tracking-[.17em] text-[#8a8d81]">MAKE YOURSELF AT HOME</span>
        <h2 className="mt-5 font-serif text-[clamp(43px,5.2vw,64px)] leading-none tracking-[-.06em]">A little more<br />room for <em className="font-normal text-[#697660]">good.</em></h2>
        <p className="mt-4 max-w-[290px] text-[11px] leading-6 text-muted">Keep your favourites close and make the collection your own.</p>
      </div>
      <span className="relative z-10 text-[8px] tracking-[.13em] text-[#878a7e]">FIELDWORK GOODS · EST. 2024</span>
    </div>

    <section className="flex items-center justify-center px-6 py-12 sm:px-10">
      <div className="w-full max-w-[420px]">
        <Link to="/products" className="mb-8 inline-flex items-center gap-2 text-[10px] text-muted md:hidden"><ArrowLeft size={15} /> Back to the shop</Link>
        <span className="block text-[9px] font-semibold uppercase tracking-[.17em] text-[#8a8d81]">A NEW ACCOUNT</span>
        <h1 className="mt-4 font-serif text-[55px] leading-none tracking-[-.06em]">Come on<br /><em className="font-normal text-[#697660]">in.</em></h1>
        <p className="mb-6 mt-3 text-[11px] text-muted">It only takes a moment to get started.</p>
        {error && <div className="mb-4 bg-[#f3e7e2] px-3 py-2.5 text-[11px] text-[#9a4e3f]" role="alert">{error}</div>}

        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <label className="flex flex-col gap-2 text-[10px] text-[#52564d]"><span>Your name</span><input autoComplete="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="How should we call you?" className={inputClass} />{fieldError('name') && <small className="text-[9px] text-[#a14f42]">{fieldError('name')}</small>}</label>
          <label className="flex flex-col gap-2 text-[10px] text-[#52564d]"><span>Email address</span><input type="email" autoComplete="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" className={inputClass} />{fieldError('email') && <small className="text-[9px] text-[#a14f42]">{fieldError('email')}</small>}</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex min-w-0 flex-col gap-2 text-[10px] text-[#52564d]"><span>Password</span><input type="password" autoComplete="new-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="8+ characters" className={inputClass} />{fieldError('password') && <small className="text-[9px] text-[#a14f42]">{fieldError('password')}</small>}</label>
            <label className="flex min-w-0 flex-col gap-2 text-[10px] text-[#52564d]"><span>Confirm</span><input type="password" autoComplete="new-password" value={form.confirmPassword} onChange={event => setForm({ ...form, confirmPassword: event.target.value })} placeholder="Type it again" className={inputClass} /></label>
          </div>
          <button className="mt-1 inline-flex w-full items-center justify-center gap-4 bg-green px-4 py-3 text-[10px] text-white transition-colors hover:bg-[#25372d] disabled:cursor-wait disabled:opacity-55" disabled={busy}>{busy ? 'Creating account…' : 'Create account'} <ArrowUpRight size={16} /></button>
        </form>
        <p className="mt-5 text-[10px] text-muted">Already one of us? <Link to="/login" className="inline-flex items-center gap-1 font-semibold text-[#475b48]">Sign in <ArrowUpRight size={14} /></Link></p>
      </div>
    </section>
  </main>;
}
