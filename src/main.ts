import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    // credentials: true,
  })

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Movfit API')
    .setDescription('Movfit API documentation')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.use(
    '/docs',
    apiReference({
      _integration: 'fastify',
      theme: 'kepler',
      darkMode: true,
      authentication: {
        preferredSecurityScheme: 'BearerAuth',
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      content: document,
      withFastify: true,
    }),
  )

  await app.register(require('@fastify/helmet'))
  await app.listen(process.env.PORT ?? 4949)
}
bootstrap()
