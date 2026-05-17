import { HttpException } from '@nestjs/common'

export class InterceptorException extends HttpException {
  constructor(response: string | object, statusCode: number) {
    super({ response }, statusCode)
  }
}
