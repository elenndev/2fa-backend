import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { Usercontroller } from "./user.controller";
import { OTPModule } from "src/OTP/otp.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), OTPModule],
  providers: [UserService],
  controllers: [Usercontroller],
})

export class UserModule { }
