import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CompanyOrderByWithRelationInput } from './order-by.args'
import { CompanyWhereInput, CompanyWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/library'

registerEnumType(Prisma.CompanyScalarFieldEnum, {
  name: 'CompanyScalarFieldEnum',
})

@ArgsType()
class FindManyCompanyArgsStrict
  implements
    RestrictProperties<
      FindManyCompanyArgsStrict,
      Omit<Prisma.CompanyFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => [String], { nullable: true })
  omit: Prisma.CompanyOmit<DefaultArgs>
  where: CompanyWhereInput
  orderBy: CompanyOrderByWithRelationInput[]
  cursor: CompanyWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.CompanyScalarFieldEnum])
  distinct: Prisma.CompanyScalarFieldEnum[]
}

@ArgsType()
export class FindManyCompanyArgs extends PartialType(
  FindManyCompanyArgsStrict,
) {}

@ArgsType()
export class FindUniqueCompanyArgs {
  where: CompanyWhereUniqueInput
}
