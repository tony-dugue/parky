import { TbExclamationCircle } from 'react-icons/tb'

//export interface IFormErrorProps {}

export const FormError = ({ error }: { error?: string | undefined }) => {
  if (error) {
    return (
      <div className="flex items-center justify-start gap-1 mt-1 text-xs text-red-500">
        <TbExclamationCircle className="inline w-4 h-4 text-red-500" /> {error}
      </div>
    )
  }
  return null
}
