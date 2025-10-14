export default function CardContent({ children, className }) {
  return (
    <div
      className={`rounded-xl bg-white dark:bg-neutral-900 border border-border p-4 md:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
