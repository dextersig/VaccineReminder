import { VaccineRule } from "./VaccineRule.js";
import { VaccineStatus } from "./VaccineStatus.js";

export class MMRV extends VaccineRule {
  name = "MMRV";
  checkEligibility(patient) {
    if ((patient.ageInYears <= 12)) { //NEED TO CALL V AND MMR
      return VaccineStatus.ELIGIBLE_NOW;
    }else if(patient.vaccinesAndDates.includes("MMRV Dose 1") && patient.vaccinesAndDates.includes("MMRV Dose 2")){
      return VaccineStatus.COMPLETED;
    }else{
      return VaccineStatus.NOT_ELIGIBLE;
    }
  }
}

export class IPV extends VaccineRule {
  search_strings1 = ["Hematopoietic stem cell transplant", "CAR T-cell therapy recipients",];
  search_strings2 = ["Malignant neoplasms","Hyposplenic", "Asplenia",];
  name = "IPV";

  checkEligibility(patient) {
    if (((patient.ageInYears < 18) && ((!patient.vaccinesAndDates.includes("IPV")) || patient.conditions.includes("Incompletely Immunized - OPV and less than 2 IPV Doses"))) ||
      ((containsAny(this.search_strings1, patient.conditions)) || (containsAny(this.search_strings2, patient.conditions) && patient.conditions.includes("Under the care of a haematologist or oncologist"))) ){
      return VaccineStatus.ELIGIBLE_NOW;
    }else if(patient.vaccinesAndDates.includes("IPV")){
      return VaccineStatus.COMPLETED;
    }else{
      return VaccineStatus.NOT_ELIGIBLE;
    }
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
    if ((((patient.birthYear >= 2008) && (patient.ageInYears >= 1)) ||
      containsAny(this.search_strings, patient.conditions)) && 
      ((!(patient.vaccinesAndDates.includes("Varicella Dose 1") && patient.vaccinesAndDates.includes("Varicella Dose 2"))) &&
       ((!(patient.vaccinesAndDates.includes("Varicella Dose 1") && patient.vaccinesAndDates.includes("MMRV Dose 1"))) &&
      (!(patient.vaccinesAndDates.includes("MMRV Dose 1") && patient.vaccinesAndDates.includes("MMRV Dose 2")))))){
        return VaccineStatus.ELIGIBLE_NOW;
      }else if(patient.vaccinesAndDates.includes("Varicella Dose 1") && patient.vaccinesAndDates.includes("Varicella Dose 2")){
        return VaccineStatus.COMPLETED;
      }else{
        return VaccineStatus.NOT_ELIGIBLE;
      }
  }
}

export function containsAny(search, patient) {
  return search.some((s) => patient.includes(s));
}
