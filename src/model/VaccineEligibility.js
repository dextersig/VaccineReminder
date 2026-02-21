import { VaccineRule } from "./VaccineRule.js";
import { VaccineStatus } from "./VaccineStatus.js";

let varicellaCheck = false;

export class MMR extends VaccineRule{
  search_strings1 = ["Hematopoietic stem cell transplant", "CAR T-cell therapy recipients"];
  search_strings2 = ["Under care of haematologist or oncologist"]

  name = "MMR";
  checkEligibility(patient) {
    if ((patient.ageInYears >= 1 || patient.birthYear >= 1945) || ((patient.birthYear >= 1970) && patient.occupation.includes("Student")) 
    ||patient.occupation.includes("Healthcare Worker") ||
     patient.conditions.includes("Under the care of a haematologist or oncologist") ||
      (containsAny(this.search_strings1, patient.conditions)) ||
       (containsAny(this.search_strings2, patient.conditions)))  { 
      return VaccineStatus.ELIGIBLE_NOW && DoseEligibility.TWO_DOSE; // Those that are 1 year old and are born in >1945
    }else if((patient.birthYear <= 1984 && patient.birthYear >=1970) && (!patient.vaccinesAndDates.includes("MMR Dose 1") && (!patient.vaccinesAndDates.includes("MMR Dose 2"))
    || (patient.birthYear<=1970) && patient.occupation.includes("Student") )){ //Between 1970 and 984 OR students born before 1970 and are a student
      return VaccineStatus.ELIGIBLE_NOW && DoseEligibility.ONE_DOSE;
    }else if((patient.vaccinesAndDates.includes("MMRV Dose 1") && patient.vaccinesAndDates.includes("MMRV Dose 2"))){ // If patient already got a vaccine
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
    if (patient.vaccinesAndDates == undefined ){
      patient.vaccinesAndDates = [];
    }
    if ((((patient.birthYear >= 2008) && (patient.ageInYears >= 1)) ||
      containsAny(this.search_strings, patient.conditions)) && 
      ((!(patient.vaccinesAndDates.includes("Varicella Dose 1") && patient.vaccinesAndDates.includes("Varicella Dose 2"))) &&
       ((!(patient.vaccinesAndDates.includes("Varicella Dose 1") && patient.vaccinesAndDates.includes("MMRV Dose 1"))) &&
      (!(patient.vaccinesAndDates.includes("MMRV Dose 1") && patient.vaccinesAndDates.includes("MMRV Dose 2")))))){
        varicellaCheck = true;
        return VaccineStatus.ELIGIBLE_NOW;
      }else if(patient.vaccinesAndDates.includes("Varicella Dose 1") && patient.vaccinesAndDates.includes("Varicella Dose 2")){
        varicellaCheck = false;
        return VaccineStatus.COMPLETED;
      }else{
        varicellaCheck = false;
        return VaccineStatus.NOT_ELIGIBLE;
      }
  }
}

export class MMRV extends VaccineRule {
  name = "MMRV";
  checkEligibility(patient) {
    if ((patient.ageInYears <= 12) && (varicellaCheck)) { //NEED TO CALL V AND MMR
      return VaccineStatus.ELIGIBLE_NOW;
    }else if(patient.vaccinesAndDates.includes("MMRV Dose 1") && patient.vaccinesAndDates.includes("MMRV Dose 2")){
      return VaccineStatus.COMPLETED;
    }else{
      return VaccineStatus.NOT_ELIGIBLE;
    }
  }
}

export function containsAny(search, patient) {
  return search.some((s) => patient.includes(s));
}
