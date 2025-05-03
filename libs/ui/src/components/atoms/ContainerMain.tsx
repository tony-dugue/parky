import { ReactNode } from 'react'

export interface IContainerProps {
  children: ReactNode
  className?: string
}

export const ContainerMain = ({ children, className }: IContainerProps) => (
  <div
    className={`max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px:2 px-4 pb-10 pt-10 ${className}`}
  >
    {children}
  </div>
)
