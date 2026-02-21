import { Patient } from "./Patient";
import { VaccineRule } from "./VaccineRule";
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
    if (
      patient.age < 216 &&
      containsAny(this.search_strings, patient.conditions)
    )
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
    if (
      patient.age < 192 &&
      containsAny(this.search_strings, patient.conditions)
    )
      return VaccineStatus.ELIGIBLE_NOW;
    return VaccineStatus.NOT_ELIGIBLE;
  }
}

export function containsAny(search: string[], patient: string[]): boolean {
  return search.some((s) => patient.includes(s));
}
