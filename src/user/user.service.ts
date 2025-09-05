import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Email } from "./classes/Email";
import { ContactNumber } from "./classes/ContactNumber";
import { Username } from "./classes/Username";
import { sendEmail } from "src/common/resend";
import { Password } from "./classes/Password";
import { comparePassword } from "src/common/bcrypt";
import { generateRandomPin } from "src/common/generateRandomPin";
import { OTPService } from "src/OTP/otp.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private otpService: OTPService) { }

  async create(username: string, email: string, contactNumber: string, password: string) {
    try {
      const newUserUsername = new Username(username);
      const newUserEmail = new Email(email);
      const newUserContactNumber = new ContactNumber(contactNumber);
      const newUserPassword = await new Password(password).hash();


      const newUser = this.userRepo.create({
        email: newUserEmail.getValue(),
        contactNumber: newUserContactNumber.getValue(),
        username: newUserUsername.getValue(),
        password: newUserPassword
      })

      return this.userRepo.save(newUser);

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

  }

  async findAll() {
    return this.userRepo.find();
  }

  // update user infos
  async changeContactNumber(id: number, contactNumber: string) {
    try {
      const newContactNumber = new ContactNumber(contactNumber);

      const user = await this.userRepo.findOneBy({ id })
      if (!user) {
        throw new Error("User not found");
      }

      user.contactNumber = newContactNumber.getValue();
      await this.userRepo.save(user)

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeEmail(id: number, email: string) {
    try {
      const newEmail = new Email(email);

      const user = await this.userRepo.findOneBy(({ id }));
      if (!user) {
        throw new Error("User not found");
      }

      user.email = newEmail.getValue();
      await this.userRepo.save(user);

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // auth
  async login(username: string, password: string) {
    try {
      const user = await this.userRepo.findOneBy(({ username }))
      if (!user) {
        throw new Error('Wrong credentials')
      }

      const auth = await comparePassword(password, user.password);

      if (!auth) {
        throw new Error('Wrong credentials')
      }

      // 2fa - generate otp and send to user's email
      // first check if there's already some otp for this user, then delete
      const existingOtp = await this.otpService.search(username);
      if (existingOtp) {
        await this.otpService.delete(username);
      }

      const pin = await this.otpService.create(username);
      await sendEmail(user.email, `this is your pin: ${pin}`)

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }

  }

  async validateOtp(username: string, pin: string) {
    await this.otpService.validate(username, pin);
  }

}
