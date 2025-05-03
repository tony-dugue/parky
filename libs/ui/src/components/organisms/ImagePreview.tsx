import { IconTrash } from '@tabler/icons-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { BaseComponent } from '@parky/util/types'

export interface IImageUploadProps extends BaseComponent {
  srcs?: FileList
  clearImage: () => void
}

export const ImagePreview = ({
  srcs,
  clearImage,
  children,
}: IImageUploadProps) => {
  const { t } = useTranslation()

  if (srcs && srcs?.length > 0) {
    return (
      <div className="grid grid-cols-2 gap-2 relative">
        <button
          onClick={() => clearImage()}
          className="absolute z-10 p-2 text-white bg-red/80 flex gap-2 items-center rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <IconTrash /> {t('message.clear-all')}
        </button>
        {Array.from(srcs)?.map((src, index) => (
          <Image
            key={index}
            className="object-cover h-full w-full aspect-square"
            alt=""
            width={300}
            height={300}
            src={URL.createObjectURL(src)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-full h-full min-h-36">
      {children}
    </div>
  )
}
