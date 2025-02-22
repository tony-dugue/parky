import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ValetOrderByWithRelationInput } from './order-by.args'
import { ValetWhereInput, ValetWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/library'

registerEnumType(Prisma.ValetScalarFieldEnum, {
  name: 'ValetScalarFieldEnum',
})

@ArgsType()
class FindManyValetArgsStrict
  implements
    RestrictProperties<
      FindManyValetArgsStrict,
      Omit<Prisma.ValetFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => [String], { nullable: true })
  omit: Prisma.ValetOmit<DefaultArgs>
  where: ValetWhereInput
  orderBy: ValetOrderByWithRelationInput[]
  cursor: ValetWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.ValetScalarFieldEnum])
  distinct: Prisma.ValetScalarFieldEnum[]
}

@ArgsType()
export class FindManyValetArgs extends PartialType(FindManyValetArgsStrict) {}

@ArgsType()
export class FindUniqueValetArgs {
  where: ValetWhereUniqueInput
}
