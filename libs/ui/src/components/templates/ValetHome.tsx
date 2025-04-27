import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tab, TabPanel, Tabs } from '../molecules/Tabs'
import { ShowValetAllPickupTrips } from '../organisms/ShowValetAllPickupTrips'
import { ShowValetAllDropTrips } from '../organisms/ShowValetAllDropTrips'

export const ValetHome = () => {
  const { t } = useTranslation()

  const [value, setValue] = useState<0 | 1>(0)

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label={t('message.bookings')}
      >
        <Tab label={t('button.pickup')} />
        <Tab label={t('button.drop')} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowValetAllPickupTrips />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowValetAllDropTrips />
      </TabPanel>
    </>
  )
}
