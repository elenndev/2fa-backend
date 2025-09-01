import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class Usercontroller {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(
    @Body() body: { username: string; email: string; contactNumber: string }
  ) {
    const { username, email, contactNumber } = body
    return this.userService.create(username, email, contactNumber);
  }

  @Get()
  async returnAll() {
    return this.userService.findAll();
  }
}
