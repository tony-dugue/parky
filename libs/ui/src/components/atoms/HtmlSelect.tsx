import React, { InputHTMLAttributes } from 'react'

export const HtmlSelect = React.forwardRef<
  HTMLSelectElement,
  InputHTMLAttributes<HTMLSelectElement>
>(({ children, ...props }: InputHTMLAttributes<HTMLSelectElement>, ref) => (
  <select
    {...props}
    ref={ref}
    className="block w-full px-3 py-2 border rounded-md appearance-none placeholder-gray-300 border-gray-200 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
  >
    {children}
  </select>
))

HtmlSelect.displayName = 'HtmlSelect'
