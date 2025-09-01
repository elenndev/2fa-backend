export class Username {
  private value: string;

  constructor(value: string) {
    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(value)) {
      throw new Error('Invalid username');
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
