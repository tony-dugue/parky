import { IconBox } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const NoResults = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-60 bg-gray-25">
      <IconBox className="w-10 h-10" />
      <div className="text-sm">{t('message.no-result')}</div>
    </div>
  )
}
