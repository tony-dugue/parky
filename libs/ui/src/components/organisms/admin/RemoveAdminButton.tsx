import { useMutation } from '@apollo/client'
import {
  RemoveAdminDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { Button } from '../../atoms/Button'
import { IconTrash } from '@tabler/icons-react'
import { Dialog } from '../../atoms/Dialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const RemoveAdminButton = ({ uid }: { uid: string }) => {
  const { t } = useTranslation()

  const [removeAdmin, { loading }] = useMutation(RemoveAdminDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.admins],
  })

  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="text"
        size="none"
        loading={loading}
        onClick={() => setOpen(true)}
      >
        <IconTrash className="w-8 h-8 p-2 bg-red-50" />
      </Button>
      <Dialog open={open} setOpen={setOpen} title={t('admin.delete')}>
        <div>{t('admin.remove-admin')}</div>
        <div className="my-2 text-xs text-gray">{uid}</div>
        <div className="grid w-full grid-cols-2 gap-2 mt-4">
          <Button variant="outlined" onClick={() => setOpen(false)}>
            {t('button.cancel')}
          </Button>
          <Button
            loading={loading}
            onClick={async () => {
              await removeAdmin({ variables: { where: { uid } } })
            }}
          >
            {t('button.confirm')}
          </Button>
        </div>
      </Dialog>
    </>
  )
}
