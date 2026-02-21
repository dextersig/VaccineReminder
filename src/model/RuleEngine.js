import { VaccineRule } from "./VaccineRule";
import { Patient } from "./Patient";

export class RuleEngine {
  #rules;

  constructor(rules) {
    this.rules = rules;
  }

  evaluate(patient) {
    return this.rules.map((rule) => ({
      vaccine: rule.name,
      status: rule.checkEligibility(patient),
    }));
  }
}
