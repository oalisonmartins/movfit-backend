import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { FilterErrorPayload } from 'src/common/types/filter-error-payload.types'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp()
    const reply = http.getResponse<FastifyReply>()
    const statusCode = exception.getStatus()

    const path = http.getRequest<FastifyRequest>().originalUrl
    const timestamp = new Date().toISOString()

    const { message, code } = this.extractExceptionResponse(exception)

    const errorLabels: Record<number, string> = {
      401: 'Unauthorized Error',
      403: 'Forbidden Error',
    }

    return reply.status(statusCode).send({
      status: statusCode,
      error: errorLabels[statusCode] ?? 'Unknown error',
      message,
      code,
      path,
      timestamp,
    })
  }

  private extractExceptionResponse(exception: HttpException) {
    const rawResponse = exception.getResponse()

    if (typeof rawResponse === 'string') {
      return {
        message: rawResponse,
        code: 'UNKNOWN_ERROR',
      }
    }

    const payload = rawResponse as Partial<FilterErrorPayload>

    return {
      message: payload.response?.message ?? 'Unknown error',
      code: payload.response?.code ?? 'UNKNOWN_ERROR',
    }
  }
}
