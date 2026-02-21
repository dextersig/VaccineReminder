<<<<<<< HEAD
import { VaccineRule } from "./VaccineRule";
import { VaccineStatus } from "./VaccineStatus";
=======
import { Patient } from "./Patient.js";
import { VaccineRule } from "./VaccineRule.js";
import { VaccineStatus } from "./VaccineStatus.js";
>>>>>>> 1e645d6c0be5291181cece46bd365b45ac9834eb

export class MMRV extends VaccineRule {
  name = "MMRV";
  checkEligibility(patient) {
    if (patient.ageInYears < 12) return VaccineStatus.ELIGIBLE_NOW;
    return VaccineStatus.NOT_ELIGIBLE;
  }
}

export class IPV extends VaccineRule {
  search_strings = ["unimmunised", "Incompletely immunized"];
  name = "IPV";

  checkEligibility(patient) {
    if (
      patient.ageInYears < 18 ||
      containsAny(this.search_strings, patient.conditions)
    )
      return VaccineStatus.ELIGIBLE_NOW;
    return VaccineStatus.NOT_ELIGIBLE;
  }
}

export class Varicella extends VaccineRule {
  search_strings = [
    "Chronic salicylate therapy",
    "HIV",
    "Dialysis",
    "Cystic fibrosis",
    "Organ transplant",
    "Cancer",
  ];

  name = "Varicella";

  checkEligibility(patient) {
    if (
      patient.ageInYears < 16 ||
      containsAny(this.search_strings, patient.conditions)
    )
      return VaccineStatus.ELIGIBLE_NOW;
    return VaccineStatus.NOT_ELIGIBLE;
  }
}

export function containsAny(search, patient) {
  return search.some((s) => patient.includes(s));
}
