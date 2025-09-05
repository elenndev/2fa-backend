import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(plaintext: string) {
  return await bcrypt.hash(plaintext, saltRounds);
}

export async function comparePassword(plaintext: string, hashedPassword: string) {
  return await bcrypt.compare(plaintext, hashedPassword);
}

