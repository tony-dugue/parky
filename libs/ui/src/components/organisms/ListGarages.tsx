import {
  GaragesDocument,
  MyCompanyQuery,
} from '@parky/network/src/gql/generated'
import { useTakeSkip } from '@parky/util/hooks/pagination'
import { useQuery } from '@apollo/client'
import { ShowData } from './ShowData'
import Link from 'next/link'
import { IconPlus } from '@tabler/icons-react'
import { GarageCard } from './GarageCard'
import { useTranslation } from 'react-i18next'

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
      childrenClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
      title={
        <div className="flex items-center gap-4">
          <div>{t('message.garages')}</div>
          <Link
            href="/new-garage"
            className="rounded-full border border-black p-0.5"
          >
            <IconPlus />
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
