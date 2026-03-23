import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller({
  path: '/',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck() {
    return this.appService.getHealthCheck()
  }
}
