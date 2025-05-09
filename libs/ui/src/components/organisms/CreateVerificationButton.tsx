import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'

import {
  CreateVerificationDocument,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { Button } from '../atoms/Button'

export const CreateVerificationButton = ({
  garageId,
}: {
  garageId: number
}) => {
  const { t } = useTranslation()

  const [createVerification, { loading }] = useMutation(
    CreateVerificationDocument,
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
      className="font-semibold underline underline-offset-4"
      onClick={async () => {
        await createVerification({
          variables: {
            createVerificationInput: {
              garageId,
              verified: true,
            },
          },
        })
      }}
    >
      {t('button.verification')}
    </Button>
  )
}
