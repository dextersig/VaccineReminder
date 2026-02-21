export class Patient {
  #name: string;
  #dateOfBirth: Date;
  #conditions: string[];

  constructor(name: string, dateOfBirth: Date, conditions: string[]) {
    this.#name = name;
    this.#dateOfBirth = dateOfBirth;
    this.#conditions = conditions;
  }

  get conditions(): string[] {
    return this.#conditions;
  }

  get ageInYears(): number {
    const today = new Date();

    let age = today.getFullYear() - this.#dateOfBirth.getFullYear();

    if (
      today.getMonth() < this.#dateOfBirth.getMonth() ||
      (today.getMonth() === this.#dateOfBirth.getMonth() &&
        today.getDate() < this.#dateOfBirth.getDate())
    ) {
      age--;
    }

    return age;
  }

  get ageInMonths(): number {
    return this.ageInYears * 12;
  }
}
