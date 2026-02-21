export class Patient {
  #name;
  #dateOfBirth;
  #conditions;
  #vaccinesAndDates;
  #occupation;

  constructor(name, dateOfBirth, occupation, conditions, vaccinesAndDates) {
    this.#name = name;
    this.#dateOfBirth = dateOfBirth;
    this.#occupation = occupation; // Student, Retired, Healthcare worker, Worker
    this.#conditions = conditions;
    this.#vaccinesAndDates = vaccinesAndDates;
  }

  set vaccinesAndDates(array) {
    this.#vaccinesAndDates = [];
  }

  get vaccinesAndDates() {
    return this.#vaccinesAndDates;
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

  get birthYear() {
    return this.#dateOfBirth.getFullYear();
  }
  get occupation() {
    return this.#occupation;
  }

  get ageInMonths() {
    return this.ageInYears * 12;
  }
}
