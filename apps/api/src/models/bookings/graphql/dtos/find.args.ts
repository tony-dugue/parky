import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { BookingOrderByWithRelationInput } from './order-by.args'
import { BookingWhereInput, BookingWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/library'

registerEnumType(Prisma.BookingScalarFieldEnum, {
  name: 'BookingScalarFieldEnum',
})

@ArgsType()
class FindManyBookingArgsStrict
  implements
    RestrictProperties<
      FindManyBookingArgsStrict,
      Omit<Prisma.BookingFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => [String], { nullable: true })
  omit: Prisma.BookingOmit<DefaultArgs>
  where: BookingWhereInput
  orderBy: BookingOrderByWithRelationInput[]
  cursor: BookingWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.BookingScalarFieldEnum])
  distinct: Prisma.BookingScalarFieldEnum[]
}

@ArgsType()
export class FindManyBookingArgs extends PartialType(
  FindManyBookingArgsStrict,
) {}

@ArgsType()
export class FindUniqueBookingArgs {
  where: BookingWhereUniqueInput
}
