import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class Usercontroller {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('contactNumber') contactNumber: string) {
    return this.userService.create(username, email, contactNumber);
  }

  @Get()
  async returnAll() {
    return this.userService.findAll();
  }
}
