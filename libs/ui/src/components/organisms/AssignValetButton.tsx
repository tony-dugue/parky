import {
  AssignValetDocument,
  BookingStatus,
  namedOperations,
} from '@parky/network/src/gql/generated'
import { ReactNode } from 'react'
import { useMutation } from '@apollo/client'
import { toast } from '../molecules/Toast'
import { Button } from '../atoms/Button'
import { useTranslation } from 'react-i18next'

export const AssignValetButton = ({
  bookingId,
  status,
  children,
}: {
  bookingId: number
  status: BookingStatus
  children: ReactNode
}) => {
  const { t } = useTranslation()

  const [assignPickup, { loading }] = useMutation(AssignValetDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.valetDrops,
      namedOperations.Query.valetPickups,
      namedOperations.Query.myDropTrips,
      namedOperations.Query.myPickupTrips,
    ],
    onCompleted(data) {
      toast(`${t('toast.action-successful')} ${data.assignValet.id}`)
    },
  })

  return (
    <Button
      loading={loading}
      variant="outlined"
      fullWidth
      onClick={async () => {
        await assignPickup({
          variables: { bookingId, status },
        })
      }}
    >
      {children}
    </Button>
  )
}
