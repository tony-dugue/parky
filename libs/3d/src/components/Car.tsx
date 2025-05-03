import { useEffect, useState } from 'react'
import { Color } from '@react-three/fiber'
import { Euler, MathUtils, Vector3 } from 'three'
import { Box, Html } from '@react-three/drei'
import { useTranslation } from 'react-i18next'

import { radians } from '../util'
import { BlinkingParkingSlot } from './BlinkingParkingSlot'
import { GradientPlane } from './GradientPlane'

interface CarProps {
  color?: Color
  position?: Vector3
  size?: [number, number, number]
  searching?: boolean
  comment?: boolean
  trail?: boolean
  forward?: boolean
}

export const Car: React.FC<CarProps> = ({
  color = '#fff',
  position = new Vector3(0, 0, 0),
  forward = true,
  trail = true,
  searching = false,
  comment = false,
  size,
}) => {
  const { t } = useTranslation()

  const [vehicleSize, setVehicleSize] = useState<[number, number, number]>([
    0, 0, 0,
  ])

  useEffect(() => {
    const newSize = size || [
      MathUtils.randFloat(1.9, 2.3),
      0.1,
      MathUtils.randFloat(4, 5.6),
    ]
    setVehicleSize(newSize)
  }, [size])

  const [randomComment, setRandomComment] = useState<string>('')

  // Fonction pour récupérer un commentaire au hasard depuis la traduction
  const pickRandomComment = () => {
    const comments = t('3d-scene.comments.frustrated', {
      returnObjects: true,
    }) as string[] // cast en tableau de string
    if (!Array.isArray(comments) || comments.length === 0) {
      return ''
    }
    const randomIndex = Math.floor(Math.random() * comments.length)
    return comments[randomIndex]
  }

  useEffect(() => {
    setRandomComment(pickRandomComment())
    const interval = setInterval(() => {
      setRandomComment(pickRandomComment())
    }, 16000)
    return () => {
      clearInterval(interval)
    }
  }, [t]) // dépend de t au cas où la langue change

  return (
    <>
      <Box
        position={position}
        rotation={[radians(0), radians(90), 0]}
        args={vehicleSize}
      >
        <meshBasicMaterial color={color} />
      </Box>

      {searching && <BlinkingParkingSlot position={[0, 2, 0]} />}

      {comment && (
        <Html
          position={[0, 10, 0]}
          center
          style={{ maxWidth: '30rem', width: '100%' }}
          transform={false}
        >
          <div
            style={{
              color: '#aaa',
              fontSize: '.75rem',
              outline: 1,
              outlineColor: 'black',
              maxWidth: '30rem',
              width: '100%',
              whiteSpace: 'pre',
              userSelect: 'none',
            }}
          >
            {randomComment}
          </div>
        </Html>
      )}

      {trail &&
        (forward ? (
          <GradientPlane
            position={new Vector3(vehicleSize[2] / 1.3, -0.02, position.z)}
            size={[3, 2]}
          />
        ) : (
          <GradientPlane
            rotation={new Euler(radians(-90), radians(0), radians(180))}
            position={new Vector3(-(vehicleSize[2] / 1.3), -0.02, position.z)}
            size={[3, vehicleSize[0]]}
          />
        ))}
    </>
  )
}
