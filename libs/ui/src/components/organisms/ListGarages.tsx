import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useQuery } from '@apollo/client'

import {
  GaragesDocument,
  MyCompanyQuery,
} from '@parky/network/src/gql/generated'
import { useTakeSkip } from '@parky/util/hooks/pagination'
import { ShowData } from './ShowData'
import { GarageCard } from './GarageCard'
import { Button } from '../atoms/Button'

export const ListGarages = ({
  companyId,
}: {
  companyId: MyCompanyQuery['myCompany']['id']
}) => {
  const { t } = useTranslation()

  const { setSkip, setTake, skip, take } = useTakeSkip()

  const { data, loading, error } = useQuery(GaragesDocument, {
    variables: { skip, take, where: { companyId: { equals: companyId } } },
  })

  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.garages.length,
        totalCount: data?.garagesCount.count,
        setSkip,
        setTake,
      }}
      childrenClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8"
      title={
        <div className="flex items-center justify-between mb-10">
          <div>{t('message.garages')}</div>
          <Link href="/new-garage">
            <Button>{t('button.add-garage')}</Button>
          </Link>
        </div>
      }
    >
      {data?.garages.map((garage) => (
        <GarageCard key={garage.id} garage={garage} />
      ))}
    </ShowData>
  )
}
