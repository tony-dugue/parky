import React, { HTMLProps } from 'react'

export const HtmlTextArea = React.forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement>
>((props, ref) => (
  <textarea
    ref={ref}
    {...props}
    className="block w-full px-3 py-2 border rounded-md appearance-none placeholder-gray-300 read-only:text-gray-600 read-only:cursor-not-allowed focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
  />
))
HtmlTextArea.displayName = 'TextArea'
