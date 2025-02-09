import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'app page' })
  @ApiResponse({
    status: 200,
    description: 'app page',
  })
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }
}
