function MMRV(patient : Patient) {
    return patient.age < 144;
}

function IPV(patient: Patient) {
    let search_strings = ["unimmunised", "Incompletely immunized"];

    return patient.age < 216 && isFound(search_strings , patient.conditions)
}

function Varicella(patient: Patient) {
    let search_strings = [
      "Chronic salicylate therapy",
      "HIV",
      "Dialysis",
      "Cystic fibrosis",
      "Organ transplant",
      "Cancer",
    ];

    return patient.age < 192 && isFound(search_strings, patient.conditions);
}

function isFound(arr1: String[] , arr2 : String[]) : boolean {
    return arr1.some( ai => arr2.includes(ai) );
}