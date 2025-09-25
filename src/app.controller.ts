import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { sendEmail } from './common/emailSender';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<string> {
    await sendEmail("teste", "teste")
    return this.appService.getHello();
  }
}
