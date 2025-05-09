import { ReactNode } from 'react'

export interface IAlertSectionProps {
  title?: ReactNode
  children: ReactNode
}

export const AlertSection = ({ title, children }: IAlertSectionProps) => {
  return (
    <div className="flex flex-col items-center">
      {title ? <div className="mb-4 text-lg font-semibold">{title}</div> : null}
      <div className="bg-white">
        <div className="font-light">{children}</div>
      </div>
    </div>
  )
}
