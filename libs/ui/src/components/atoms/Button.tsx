import { TbRotateClockwise2 } from 'react-icons/tb'
import { IconType } from 'react-icons'

type ButtonSizes = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export type IButtonProps = {
  size?: ButtonSizes
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'success' | 'error' | 'white' | 'black'
  fullWidth?: boolean
  loading?: boolean
  icon?: IconType
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const variantColor = {
  contained: {
    primary: 'text-black bg-primary border-primary hover:opacity-90',
    white: 'text-black bg-white',
    black: 'text-primary bg-black hover:bg-gray-900',
    success: 'text-white bg-green hover:bg-green-700',
    error: 'text-white bg-red hover:bg-red-700',
  },

  outlined: {
    primary: 'bg-white border-black text-black hover:bg-black/10',
    white: 'border-white text-white hover:bg-white/10',
    black: 'border-black text-black hover:bg-black/10',
    success: 'border-green text-green hover:bg-green-100',
    error: 'border-red text-red hover:bg-red-100',
  },
  text: {
    primary: 'text-primary-800 ',
    white: 'text-white',
    black: 'text-black',
    success: 'text-green ',
    error: 'text-red ',
  },
}

const sizes: { [key in ButtonSizes]: string } = {
  none: 'text-xs',
  sm: 'border px-3 py-1 text-sm font-light border-[1px]',
  md: 'border-2 px-4 py-2 text-md font-medium',
  lg: ' border-2 px-5 py-2 text-lg font-semibold',
  xl: ' border-2 px-8 py-3 text-xl',
}

export const Button = ({
  size = 'md',
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  children,
  className,
  loading = false,
  type = 'button',
  icon: Icon,
  ...props
}: IButtonProps) => {
  const variantCls = variantColor[variant][color]
  //   variant === 'text' ? sizes.none :
  const sizeCls = sizes[size]

  const fwCls = fullWidth && 'w-full'
  const disCls = (disabled || loading) && 'opacity-70 cursor-auto'

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`relative rounded-lg font-md transition ${sizeCls} ${fwCls} ${variantCls} ${disCls}  ${className} `}
      {...props}
    >
      {loading ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <TbRotateClockwise2 className="w-5 h-5 animate-spin" />
          </div>
          <div className="opacity-10">{children}</div>
        </>
      ) : (
        <>
          {Icon && <Icon size={24} className="absolute left-4 top-3" />}
          {children}
        </>
      )}
    </button>
  )
}
