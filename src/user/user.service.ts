import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Email } from "./classes/Email";
import { ContactNumber } from "./classes/ContactNumber";
import { Username } from "./classes/Username";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  async create(username: string, email: string, contactNumber: string,) {
    try {
      const newUserUsername = new Username(username);
      const newUserEmail = new Email(email);
      const newUserContactNumber = new ContactNumber(contactNumber);

      const newUser = this.userRepo.create({
        email: newUserEmail.getValue(),
        contactNumber: newUserContactNumber.getValue(),
        username: newUserUsername.getValue()
      })

      return this.userRepo.save(newUser);

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

  }

  async findAll() {
    return this.userRepo.find();
  }

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
}
