import { VaccineRule } from "./VaccineRule.js";
import { VaccineStatus } from "./VaccineStatus.js";

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
    "Asplenia",
    "Dialysis/Renal Disease",
    "Cystic fibrosis",
    "Organ transplant",
    "Cancer",
    "Hematopoietic stem cell transplant",
    "CAR T-cell therapy recipients",
    "Under the care of a haematologist or oncologist",
  ];

  name = "Varicella";

  checkEligibility(patient) {
    if (
      ((patient.birthYear >= 2008) && (patient.ageInYears >= 1)) ||
      containsAny(this.search_strings, patient.conditions)){
        return VaccineStatus.ELIGIBLE_NOW;
      }else{
        return VaccineStatus.NOT_ELIGIBLE;
      }
  }
}

export function containsAny(search, patient) {
  return search.some((s) => patient.includes(s));
}
