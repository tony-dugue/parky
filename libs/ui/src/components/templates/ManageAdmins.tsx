'use client'
import { useQuery } from '@apollo/client'

import { AdminsDocument } from '@parky/network/src/gql/generated'
import { useTakeSkip } from '@parky/util/hooks/pagination'
import { ShowData } from '../organisms/ShowData'
import { AdminCard } from '../organisms/AdminCard'
import { CreateAdminModal } from '../organisms/modals/CreateAdminModal'
import { RemoveAdminButtonModal } from '../organisms/modals/RemoveAdminButtonModal'

export const ManageAdmins = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip(0)

  const { data, loading } = useQuery(AdminsDocument, {
    variables: { skip, take },
  })

  return (
    <>
      <div className="flex justify-end">
        <CreateAdminModal />
      </div>
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.admins.length,
          totalCount: data?.adminsCount,
          setSkip,
          setTake,
        }}
        title={'Manage admins'}
      >
        {data?.admins.map((admin) => (
          <div key={admin.uid} className="pl-0.5 border-l-2  border-primary">
            <AdminCard key={admin.uid} admin={admin}>
              <div className="flex justify-end">
                <RemoveAdminButtonModal uid={admin.uid} />
              </div>
            </AdminCard>
          </div>
        ))}
      </ShowData>
    </>
  )
}
