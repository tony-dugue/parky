import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as path from 'path'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { existsSync, mkdirSync } from 'fs'
import * as express from 'express'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const uploadDir = path.join(process.cwd(), 'uploads')

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
  }

  app.enableCors()

  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

  const config = new DocumentBuilder()
    .setTitle('Parky | Tony Dugue')
    .setDescription(
      `The Parky API.
<h2>Looking for the graphql api?</h2>
Go to <a href="/graphql" target="_blank">/graphql</a>.
Or,
You might also need to use the <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql&document=query users{users{ uid }}
">Apollo explorer</a> for a greater experience.
    `,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  await app.listen(port, '0.0.0.0')
}
bootstrap()
