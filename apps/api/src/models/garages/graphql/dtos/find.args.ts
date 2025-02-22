import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GarageOrderByWithRelationInput } from './order-by.args'
import { GarageWhereInput, GarageWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/library'

registerEnumType(Prisma.GarageScalarFieldEnum, {
  name: 'GarageScalarFieldEnum',
})

@ArgsType()
class FindManyGarageArgsStrict
  implements
    RestrictProperties<
      FindManyGarageArgsStrict,
      Omit<Prisma.GarageFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => [String], { nullable: true })
  omit: Prisma.GarageOmit<DefaultArgs>
  where: GarageWhereInput
  orderBy: GarageOrderByWithRelationInput[]
  cursor: GarageWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.GarageScalarFieldEnum])
  distinct: Prisma.GarageScalarFieldEnum[]
}

@ArgsType()
export class FindManyGarageArgs extends PartialType(FindManyGarageArgsStrict) {}

@ArgsType()
export class FindUniqueGarageArgs {
  where: GarageWhereUniqueInput
}
