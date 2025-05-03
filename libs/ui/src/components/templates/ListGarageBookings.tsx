'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BookingStatus } from '@parky/network/src/gql/generated'
import { Tab, TabPanel, Tabs } from '../molecules/Tabs'
import { ShowGarageBookings } from '../organisms/ShowGarageBookings'

export interface IListBookingsProps {
  garageId: number
}

export const ListGarageBookings = ({ garageId }: IListBookingsProps) => {
  const { t } = useTranslation()

  const [value, setValue] = useState<0 | 1 | 2>(0)

  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label={t('message.bookings')}
      >
        <Tab label={t('status.in')} />
        <Tab label={t('status.out')} />
        <Tab label={t('status.resolved')} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[
            BookingStatus.Booked,
            BookingStatus.ValetPickedUp,
            BookingStatus.ValetAssignedForCheckIn,
          ]}
          showCheckIn
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[
            BookingStatus.CheckedIn,
            BookingStatus.ValetAssignedForCheckOut,
          ]}
          showCheckOut
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[BookingStatus.CheckedOut]}
        />
      </TabPanel>
    </div>
  )
}
