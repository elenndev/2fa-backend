export class ContactNumber {
  private value: string;

  constructor(value: string) {
    const regex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;

    if (!regex.test(value)) {
      throw new Error('Invalid email');
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
