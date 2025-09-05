import { hashPassword } from "src/common/bcrypt";

export class Password {
  private plainTextValue: string;

  constructor(plainText: string) {
    if (plainText.trim().length === 0) {
      throw new Error('Passwords cannot be blank')
    }

    this.plainTextValue = plainText;
  }

  async hash() {
    return await hashPassword(this.plainTextValue);
  }
}
