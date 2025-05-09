import {
  TbBike,
  TbMotorbike,
  TbCar,
  TbTir,
  TbMoonStars,
  TbSunset,
  TbSun,
  TbSunrise,
} from 'react-icons/tb'

import { SlotType } from '@parky/network/src/gql/generated'

export const IconTypes = {
  [SlotType.Bicycle]: <TbBike className="w-6 h-6 " />,
  [SlotType.Bike]: <TbMotorbike className="w-6 h-6 " />,
  [SlotType.Car]: <TbCar className="w-6 h-6 " />,
  [SlotType.Heavy]: <TbTir className="w-6 h-6 " />,
}

export const IconType = ({
  time,
  className,
}: {
  time: string
  className?: string
}) => {
  const date = new Date(time)
  const hour = date.getHours() // get the hour in UTC

  if (hour >= 4 && hour < 10) return <TbSunrise className="w-5 h-5" />
  if (hour >= 10 && hour < 16) return <TbSun className="w-5 h-5" />
  if (hour >= 16 && hour < 20) return <TbSunset className="w-5 h-5" />
  return <TbMoonStars className={`w-5 h-5 ${className}`} />
}
