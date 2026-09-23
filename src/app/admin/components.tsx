export function AdminLoading({ label = "Loading content…" }: { label?: string }) {
  return <div className="admin-state admin-loading" role="status"><span className="admin-state-dot" />{label}</div>;
}

export function AdminEmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="admin-state admin-empty"><strong>{title}</strong><p>{description}</p>{action}</div>;
}

export function AdminErrorState({ message = "We could not load this content. Please try again." }: { message?: string }) {
  return <div className="admin-state admin-error" role="alert"><strong>Something went wrong</strong><p>{message}</p></div>;
}
