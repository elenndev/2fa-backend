import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
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
}
