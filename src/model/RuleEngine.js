<<<<<<< HEAD
=======
import { VaccineRule } from "./VaccineRule.js";
import { Patient } from "./Patient.js";

>>>>>>> 1e645d6c0be5291181cece46bd365b45ac9834eb
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
