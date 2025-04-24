import { PrismaClient, Prisma, Slot } from '@prisma/client'
import { generatedCompanyId, randomRange } from './seedConfig'

const prisma = new PrismaClient()

const slotRanges = {
  CAR: {
    length: { min: 12, max: 18 },
    width: { min: 8, max: 10 },
    height: { min: 15, max: 20 },
    pricePerHour: { min: 15, max: 25 },
    count: { min: 2, max: 6 },
  },
  HEAVY: {
    length: { min: 22, max: 30 },
    width: { min: 10, max: 18 },
    height: { min: 20, max: 30 },
    pricePerHour: { min: 30, max: 50 },
    count: { min: 2, max: 6 },
  },
  BIKE: {
    length: { min: 6, max: 8 },
    width: { min: 2, max: 3 },
    height: { min: 15, max: 20 },
    pricePerHour: { min: 5, max: 10 },
    count: { min: 2, max: 6 },
  },
  BICYCLE: {
    length: { min: 4, max: 6 },
    width: { min: 1, max: 2 },
    height: { min: 15, max: 20 },
    pricePerHour: { min: 2, max: 5 },
    count: { min: 2, max: 6 },
  },
}

export const generateSlots = ({ type }: Pick<Slot, 'type'>) => {
  const slots = []
  const ranges = slotRanges[type]

  const count = randomRange(ranges.count.min, ranges.count.max)
  const length = randomRange(ranges.length.min, ranges.length.max)
  const width = randomRange(ranges.width.min, ranges.width.max)
  const height = randomRange(ranges.height.min, ranges.height.max)
  const pricePerHour = Math.floor(
    randomRange(ranges.pricePerHour.min, ranges.pricePerHour.max),
  )
  for (let i = 0; i < count; i++) {
    slots.push({
      displayName: `${type} ${i + 1}`,
      pricePerHour,
      length,
      width,
      height,
      type,
    })
  }
  return slots
}

export async function seedGarages() {
  const garages: Prisma.GarageCreateInput[] = [
    {
      displayName: 'Brooklyn Garage 1',
      description: 'Affordable parking in Brooklyn',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_1.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),
        ],
      },
      Address: {
        create: {
          address: '456 Court St, Brooklyn, NY 11231',
          lat: 40.678178,
          lng: -73.944158,
        },
      },
    },
    {
      displayName: 'Queens Garage 1',
      description: 'Convenient parking in Queens',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_2.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '789 Queens Blvd, Queens, NY 11373',
          lat: 40.728224,
          lng: -73.794852,
        },
      },
    },
    {
      displayName: 'Manhattan Garage 2',
      description: 'Secure parking near Central Park',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_3.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),

          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '101 Central Park West, New York, NY 10023',
          lat: 40.7812,
          lng: -73.9665,
        },
      },
    },
    {
      displayName: 'Brooklyn Garage 2',
      description: 'Spacious parking in Brooklyn Heights',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_4.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BIKE',
          }),
        ],
      },
      Address: {
        create: {
          address: '202 Atlantic Ave, Brooklyn, NY 11201',
          lat: 40.6912,
          lng: -73.9936,
        },
      },
    },
    {
      displayName: 'Queens Garage 2',
      description: 'Safe parking in Flushing',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_5.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),
          ...generateSlots({
            type: 'BIKE',
          }),
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '303 Main St, Flushing, NY 11354',
          lat: 40.759,
          lng: -73.8303,
        },
      },
    },
    {
      displayName: 'Manhattan Garage 3',
      description: 'Parking near Times Square',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_6.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BIKE',
          }),
        ],
      },
      Address: {
        create: {
          address: '1515 Broadway, New York, NY 10036',
          lat: 40.758,
          lng: -73.9855,
        },
      },
    },
    {
      displayName: 'Brooklyn Garage 3',
      description: 'Secure parking in Williamsburg',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_7.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '404 Bedford Ave, Brooklyn, NY 11249',
          lat: 40.7081,
          lng: -73.9571,
        },
      },
    },
    {
      displayName: 'Queens Garage 3',
      description: 'Affordable parking in Astoria',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_8.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '505 Steinway St, Astoria, NY 11103',
          lat: 40.7592,
          lng: -73.9196,
        },
      },
    },
    {
      displayName: 'Manhattan Garage 4',
      description: 'Parking near Wall Street',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_9.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),

          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '75 Wall St, New York, NY 10005',
          lat: 40.7074,
          lng: -74.0104,
        },
      },
    },
    {
      displayName: 'Brooklyn Garage 4',
      description: 'Parking near Prospect Park',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_10.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),
          ...generateSlots({
            type: 'BIKE',
          }),
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '606 Flatbush Ave, Brooklyn, NY 11225',
          lat: 40.6591,
          lng: -73.9626,
        },
      },
    },
    {
      displayName: 'Queens Garage 4',
      description: 'Parking near LaGuardia Airport',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_11.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BIKE',
          }),
        ],
      },
      Address: {
        create: {
          address: '707 Ditmars Blvd, Queens, NY 11370',
          lat: 40.7743,
          lng: -73.8896,
        },
      },
    },
    {
      displayName: 'Manhattan Garage 5',
      description: 'Secure parking in the East Village',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_12.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '808 E 14th St, New York, NY 10009',
          lat: 40.7295,
          lng: -73.9786,
        },
      },
    },
    {
      displayName: 'Brooklyn Garage 5',
      description: 'Parking in Greenpoint',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_13.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),
          ...generateSlots({
            type: 'BIKE',
          }),
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '909 Manhattan Ave, Brooklyn, NY 11222',
          lat: 40.7291,
          lng: -73.9542,
        },
      },
    },
    {
      displayName: 'Queens Garage 5',
      description: 'Convenient parking in Forest Hills',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_14.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),

          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '1001 Austin St, Forest Hills, NY 11375',
          lat: 40.7207,
          lng: -73.8448,
        },
      },
    },
    {
      displayName: 'Manhattan Garage 6',
      description: 'Parking in Soho',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_15.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'HEAVY',
          }),
        ],
      },
      Address: {
        create: {
          address: '1101 Broadway, New York, NY 10012',
          lat: 40.7223,
          lng: -73.9987,
        },
      },
    },
    {
      displayName: 'Brooklyn Garage 6',
      description: 'Parking in DUMBO',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_16.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'CAR',
          }),
          ...generateSlots({
            type: 'HEAVY',
          }),
        ],
      },
      Address: {
        create: {
          address: '1202 Water St, Brooklyn, NY 11201',
          lat: 40.7033,
          lng: -73.9903,
        },
      },
    },
    {
      displayName: 'Queens Garage 6',
      description: 'Parking in Jamaica',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_17.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),
          ...generateSlots({
            type: 'BIKE',
          }),
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '1303 Jamaica Ave, Jamaica, NY 11432',
          lat: 40.7028,
          lng: -73.7925,
        },
      },
    },
    {
      displayName: 'Manhattan Garage 7',
      description: 'Parking near the UN Headquarters',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_18.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BIKE',
          }),
          ...generateSlots({
            type: 'CAR',
          }),
        ],
      },
      Address: {
        create: {
          address: '1401 1st Ave, New York, NY 10016',
          lat: 40.7489,
          lng: -73.968,
        },
      },
    },
    {
      displayName: 'Brooklyn Garage 7',
      description: 'Parking in Park Slope',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_19.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BIKE',
          }),
        ],
      },
      Address: {
        create: {
          address: '1504 7th Ave, Brooklyn, NY 11215',
          lat: 40.6681,
          lng: -73.9822,
        },
      },
    },
    {
      displayName: 'Queens Garage 7',
      description: 'Parking in Long Island City',
      Company: { connect: { id: generatedCompanyId() } },
      images: {
        set: ['demo_garage_20.jpg'],
      },
      Slots: {
        create: [
          ...generateSlots({
            type: 'BICYCLE',
          }),

          ...generateSlots({
            type: 'CAR',
          }),
          ...generateSlots({
            type: 'HEAVY',
          }),
        ],
      },
      Address: {
        create: {
          address: '1605 Jackson Ave, Long Island City, NY 11101',
          lat: 40.7472,
          lng: -73.9438,
        },
      },
    },
  ]

  for (const garage of garages) {
    await prisma.garage.create({
      data: garage,
    })
  }

  console.log('✅ Seeding completed for Garages & Slots')
}
