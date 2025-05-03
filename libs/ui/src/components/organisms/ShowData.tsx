import { Pagination } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { AlertSection } from '../molecules/AlertSection'
import { LoaderPanel } from '../molecules/Loader'
import { NoResults } from '../molecules/NoResults'

interface ShowDataProps {
  error?: string
  loading?: boolean
  pagination: {
    setSkip: (skip: number) => void
    setTake: (take: number) => void
    skip: number
    take: number
    resultCount?: number
    totalCount?: number
  }
  title?: React.ReactNode
  children: React.ReactNode
  childrenClassName?: string
}

export const ShowData = ({
  error,
  loading,
  pagination,
  title,
  children,
  childrenClassName = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3',
}: ShowDataProps) => {
  const { t } = useTranslation()

  const { setSkip, skip, take, resultCount, totalCount } = pagination

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setSkip((page - 1) * take)
  }

  const totalPages = Math.ceil((totalCount || 0) / take)

  return (
    <div>
      <h1 className="text-lg mb-1 font-semibold mt-10">{title}</h1>
      {loading && <LoaderPanel />}
      {!loading && !error && resultCount === 0 && <NoResults />}

      {error && (
        <AlertSection>
          {t('message.something-wrong')}{' '}
          <span className="text-xs">Psst. {error}</span>
        </AlertSection>
      )}

      <div className={childrenClassName}>{children}</div>

      <div className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
          showFirstButton
          showLastButton
          page={skip / take + 1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}
