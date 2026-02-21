import { Patient } from "./Patient";
import { VaccineRule } from "./VaccineRUle";
import { VaccineStatus } from "./VaccineStatus";

export class MMRV implements VaccineRule {
  name = "MMRV";
  checkEligibility(patient: Patient): VaccineStatus {
    if (patient.age < 144) return VaccineStatus.ELIGIBLE_NOW;
    return VaccineStatus.NOT_ELIGIBLE;
  }
}

export class IPV implements VaccineRule {
  search_strings = ["unimmunised", "Incompletely immunized"];
  name = "IPV";

  checkEligibility(patient: Patient): VaccineStatus {
    if (patient.age < 216 && isFound(this.search_strings, patient.conditions))
      return VaccineStatus.ELIGIBLE_NOW;
    return VaccineStatus.NOT_ELIGIBLE;
  }
}

export class Varicella implements VaccineRule {
  search_strings = [
    "Chronic salicylate therapy",
    "HIV",
    "Dialysis",
    "Cystic fibrosis",
    "Organ transplant",
    "Cancer",
  ];

  name = "Varicella";

  checkEligibility(patient: Patient): VaccineStatus {
    if (patient.age < 192 && isFound(this.search_strings, patient.conditions))
      return VaccineStatus.ELIGIBLE_NOW;
    return VaccineStatus.NOT_ELIGIBLE;
  }
}

function isFound(arr1: String[], arr2: String[]): boolean {
  return arr1.some((ai) => arr2.includes(ai));
}
