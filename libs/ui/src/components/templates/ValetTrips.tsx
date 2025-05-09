import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Tab, TabPanel, Tabs } from '../molecules/Tabs'
import { ShowValetMyPickupTrips } from '../organisms/ShowValetMyPickupTrips'
import { ShowValetMyDropTrips } from '../organisms/ShowValetMyDropTrips'

export const ValetTrips = ({ uid }: { uid: string }) => {
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
        <ShowValetMyPickupTrips uid={uid} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowValetMyDropTrips uid={uid} />
      </TabPanel>
    </>
  )
}
