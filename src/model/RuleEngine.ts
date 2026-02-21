import { VaccineRule } from "./VaccineRule";
import { Patient } from "./Patient";

export class RuleEngine {
  private rules: VaccineRule[];

  constructor(rules: VaccineRule[]) {
    this.rules = rules;
  }

  evaluate(patient: Patient) {
    return this.rules.map((rule) => ({
      vaccine: rule.name,
      status: rule.checkEligibility(patient),
    }));
  }
}
