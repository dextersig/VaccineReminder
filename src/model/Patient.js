export class Patient {
  #name;
  #dateOfBirth;
  #conditions;

  constructor(name, dateOfBirth, conditions) {
    this.#name = name;
    this.#dateOfBirth = dateOfBirth;
    this.#conditions = conditions;
  }

  get conditions() {
    return this.#conditions;
  }

  get ageInYears() {
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

  get ageInMonths() {
    return this.ageInYears * 12;
  }
}
