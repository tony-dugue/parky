import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class FileUpload {
  @Field()
  filename: string
}
// possibilité d'enrichir cette entité avec des infos comme mimeType, size, etc. si besoin
