import { Field } from '@nestjs/graphql'
import { Address } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class AddressEntity
  implements RestrictProperties<AddressEntity, Address>
{
  id: number
  createdAt: Date
  updatedAt: Date
  address: string
  lat: number
  lng: number
  @Field({ nullable: true })
  garageId: number
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
