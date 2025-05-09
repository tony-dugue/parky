import { TbRotateClockwise2 } from 'react-icons/tb'

import { AlertSection } from './AlertSection'

export const Loader = () => (
  <TbRotateClockwise2 className="text-3xl animate-spin" />
)
export const LoaderPanel = ({ text }: { text?: string }) => (
  <AlertSection title={text}>
    <Loader />
  </AlertSection>
)
