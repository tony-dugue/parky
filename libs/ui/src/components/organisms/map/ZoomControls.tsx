import { MouseEventHandler, ReactNode } from 'react'
import { TbMinus, TbParking, TbPlus } from 'react-icons/tb'
import { useMap } from 'react-map-gl/maplibre'

const MapControls = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col overflow-hidden gap-0.5 space-y rounded shadow-lg divide-primary-800 backdrop-blur-sm">
    {children}
  </div>
)

const ZoomControlButton = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}) => (
  <button
    className=" hover:bg-white bg-white/40"
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
)

const ZoomIn = () => {
  const { current: map } = useMap()

  return (
    <ZoomControlButton onClick={() => map?.zoomIn()}>
      <TbPlus className="w-8 h-8 p-1.5 text-black" />
    </ZoomControlButton>
  )
}

const ZoomOut = () => {
  const { current: map } = useMap()
  return (
    <ZoomControlButton onClick={() => map?.zoomOut()}>
      <TbMinus className="w-8 h-8 p-1.5 text-black" />
    </ZoomControlButton>
  )
}

export const CenterOfMap = ({
  onClick,
  Icon = TbParking,
}: {
  onClick: (latLng: { lng: number; lat: number }) => void
  Icon?: typeof TbParking
}) => {
  const { current: map } = useMap()
  return (
    <ZoomControlButton
      onClick={() => {
        const { lat, lng } = map?.getCenter() as { lng: number; lat: number }
        onClick({ lat, lng })
      }}
    >
      <Icon className="w-8 h-8 p-1.5 text-black" />
    </ZoomControlButton>
  )
}

MapControls.ZoomIn = ZoomIn
MapControls.ZoomOut = ZoomOut
MapControls.CenterOfMap = CenterOfMap

export default MapControls

export const DefaultZoomControls = ({ children }: { children?: ReactNode }) => (
  <MapControls>
    <ZoomIn />
    <ZoomOut />
    {children}
  </MapControls>
)
