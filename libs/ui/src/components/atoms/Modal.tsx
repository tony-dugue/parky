'use client'
import { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Button } from './Button'

interface ModalProps {
  isOpen?: boolean
  loading?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  loading,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) return
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return
    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return
    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-neutral-800/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`translate duration-300 h-full lg:h-auto md:h-auto
            ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          >
            <div
              className="
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                bg-white
                outline-none
                focus:outline-none
                max-h-[90vh]
                overflow-hidden
              "
            >
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-between border-b">
                <div className="text-lg font-semibold">{title}</div>
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition"
                >
                  <IoMdClose size={18} />
                </button>
              </div>

              {/* BODY - Scrollable */}
              <div className="relative p-6 flex-auto overflow-y-auto">
                {body}
              </div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6 border-t">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      fullWidth
                      variant="outlined"
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                    >
                      {secondaryActionLabel}
                    </Button>
                  )}
                  <Button
                    disabled={disabled}
                    fullWidth
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    {actionLabel}
                  </Button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
