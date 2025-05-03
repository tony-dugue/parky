'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BookingStatus } from '@parky/network/src/gql/generated'
import { Tab, Tabs, TabPanel } from '../molecules/Tabs'
import { ShowCustomerBookings } from '../organisms/ShowCustomerBookings'

export const ListCustomerBookings = () => {
  const { t } = useTranslation()

  const [value, setValue] = useState<0 | 1>(1)

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label={t('message.bookings')}
      >
        <Tab label={t('status.past')} />
        <Tab label={t('status.on-going')} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowCustomerBookings
          statuses={[BookingStatus.CheckedOut, BookingStatus.ValetReturned]}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowCustomerBookings
          statuses={[
            BookingStatus.Booked,
            BookingStatus.ValetPickedUp,
            BookingStatus.ValetAssignedForCheckIn,
            BookingStatus.CheckedIn,
            BookingStatus.ValetAssignedForCheckOut,
          ]}
        />
      </TabPanel>
    </>
  )
}
