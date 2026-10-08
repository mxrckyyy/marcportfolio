const fieldBase =
  'w-full rounded-sm border border-border bg-background px-3.5 py-2.5 text-[0.95rem] leading-normal text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted focus:border-primary focus:ring-[3px] focus:ring-primary-soft disabled:cursor-not-allowed disabled:opacity-60'

export const labelClasses = 'text-sm font-semibold text-muted'

export const inputClasses = 'min-h-11 ' + fieldBase

export const textareaClasses = 'min-h-[130px] resize-y ' + fieldBase

export const errorClasses = 'break-words text-sm text-danger'

export const statusClasses = {
  success:
    'break-words rounded-sm border border-success/40 bg-success/10 px-4 py-3 text-sm text-success',
  error:
    'break-words rounded-sm border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger',
}
