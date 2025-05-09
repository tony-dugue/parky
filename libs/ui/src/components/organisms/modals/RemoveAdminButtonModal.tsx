import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { TbTrash } from 'react-icons/tb'

import {
  RemoveAdminDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { Button } from '../../atoms/Button'
import { Modal } from '../../atoms/Modal'

export const RemoveAdminButtonModal = ({ uid }: { uid: string }) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const [removeAdmin, { loading }] = useMutation(RemoveAdminDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.admins],
  })

  const onSubmit = async () => {
    await removeAdmin({ variables: { where: { uid } } })
  }

  const bodyContent = (
    <>
      <div>{t('admin.remove-admin')}</div>
      <div className="my-2 text-xs text-gray">{uid}</div>
    </>
  )

  return (
    <>
      <Button
        variant="text"
        size="none"
        loading={loading}
        onClick={() => setOpen(true)}
      >
        <TbTrash className="w-8 h-8 p-2 bg-red-50" />
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        actionLabel={t('button.confirm')}
        secondaryActionLabel={t('button.cancel')}
        secondaryAction={() => setOpen(false)}
        title={t('admin.delete')}
        loading={loading}
        body={bodyContent}
      />
    </>
  )
}
