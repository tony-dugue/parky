import { Fragment, useEffect, useState } from 'react'
import { MathUtils } from 'three'

import { BUILDING_SETS } from '../util/buildingSets'
import { radians, randExp } from '../util'
import { Building } from './Building'
import { FLOOR_HEIGHT } from '../util/constants'

export const BuildingSet = ({
  minHeight = 2,
  maxHeight = 20,
}: {
  minHeight?: number
  maxHeight?: number
}) => {
  const [buildingSet, setBuildingSet] = useState<(typeof BUILDING_SETS)[0]>([])
  const [floors, setFloors] = useState<number[]>([])

  useEffect(() => {
    const randomSet =
      BUILDING_SETS[MathUtils.randInt(0, BUILDING_SETS.length - 1)]
    setBuildingSet(randomSet)

    setFloors(
      randomSet.map(() => {
        const randHeight = randExp(minHeight, maxHeight, 7)
        return Math.floor(randHeight)
      }),
    )
  }, [minHeight, maxHeight])

  return (
    <group>
      {buildingSet.map(({ length, position, width }, i) => (
        <Fragment key={`${position.join('-')}`}>
          <Building
            position={
              position.map((pos) => pos * 2) as [number, number, number]
            }
            size={[width * 2, length * 2]}
            floors={floors[i]}
          />
          {/* Add a translucent black plane that is the same size as the parking lot */}

          <mesh
            position={[
              position[0] * 2,
              FLOOR_HEIGHT * (floors[i] - 1), // Adjust the y-position to the top of the building
              position[2] * 2,
            ]}
            rotation={[radians(-90), 0, 0]} // Rotate the plane to align with the ground
          >
            <planeGeometry args={[width * 2, length * 2]} />
            <meshBasicMaterial color={'black'} transparent opacity={0.6} />
          </mesh>
        </Fragment>
      ))}
    </group>
  )
}
