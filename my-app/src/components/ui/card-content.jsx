export default function CardContent({ children, className }) {
  return (
    <div
      className={`rounded-none sm:rounded-xl bg-white dark:bg-neutral-900 border border-border p-6 ${className}`}
    >
      {children}
    </div>
  );
}
