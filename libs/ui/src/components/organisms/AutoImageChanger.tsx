import { useEffect, useState } from 'react'
import { TbPhotoCancel, TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'

export interface IAutoImageChangerProps {
  images: string[]
  durationPerImage?: number
  aspectRatio?: 'aspect-square' | 'aspect-video' | 'aspect-auto'
  noAutoChange?: boolean
}

export const AutoImageChanger = ({
  images,
  durationPerImage = 5000,
  aspectRatio = 'aspect-square',
  noAutoChange = false,
}: IAutoImageChangerProps) => {
  const { t } = useTranslation()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (noAutoChange) return

    const interval = setInterval(() => {
      setCurrentImageIndex((oldIndex) => (oldIndex + 1) % images.length)
    }, durationPerImage)

    return () => clearInterval(interval)
  }, [durationPerImage, images])

  if (images.length === 0)
    return (
      <div className="flex items-center justify-center w-full h-48 gap-2 text-sm bg-white border select-none border-gray-50 text-gray">
        <TbPhotoCancel /> {t('message.no-images')}
      </div>
    )

  return (
    <div className={`relative w-full overflow-hidden ${aspectRatio}`}>
      <img
        src={process.env.NEXT_PUBLIC_API_URL_UPLOAD + images[currentImageIndex]}
        alt="Garage"
        className="object-cover h-full w-full rounded-xl"
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-1 space-x-2">
        {images.map((_, index) => (
          <div
            className={`h-2 rounded-full ${
              currentImageIndex === index ? 'bg-white w-4' : 'bg-gray-300 w-2'
            }`}
            key={index}
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="absolute transform -translate-y-1/2 top-1/2 left-2"
            onClick={() =>
              setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1,
              )
            }
          >
            <TbChevronLeft className="w-6 h-6 text-black rounded-full bg-white/40 hover:bg-white" />
          </button>
          <button
            type="button"
            className="absolute transform -translate-y-1/2 top-1/2 right-2"
            onClick={() =>
              setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % images.length,
              )
            }
          >
            <TbChevronRight className="w-6 h-6 text-black rounded-full bg-white/40 hover:bg-white" />
          </button>
        </>
      )}
    </div>
  )
}
