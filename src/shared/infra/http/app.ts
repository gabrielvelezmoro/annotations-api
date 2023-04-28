import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import '@shared/container'
import upload from '@config/upload'
import { AppError } from '@shared/errors/app-error'
import createConnection from '@shared/infra/typeorm'
import swaggerFile from '../../../swagger.json'
import { router } from './routes'

createConnection()
const app = express()



Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})

// @ts-ignore
app.use(Sentry.Handlers.requestHandler())

// @ts-ignore
app.use(Sentry.Handlers.tracingHandler())

// @ts-ignore
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))

const options: cors.CorsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

app.use(cors(options))

app.use(router)

// @ts-ignore
app.use(Sentry.Handlers.errorHandler())

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  }
)

export { app }
