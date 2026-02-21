import "./VaccineEligibility"

export class Patient {
  #name: string;
  #ageInMonths: number;
  #conditions!: String[];
  #vaccinations!: Vaccination[];

  constructor(name: string, age: number, conditions: string[]) {
    this.#name = name;
    this.#ageInMonths = age * 12;
    this.#conditions = conditions;
    this.#vaccinations = [];
  }

  public addVaccine(vacc: Vaccination) {
    this.#vaccinations.push(vacc);
  }

  get age(): number {
    return this.#ageInMonths;
  }

  get conditions(): String[] {
    return this.#conditions;
  }

}