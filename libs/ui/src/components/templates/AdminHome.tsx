'use client'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'

import { useTakeSkip } from '@parky/util/hooks/pagination'
import { GaragesDocument } from '@parky/network/src/gql/generated'
import { ShowData } from '../organisms/ShowData'
import { GarageAdminCard } from '../organisms/GarageAdminCard'
import { CreateVerificationButton } from '../organisms/CreateVerificationButton'
import { RemoveVerificationButton } from '../organisms/RemoveVerificationButton'

export const AdminHome = () => {
  return <ShowGarages />
}

export const ShowGarages = () => {
  const { t } = useTranslation()

  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { loading, data, error } = useQuery(GaragesDocument, {
    variables: { skip, take },
  })

  return (
    <ShowData
      error={error?.message}
      title={t('message.garages')}
      loading={loading}
      pagination={{
        resultCount: data?.garages.length || 0,
        totalCount: data?.garagesCount.count || 0,
        setSkip,
        setTake,
        skip,
        take,
      }}
    >
      {data?.garages.map((garage) => (
        <GarageAdminCard key={garage.id} garage={garage}>
          <div className="flex justify-end">
            {!garage?.verification?.verified ? (
              <CreateVerificationButton garageId={garage.id} />
            ) : (
              <RemoveVerificationButton garageId={garage.id} />
            )}
          </div>
        </GarageAdminCard>
      ))}
    </ShowData>
  )
}
