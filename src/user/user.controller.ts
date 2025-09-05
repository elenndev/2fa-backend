import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class Usercontroller {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(
    @Body() body: { username: string; email: string; contactNumber: string, password: string }
  ) {
    const { username, email, contactNumber, password } = body
    return this.userService.create(username, email, contactNumber, password);
  }

  @Get()
  async returnAll() {
    return this.userService.findAll();
  }

  @Put('/update-contactNumber/:id')
  async updateContactNumber(
    @Param('id') id: number,
    @Body('contactNumber') contactNumber: string) {
    return this.userService.changeContactNumber(id, contactNumber);
  }

  @Put('/update-email/:id')
  async updateEmail(
    @Param('id') id: number,
    @Body('email') email: string,
  ) {
    return this.userService.changeEmail(id, email);
  }

  @Post('/login')
  async login(
    @Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.userService.login(username, password);
  }

  // receive pin and validate on otpservice
  @Post('/validate-auth')
  async validateAuth(
    @Body('username') username: string,
    @Body('pin') pin: string,
  ) {
    return this.userService.validateOtp(username, pin);
  }

}
