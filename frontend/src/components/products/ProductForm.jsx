import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const blank = { name: '', description: '', price: '', stock: '', category: '', image: '' };
const fields = ['name', 'description', 'price', 'stock', 'category', 'image'];
const inputClass = 'w-full border border-[#deddd3] bg-[#fbfaf6] px-3 py-3 text-[11px] text-ink placeholder:text-[#b0b1a7] focus:border-olive focus:outline-none';

export default function ProductForm({ initialValues, onSubmit, submitLabel = 'Save item', errors = [], busy = false }) {
  const [form, setForm] = useState({ ...blank });
  const [localErrors, setLocalErrors] = useState({});
  useEffect(() => {
    if (initialValues) setForm({ ...blank, ...initialValues, price: String(initialValues.price ?? ''), stock: String(initialValues.stock ?? '') });
  }, [initialValues]);

  const backendErrors = Object.fromEntries(errors.map(error => [error.field, error.message]));

  function change(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
    setLocalErrors(current => ({ ...current, [event.target.name]: '' }));
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    for (const key of ['name', 'description', 'category']) if (!form[key].trim()) nextErrors[key] = 'This field is required.';
    if (form.price === '' || Number(form.price) < 0) nextErrors.price = 'Enter a price of 0 or more.';
    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0 || form.stock === '') nextErrors.stock = 'Enter a whole number of 0 or more.';
    if (form.image && !/^https?:\/\//i.test(form.image)) nextErrors.image = 'Enter a full image URL starting with http or https.';
    setLocalErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    await onSubmit({ ...form, price: Number(form.price), stock: Number(form.stock), image: form.image.trim() });
  }

  function renderField(field) {
    const label = field === 'image' ? 'Image URL' : field[0].toUpperCase() + field.slice(1);
    const error = localErrors[field] || backendErrors[field];
    const wide = field === 'description' || field === 'image';
    return <label key={field} className={`flex min-w-0 flex-col gap-2 ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="text-[10px] text-[#52564d]">{label}{field === 'image' && <small className="text-muted"> · optional</small>}</span>
      {field === 'description' ?
        <textarea name={field} value={form[field]} onChange={change} rows="5" placeholder="A few words about what makes it special…" className={`${inputClass} resize-y`} /> :
        <input name={field} value={form[field]} onChange={change} type={field === 'price' ? 'number' : field === 'stock' ? 'number' : field === 'image' ? 'url' : 'text'} min={field === 'price' || field === 'stock' ? '0' : undefined} step={field === 'price' ? '0.01' : field === 'stock' ? '1' : undefined} placeholder={{ name: 'e.g. Arc desk lamp', price: '0.00', stock: '12', category: 'Lighting', image: 'https://…' }[field] || ''} className={inputClass} />}
      {error && <small className="text-[9px] text-[#a14f42]">{error}</small>}
    </label>;
  }

  return <form onSubmit={submit} noValidate className="space-y-6 border-t border-line pt-7">
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{fields.map(renderField)}</div>
    <button className="inline-flex min-w-36 items-center justify-center gap-4 bg-green px-4 py-3 text-[10px] text-white transition-colors hover:bg-[#25372d] disabled:cursor-wait disabled:opacity-55" disabled={busy}>
      {busy ? 'Saving…' : submitLabel}<ArrowUpRight size={16} />
    </button>
  </form>;
}
