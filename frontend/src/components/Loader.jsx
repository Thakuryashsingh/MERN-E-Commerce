export default function Loader({ label = 'Loading' }) {
  return <div className="flex min-h-56 items-center justify-center gap-3 text-xs text-muted" role="status">
    <span className="size-[17px] animate-spin rounded-full border border-[#d8dbce] border-t-green" />
    <span>{label}</span>
  </div>;
}
