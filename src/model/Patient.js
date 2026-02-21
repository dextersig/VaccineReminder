export class Patient {
  #name;
  #dateOfBirth;
  #conditions;
  #vaccinesAndDates;

  constructor(name, dateOfBirth, conditions, vaccinesAndDates) {
    this.#name = name;
    this.#dateOfBirth = dateOfBirth;
    this.#conditions = conditions;
    this.#vaccinesAndDates = vaccinesAndDates;
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

  get birthYear(){
    return this.#dateOfBirth.getFullYear();
  }

  get ageInMonths() {
    return this.ageInYears * 12;
  }
}
