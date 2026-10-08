function Chip({ hover = false, className = '', children }) {
  const classes = [
    'inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-elevated px-3 py-1.5 text-sm text-foreground',
    hover
      ? 'transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary-soft'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <li className={classes}>{children}</li>
}

export default Chip
