import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class Usercontroller {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(
    @Body() body: { username: string; email: string; password: string }
  ) {
    const { username, email, password } = body
    return this.userService.create(username, email, password);
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
