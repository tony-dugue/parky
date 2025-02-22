import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerOrderByWithRelationInput } from './order-by.args'
import { CustomerWhereInput, CustomerWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/library'

registerEnumType(Prisma.CustomerScalarFieldEnum, {
  name: 'CustomerScalarFieldEnum',
})

@ArgsType()
class FindManyCustomerArgsStrict
  implements
    RestrictProperties<
      FindManyCustomerArgsStrict,
      Omit<Prisma.CustomerFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => [String], { nullable: true })
  omit: Prisma.CustomerOmit<DefaultArgs>
  where: CustomerWhereInput
  orderBy: CustomerOrderByWithRelationInput[]
  cursor: CustomerWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.CustomerScalarFieldEnum])
  distinct: Prisma.CustomerScalarFieldEnum[]
}

@ArgsType()
export class FindManyCustomerArgs extends PartialType(
  FindManyCustomerArgsStrict,
) {}

@ArgsType()
export class FindUniqueCustomerArgs {
  where: CustomerWhereUniqueInput
}
