import "./VaccineEligibility";

export class Patient {
  #name: string;
  #dob: string;
  #conditions: string[];

  constructor(name: string, dob: string, conditions: string[]) {
    this.#name = name;
    this.#dob = dob;
    this.#conditions = conditions;
  }

  get age(): number {
    return this.calculateAge(this.#dob) * 12;
  }

  get conditions(): string[] {
    return this.#conditions;
  }

  calculateAge(dateString: string): number {
    const dob = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }
}
