import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { InterceptorException } from 'src/common/exceptions/interceptor.exception'
import { FilterErrorPayload } from 'src/common/types/filter-error-payload.types'

@Catch(InterceptorException)
export class InterceptorsFilter implements ExceptionFilter {
  catch(exception: InterceptorException, host: ArgumentsHost) {
    const http = host.switchToHttp()
    const reply = http.getResponse<FastifyReply>()
    const statusCode = exception.getStatus()

    const timestamp = new Date().toISOString()
    const path = reply.request.originalUrl

    const { message, code } = this.extractExceptionResponse(exception)

    const errorsLabel: Record<number, string> = {
      403: 'Forbidden error',
    }

    return reply.status(statusCode).send({
      status: statusCode,
      error: errorsLabel[statusCode] ?? 'Unknown error',
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
