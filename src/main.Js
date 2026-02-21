import { Patient } from "./model/Patient.js";
import { RuleEngine } from "./model/RuleEngine.js";
import { MMRV, IPV, Varicella } from "./model/VaccineEligibility.js";

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const birthDay = document.getElementById("birthDay").value;
  let conditions = [];
  let vaccinesAndDates = [];

  //risk factors
  if(document.getElementById("Chronic salicylate therapy").checked){
    conditions.push(document.getElementById("Chronic salicylate therapy").value);
  }
  if(document.getElementById("HIV").checked){
    conditions.push(document.getElementById("HIV").value);
  }
  if(document.getElementById("Asplenia").checked){
    conditions.push(document.getElementById("Asplenia").value);
  }
  if(document.getElementById("Dialysis/Renal Disease").checked){
    conditions.push(document.getElementById("Dialysis/Renal Disease").value);
  }
  if(document.getElementById("Cystic fibrosis").checked){
    conditions.push(document.getElementById("Cystic fibrosis").value);
  }
  if(document.getElementById("Organ transplant").checked){
    conditions.push(document.getElementById("Organ transplant").value);
  }
  if(document.getElementById("Cancer").checked){
    conditions.push(document.getElementById("Cancer").value);
  }
  if(document.getElementById("Hematopoietic stem cell transplant").checked){
    conditions.push(document.getElementById("Hematopoietic stem cell transplant").value);
  }
  if(document.getElementById("CAR T-cell therapy recipients").checked){
    conditions.push(document.getElementById("CAR T-cell therapy recipients").value);
  }
  if(document.getElementById("Under the care of a haematologist or oncologist").checked){
    conditions.push(document.getElementById("Under the care of a haematologist or oncologist" ).value);
  }

  //vaccines
  if(document.getElementById("MMRV").checked){
    vaccinesAndDates.push(document.getElementById("MMRV").name);
    vaccinesAndDates.push(document.getElementById("dayMMRV").value);
  }
  if(document.getElementById("IPV").checked){
    vaccinesAndDates.push(document.getElementById("IPV").name);
    vaccinesAndDates.push(document.getElementById("dayIPV").value);
  }
  if(document.getElementById("Varicella Dose 1").checked){
    vaccinesAndDates.push(document.getElementById("Varicella Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayVaricellaDose1").value);
  }
  if(document.getElementById("Varicella Dose 2").checked){
    vaccinesAndDates.push(document.getElementById("Varicella Dose 2").name);
    vaccinesAndDates.push(document.getElementById("dayVaricellaDose2").value);
  }
  



  const name = `${firstName} ${lastName}`;

  if (!name || !birthDay) {
    alert("Missing input");
    return;
  }

  const dob = new Date(birthDay);

  const patient = new Patient(name, dob, conditions, vaccinesAndDates);

  const engine = new RuleEngine([new MMRV(), new IPV(), new Varicella()]);

  const results = engine.evaluate(patient);

  document.querySelector("#app").innerHTML = `
    <h1>Eligibility Results</h1>
    ${results.map((r) => `<p>${r.vaccine}: ${r.status}</p>`).join("")}
  `;
});
