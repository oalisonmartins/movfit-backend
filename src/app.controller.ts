import { Controller, Get } from '@nestjs/common'
import { SkipThrottle } from '@nestjs/throttler/dist'
import { AppService } from './app.service'

@Controller({ path: '/', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipThrottle()
  @Get()
  healthCheck() {
    return this.appService.getHealthCheck()
  }
}
