'use client'
import { Fragment, ReactNode } from 'react'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { TbX } from 'react-icons/tb'

export interface ISidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode
  blur?: boolean
}

export const Sidebar = ({
  open,
  setOpen,
  children,
  blur = true,
}: ISidebarProps) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={() => setOpen(false)}
      >
        <div
          className="absolute inset-0 overflow-hidden  "
          //   onClick={() => setOpen(false)}
        >
          {blur ? (
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            </TransitionChild>
          ) : null}

          <div className="fixed inset-y-0 right-0 flex max-w-full bg-white  ">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-150"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-100"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="flex flex-col w-screen max-w-md p-3">
                <button
                  type="button"
                  className="absolute top-0 right-0 z-10 m-2 ml-auto rounded-full"
                  onClick={() => setOpen(false)}
                >
                  <TbX className="w-6 h-6 p-1" aria-hidden="true" />
                </button>
                {children}
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
