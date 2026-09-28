import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/products/ProductCard';
import Loader from '../../components/Loader';
import { deleteProduct, getProducts } from '../../services/productApi';
import { useAuth } from '../../context/AuthContext';
import { errorMessage } from '../../utils/errors';

const eyebrow = 'flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.17em] text-[#8a8d81]';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All pieces');
  const [notice, setNotice] = useState('');
  const { isAuthenticated } = useAuth();

  async function loadProducts() {
    setLoading(true);
    setError('');
    try {
      const { data } = await getProducts();
      setProducts(data.products);
    } catch (err) {
      setError(errorMessage(err, 'Could not load products. Check that the API is running.'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadProducts(); }, []);

  const categories = useMemo(() => ['All pieces', ...new Set(products.map(item => item.category).filter(Boolean))], [products]);
  const shown = useMemo(() => products.filter(item =>
    (category === 'All pieces' || item.category === category) &&
    `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  ), [products, category, query]);

  async function remove(id) {
    const item = products.find(product => product._id === id);
    if (!window.confirm(`Remove “${item?.name}” from the collection?`)) return;
    try {
      await deleteProduct(id);
      setProducts(items => items.filter(product => product._id !== id));
      setNotice('Item removed from the collection.');
      setTimeout(() => setNotice(''), 3000);
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return <>
    <main>
      <section className="mx-auto max-w-[1320px] px-[18px] pt-7 sm:px-7 sm:pt-10 lg:px-[50px]">
        <div className="grid md:grid-cols-2">
          <div className="py-8 md:px-[3.5%] md:py-16">
            <span className={eyebrow}><span className="size-1.5 rounded-full bg-olive" /> A SMALLER, BETTER WAY TO SHOP</span>
            <h1 className="mt-6 font-serif text-[67px] leading-[.99] tracking-[-.065em] sm:text-[82px] lg:text-[88px]">Good things,<br /><em className="font-normal text-[#697660]">well chosen.</em></h1>
            <p className="mt-4 max-w-[365px] text-xs leading-7 text-muted sm:text-[13px]">Useful objects with a little more thought behind them. Made to be kept, used, and loved.</p>
            <a href="#collection" className="mt-6 inline-flex items-center gap-5 border-b border-[#8a8d81] py-3 text-[11px]">Explore the collection <ArrowDownRight size={17} /></a>
          </div>
          <div className="relative grid min-h-[280px] place-items-center overflow-hidden bg-[#ebe9dd] sm:min-h-[350px] lg:min-h-[415px]">
            <div className="absolute inset-y-0 left-1/3 border-l border-[#6067511a]" /><div className="absolute inset-y-0 left-2/3 border-l border-[#6067511a]" />
            <div className="absolute size-[250px] rounded-full border border-[#54634c2e] sm:size-[300px]" />
            <div className="absolute size-[330px] rounded-full border border-[#54634c2e] sm:size-[390px]" />
            <div className="grid size-36 place-items-center rounded-full bg-[radial-gradient(circle_at_34%_30%,#d0d3b7_0%,#abb397_38%,#858e76_78%,#6d7967_100%)] shadow-2xl sm:size-48"><span className="-translate-y-1 font-serif text-7xl italic text-[#eff0df8f] sm:text-8xl">F</span></div>
            <span className="absolute left-6 top-6 text-[8px] leading-relaxed tracking-[.14em] text-[#747968]">EST. 2024<br />A THOUGHTFUL EDIT</span>
            <span className="absolute bottom-6 right-6 text-right text-[8px] leading-relaxed tracking-[.14em] text-[#747968]">OBJECTS FOR<br />EVERYDAY LIVING</span>
          </div>
        </div>
        <div className="flex h-[55px] items-center justify-between border-t border-line text-[7px] tracking-[.14em] text-[#999a8d] sm:h-[65px] sm:text-[8px]">
          <span>INDEPENDENT FINDS, MADE TO LAST</span><span>01 — 06 / THE EDIT</span>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] border-t border-line px-[18px] py-14 sm:px-7 sm:py-[67px] lg:px-[50px]" id="collection">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
          <div><span className={eyebrow}>THE CURRENT EDIT</span><h2 className="mt-3 font-serif text-[42px] leading-tight tracking-[-.055em] sm:text-[57px]">Considered <em className="font-normal text-[#697660]">essentials.</em></h2></div>
          <p className="mb-1 text-[11px] leading-6 text-muted">A little less, a little better.<br />Find your next everyday favourite.</p>
        </div>

        <div className="mb-7 border-b border-line sm:flex sm:min-h-[50px] sm:items-start sm:justify-between">
          <div className="flex gap-5 overflow-x-auto sm:gap-6">
            {categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`relative shrink-0 pb-3.5 text-[10px] ${category === item ? 'text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[#65765d]' : 'text-[#909187]'}`}>{item}</button>)}
          </div>
          <label className="flex items-center gap-2 border-t border-line py-3 text-[#96978e] sm:border-0 sm:py-0 sm:pb-3">
            <Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Find something…" aria-label="Search products" className="w-full bg-transparent text-[10px] text-ink outline-none placeholder:text-muted sm:w-32" />
          </label>
        </div>

        {notice && <div className="my-4 bg-[#e9ede3] px-3 py-2.5 text-[11px] text-[#4b6447]">{notice}</div>}
        {loading ? <Loader label="Finding the good stuff" /> : error ?
          <div className="flex min-h-[280px] flex-col items-center justify-center bg-[#efede5] p-9 text-center">
            <span className="text-[8px] tracking-[.17em] text-[#96998d]">A SMALL PAUSE</span><h3 className="mt-3 font-serif text-2xl">We couldn’t get the collection.</h3><p className="my-2 max-w-md text-[11px] leading-6 text-muted">{error}</p><button className="mt-3 inline-flex items-center gap-4 bg-green px-4 py-3 text-[10px] text-white" onClick={loadProducts}>Try again <ArrowUpRight size={16} /></button>
          </div> : shown.length ?
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-9">{shown.map(product => <ProductCard key={product._id} product={product} editable={isAuthenticated} onDelete={remove} />)}</div> :
              <div className="flex min-h-[280px] flex-col items-center justify-center bg-[#efede5] p-9 text-center"><SlidersHorizontal size={22} className="mb-3 text-[#8a9079]" /><span className="text-[8px] tracking-[.17em] text-[#96998d]">NOTHING HERE JUST YET</span><h3 className="mt-3 font-serif text-2xl">{products.length ? 'No pieces match that search.' : 'The shelves are taking shape.'}</h3><p className="my-2 text-[11px] leading-6 text-muted">{products.length ? 'Try another name or category.' : 'The collection will appear here when products are added.'}</p>{(query || category !== 'All pieces') && <button onClick={() => { setQuery(''); setCategory('All pieces'); }} className="inline-flex items-center gap-1 text-[10px] text-green">Clear filters <ArrowUpRight size={15} /></button>}</div>}
      </section>
    </main>

    <footer className="flex min-h-[76px] flex-wrap items-center justify-between gap-3 border-t border-line px-[18px] text-[9px] text-muted sm:px-7 lg:px-[max(50px,calc((100vw-1220px)/2))]">
      <Link to="/products" className="font-brand text-base font-bold tracking-[-.7px] text-ink">fieldwork<span className="text-clay">.</span></Link><span className="hidden sm:inline">Thoughtful things for everyday life.</span><span>© 2026 FIELDWORK GOODS</span>
    </footer>
  </>;
}
