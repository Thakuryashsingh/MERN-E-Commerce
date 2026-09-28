import { ArrowUpRight, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, editable = false, onDelete }) {
  return (
    <article className="group min-w-0">
      <Link to={`/products/${product._id}`} className="relative block h-[clamp(200px,30vw,270px)] overflow-hidden bg-[#eeece4]" aria-label={`View ${product.name}`}>
        {product.image ? <img src={product.image} alt={product.name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" /> :
          <div className="relative grid size-full place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#d5d7c2_0%,transparent_62%)]">
            <span className="absolute size-[66%] rotate-[-30deg] scale-y-[.42] rounded-full border border-[#85907830]" />
            <span className="absolute size-[66%] rotate-[31deg] scale-y-[.42] rounded-full border border-[#85907830]" />
            <span className="font-serif text-[91px] italic text-[#75816b]/75">{product.category?.slice(0, 1)?.toUpperCase() || 'F'}</span>
            <i className="absolute bottom-4 left-4 text-[7px] not-italic tracking-[.17em] text-[#858979]">FIELDWORK OBJECTS</i>
          </div>}
        <span className="absolute right-3 top-3 grid size-[31px] translate-y-1 place-items-center rounded-full bg-paper/90 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={17} /></span>
      </Link>

      <div className="mt-3.5 flex justify-between text-[9px]">
        <span className="uppercase tracking-[.1em] text-[#7e8274]">{product.category}</span>
        <span className="text-muted">{product.stock > 0 ? 'In stock' : 'Sold out'}</span>
      </div>
      <div className="mt-1.5 flex items-baseline justify-between gap-2">
        <Link to={`/products/${product._id}`} className="font-brand text-[17px] font-medium tracking-[-.045em] hover:text-olive">{product.name}</Link>
        <span className="shrink-0 text-[11px]">${Number(product.price).toFixed(2)}</span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[10px] leading-[1.7] text-muted">{product.description}</p>

      {editable && <div className="mt-3 flex gap-4 border-t border-line pt-2">
        <Link to={`/products/edit/${product._id}`} className="inline-flex items-center gap-1.5 py-1 text-[10px] text-muted hover:text-ink"><Pencil size={14} /> Edit</Link>
        <button onClick={() => onDelete(product._id)} className="inline-flex items-center gap-1.5 py-1 text-[10px] text-muted hover:text-[#a35344]"><Trash2 size={14} /> Delete</button>
      </div>}
    </article>
  );
}
