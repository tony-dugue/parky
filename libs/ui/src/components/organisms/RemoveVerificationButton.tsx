import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import {
  RemoveVerificationDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { Button } from '../atoms/Button'

export const RemoveVerificationButton = ({
  garageId,
}: {
  garageId: number
}) => {
  const { t } = useTranslation()

  const [removeVerification, { loading }] = useMutation(
    RemoveVerificationDocument,
    {
      awaitRefetchQueries: true,
      refetchQueries: [namedOperations.Query.Garages],
    },
  )

  return (
    <Button
      size="none"
      variant="text"
      loading={loading}
      className="font-semibold"
      onClick={async () => {
        await removeVerification({
          variables: {
            where: {
              garageId,
            },
          },
        })
      }}
    >
      {t('button.unlist')}
    </Button>
  )
}
