import { TbBox } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'

export const NoResults = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-60 bg-gray-25">
      <TbBox className="w-8 h-8" />
      <div className="text-sm">{t('message.no-result')}</div>
    </div>
  )
}
