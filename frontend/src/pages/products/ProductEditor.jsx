import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/products/ProductForm';
import Loader from '../../components/Loader';
import { createProduct, getProduct, updateProduct } from '../../services/productApi';
import { errorMessage, fieldErrors } from '../../utils/errors';

export default function ProductEditor({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(edit);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!edit) return;
    let active = true;
    getProduct(id)
      .then(({ data }) => { if (active) setProduct(data.product); })
      .catch(err => { if (active) setError(errorMessage(err, 'Could not load product.')); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [edit, id]);

  async function submit(values) {
    setError('');
    setErrors([]);
    setBusy(true);
    try {
      if (edit) await updateProduct(id, values);
      else await createProduct(values);
      navigate('/products', { replace: true, state: { notice: edit ? 'Your changes have been saved.' : 'Your item is now in the collection.' } });
    } catch (err) {
      setError(errorMessage(err, 'Could not save product.'));
      setErrors(fieldErrors(err));
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-8 sm:px-8"><Loader label="Loading the item" /></main>;

  return <main className="mx-auto min-h-[70vh] max-w-3xl px-5 py-7 pb-20 sm:px-8 sm:py-10">
    <Link to={edit ? `/products/${id}` : '/products'} className="inline-flex items-center gap-2 text-[10px] text-muted hover:text-ink"><ArrowLeft size={15} /> {edit ? 'Back to item' : 'Back to the collection'}</Link>
    <div className="mb-8 mt-10">
      <span className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#8a8d81]">{edit ? 'MAKE IT YOURS' : 'ADD TO THE EDIT'}</span>
      <h1 className="mt-4 font-serif text-[52px] leading-none tracking-[-.06em] sm:text-[62px]">{edit ? <>A small <em className="font-normal text-[#697660]">adjustment.</em></> : <>Something <em className="font-normal text-[#697660]">good.</em></>}</h1>
      <p className="mt-3 text-[11px] text-muted">{edit ? 'Update the details below and save your changes.' : 'Share a thoughtful find with the collection.'}</p>
    </div>
    {error && <div role="alert" className="mb-5 bg-[#f3e7e2] px-3 py-2.5 text-[11px] text-[#9a4e3f]">{error}</div>}
    {product === null && edit && error ? <Link className="bg-green px-4 py-3 text-xs text-white" to="/products">Return to collection</Link> : <ProductForm initialValues={product} onSubmit={submit} errors={errors} busy={busy} submitLabel={edit ? 'Save changes' : 'Add item'} />}
  </main>;
}
