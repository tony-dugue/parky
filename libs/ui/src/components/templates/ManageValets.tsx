'use client'
import { ListValets } from '../organisms/ListValets'
import { CreateValetModal } from '../organisms/modals/CreateValetModal'

export const ManageValets = () => {
  return (
    <div>
      <div className="flex justify-end">
        <CreateValetModal />
      </div>
      <ListValets />
    </div>
  )
}
