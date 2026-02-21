import { VaccineRule } from "./VaccineRule.js";
import { Patient } from "./Patient.js";

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
