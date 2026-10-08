import { Link } from 'react-router-dom'

const baseClasses =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-transparent font-semibold leading-none whitespace-nowrap transition duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  secondary:
    'border-border-strong bg-white/[0.04] text-foreground hover:border-primary hover:bg-primary-soft hover:text-primary',
  ghost: 'bg-transparent text-muted hover:bg-border-subtle hover:text-foreground',
  icon: 'size-11 border-border-strong bg-transparent p-0 text-foreground hover:border-primary hover:bg-primary-soft hover:text-primary',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    baseClasses,
    variantClasses[variant] ?? variantClasses.primary,
    variant === 'icon' ? '' : (sizeClasses[size] ?? sizeClasses.md),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
