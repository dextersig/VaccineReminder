import "./VaccineEligibility";

export class Patient {
  #name: string;
  #ageInMonths: number;
  #conditions: string[];

  constructor(name: string, age: number, conditions: string[]) {
    this.#name = name;
    this.#ageInMonths = age * 12;
    this.#conditions = conditions;
  }

  get age(): number {
    return this.#ageInMonths;
  }

  get conditions(): string[] {
    return this.#conditions;
  }
}
