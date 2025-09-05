import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OTP } from "./otp.entity";
import { Repository } from "typeorm";
import { generateRandomPin } from "src/common/generateRandomPin";

@Injectable()
export class OTPService {
  constructor(
    @InjectRepository(OTP)
    private otpRepo: Repository<OTP>
  ) { }

  async create(username: string) {
    const expiration = new Date().getTime() + (20 * 60 * 1000);

    const newOtp = this.otpRepo.create({
      pin: generateRandomPin(),
      expiration: expiration,
      username
    })

    await this.otpRepo.save(newOtp);
    return newOtp.pin;
  }

  async search(username: string) {
    return await this.otpRepo.findOneBy({ username });
  }

  async delete(username: string) {
    await this.otpRepo.delete({ username });
  }

  async getUserPin(username: string) {
    const userOtp = await this.search(username)
    if (!userOtp) {
      throw new HttpException("There's no verification code for this user", HttpStatus.NO_CONTENT);
    }

    return userOtp.pin;
  }

  async validate(username: string, pin: string) {
    const userOtp = await this.otpRepo.findOneBy({ username });
    if (!userOtp) {
      throw new HttpException("There's no verification code for this user", HttpStatus.NO_CONTENT)
    }

    const currentTimestamp = new Date().getTime();
    if (currentTimestamp > userOtp.expiration) {
      throw new HttpException("Validation code expiraded", HttpStatus.UNAUTHORIZED);
    }

    if (pin != userOtp.pin) {
      throw new HttpException("Wrong code", HttpStatus.UNAUTHORIZED);
    }
  }

}
