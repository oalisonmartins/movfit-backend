import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { Prisma } from 'generated/prisma/client'
import { ErrorResponse, PayloadErrorResponse } from 'src/common/types/error-response.types'

const PRISMA_ERROR_MAP: Record<string, { status: number; message: string; code: string }> = {
	P2002: { status: 409, message: 'Registro já existe', code: 'CONFLICT' },
	P2025: { status: 404, message: 'Registro não encontrado', code: 'NOT_FOUND' },
	P2003: { status: 400, message: 'Referência de relação inválida', code: 'INVALID_RELATION' },
}

const HTTP_ERROR_LABEL: Record<number, string> = {
	400: 'Requisição inválida',
	401: 'Não autorizado',
	403: 'Acesso negado',
	404: 'Não encontrado',
	409: 'Conflito',
	422: 'Entidade não processável',
	500: 'Erro interno do servidor',
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const http = host.switchToHttp()
		const response = http.getResponse<FastifyReply>()
		const { status, message, code } = this.resolve(exception)

		return response.status(status).send({
			error: HTTP_ERROR_LABEL[status] ?? 'Error',
			status,
			message,
			code,
		})
	}

	private resolve(exception: unknown): Omit<ErrorResponse, 'error'> {
		if (exception instanceof HttpException) {
			const raw = exception.getResponse()
			const payload: PayloadErrorResponse =
				typeof raw === 'string' ? { message: raw, code: 'HTTP_ERROR' } : (raw as PayloadErrorResponse)

			return {
				status: exception.getStatus(),
				message: payload.message ?? 'Erro inesperado',
				code: payload.code ?? 'HTTP_ERROR',
			}
		}

		if (exception instanceof Prisma.PrismaClientKnownRequestError) {
			return (
				PRISMA_ERROR_MAP[exception.code] ?? {
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					message: 'Erro no banco de dados',
					code: `PRISMA_${exception.code}`,
				}
			)
		}

		return {
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			message: exception instanceof Error ? exception.message : 'Erro interno do servidor',
			code: 'INTERNAL_ERROR',
		}
	}
}
