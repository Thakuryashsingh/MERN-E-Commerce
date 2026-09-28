import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../../services/productApi';
import { errorMessage } from '../../utils/errors';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let active = true;
    getProduct(id)
      .then(({ data }) => { if (active) setProduct(data.product); })
      .catch(err => { if (active) setError(errorMessage(err, 'Could not load this item.')); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-8 sm:px-8"><Loader label="Opening the details" /></main>;
  if (error) return <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-5 text-center sm:px-8"><h3 className="font-serif text-3xl">We couldn’t find that piece.</h3><p className="my-3 text-xs text-muted">{error}</p><Link to="/products" className="mt-3 bg-green px-4 py-3 text-xs text-white">Back to collection</Link></main>;

  return <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-7 pb-20 sm:px-8 sm:py-10">
    <Link to="/products" className="inline-flex items-center gap-2 text-[10px] text-muted hover:text-ink"><ArrowLeft size={15} /> Back to the collection</Link>
    <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-[75px]">
      <div className="h-[clamp(290px,70vw,530px)] bg-[#ecebe2]">
        {product.image ? <img src={product.image} alt={product.name} className="size-full object-cover" /> :
          <div className="grid size-full place-items-center bg-[radial-gradient(ellipse_at_center,#d5d7c2_0%,#eae9df_55%)]"><span className="font-serif text-[150px] italic text-[#75816b]/75">{product.category?.slice(0, 1)?.toUpperCase() || 'F'}</span></div>}
      </div>
      <div className="max-w-[420px] py-5">
        <span className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#8a8d81]">{product.category}</span>
        <h1 className="mt-4 font-serif text-[clamp(42px,8vw,61px)] leading-none tracking-[-.06em]">{product.name}</h1>
        <p className="mb-6 mt-3 text-base">${Number(product.price).toFixed(2)}</p>
        <p className="border-t border-line pt-5 text-xs leading-7 text-muted">{product.description}</p>
        <div className="mt-6 flex items-center gap-2 text-[10px] text-muted"><span className={`size-1.5 rounded-full ${product.stock > 0 ? 'bg-[#829375]' : 'bg-[#b27e6b]'}`} />{product.stock > 0 ? `${product.stock} available` : 'Currently sold out'}</div>
        {isAuthenticated && <Link to={`/products/edit/${product._id}`} className="mt-6 inline-flex items-center gap-4 bg-green px-4 py-3 text-[10px] text-white">Edit this item <ArrowUpRight size={16} /></Link>}
        <div className="mt-12 border-t border-line pt-4"><span className="text-[8px] tracking-[.15em] text-[#96988e]">01 / OBJECT NOTES</span><p className="mt-2 font-serif text-[15px] italic leading-6 text-[#797d71]">Chosen with care. Made to find its place in your everyday.</p></div>
      </div>
    </div>
  </main>;
}
