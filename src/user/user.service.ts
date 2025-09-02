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

      const updatedUser = await this.userRepo.findOneBy({ id })
      if (!updatedUser) {
        throw new Error("User not found");
      }

      updatedUser.contactNumber = newContactNumber.getValue();
      await this.userRepo.save(updatedUser)

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }


  async changeEmaik(id: number, email: string) {
    // try {
    //   const newEmail = new Email(email);
    //
    //   return this.
    // }
  }
}
