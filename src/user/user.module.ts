import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { Usercontroller } from "./user.controller";
import { OTPModule } from "src/OTP/otp.module";
import { ConfigModule } from '@nestjs/config';
import { MailModule } from "src/mail/mail.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    OTPModule,
    ConfigModule.forRoot(),
    MailModule],
  providers: [UserService],
  controllers: [Usercontroller],
})

export class UserModule { }
