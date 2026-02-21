import { Patient } from "./model/Patient.js";
import { RuleEngine } from "./model/RuleEngine.js";
<<<<<<< HEAD
import { IPV, MMR, MMRV, Varicella } from "./model/VaccineEligibility.js";
=======
import { IPV, MMRV, Varicella } from "./model/VaccineEligibility.js";
import emailjs from "@emailjs/browser";

emailjs.init({
  publicKey: "-X43-bLZm01-sjqVv",
});

>>>>>>> 0198af550a58491add0707ad527a86a4f44f4ae1

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const birthDay = document.getElementById("birthDay").value;
  let conditions = [];
  let vaccinesAndDates = [];
  let email;

  //risk factors
  if (document.getElementById("Chronic salicylate therapy").checked) {
    conditions.push(document.getElementById("Chronic salicylate therapy").value);
  }
  if (document.getElementById("HIV").checked) {
    conditions.push(document.getElementById("HIV").value);
  }
  if (document.getElementById("Asplenia").checked) {
    conditions.push(document.getElementById("Asplenia").value);
  }
  if (document.getElementById("Dialysis/Renal Disease").checked) {
    conditions.push(document.getElementById("Dialysis/Renal Disease").value);
  }
  if (document.getElementById("Cystic fibrosis").checked) {
    conditions.push(document.getElementById("Cystic fibrosis").value);
  }
  if (document.getElementById("Organ transplant").checked) {
    conditions.push(document.getElementById("Organ transplant").value);
  }
  if (document.getElementById("Cancer").checked) {
    conditions.push(document.getElementById("Cancer").value);
  }
  if (document.getElementById("Hematopoietic stem cell transplant").checked) {
    conditions.push(document.getElementById("Hematopoietic stem cell transplant").value);
  }
  if (document.getElementById("CAR T-cell therapy recipients").checked) {
    conditions.push(document.getElementById("CAR T-cell therapy recipients").value);
  }
  if (document.getElementById("Under the care of a haematologist or oncologist").checked) {
    conditions.push(document.getElementById("Under the care of a haematologist or oncologist").value);
  }
  if (document.getElementById("Malignant neoplasms").checked) {
    conditions.push(document.getElementById("Malignant neoplasms").value);
  }
  if (document.getElementById("Hyposplenic").checked) {
    conditions.push(document.getElementById("Hyposplenic").value);
  }
  if (document.getElementById("Incompletely Immunized - OPV and less than 2 IPV Doses").checked) {
    conditions.push(document.getElementById("Incompletely Immunized - OPV and less than 2 IPV Doses").value);
  }

  //vaccines
  if (document.getElementById("MMRV Dose 1").checked) {
    vaccinesAndDates.push(document.getElementById("MMRV Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayMMRVDose1").value);
  }
  if (document.getElementById("MMRV Dose 2").checked) {
    vaccinesAndDates.push(document.getElementById("MMRV Dose 2").name);
    vaccinesAndDates.push(document.getElementById("dayMMRVDose2").value);
  }
  if (document.getElementById("MMR Dose 1").checked) {
    vaccinesAndDates.push(document.getElementById("MMR Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayMMRDose1").value);
  }
  if (document.getElementById("MMR Dose 2").checked) {
    vaccinesAndDates.push(document.getElementById("MMR Dose 2").name);
    vaccinesAndDates.push(document.getElementById("dayMMRDose2").value);
  }
  if (document.getElementById("IPV Dose 1").checked) {
    vaccinesAndDates.push(document.getElementById("IPV Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayIPVDose1").value);
  }
  if (document.getElementById("IPV Dose 2").checked) {
    vaccinesAndDates.push(document.getElementById("IPV Dose 2").name);
    vaccinesAndDates.push(document.getElementById("dayIPVDose2").value);
  }
  if (document.getElementById("Varicella Dose 1").checked) {
    vaccinesAndDates.push(document.getElementById("Varicella Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayVaricellaDose1").value);
  }
  if (document.getElementById("Varicella Dose 2").checked) {
    vaccinesAndDates.push(document.getElementById("Varicella Dose 2").name);
    vaccinesAndDates.push(document.getElementById("dayVaricellaDose2").value);
  }

  email = document.getElementById("Varicella Dose 2").value;


  const name = `${firstName} ${lastName}`;

  if (!name || !birthDay) {
    alert("Missing input");
    return;
  }

  const dob = new Date(birthDay);

  const patient = new Patient(name, dob, conditions, vaccinesAndDates);

  const engine = new RuleEngine([new Varicella(), new MMR(), new MMRV(), new IPV()]);

  const results = engine.evaluate(patient);

  const userEmail = document.getElementById("email").value;
  // format eligibility results nicely
  const formattedResults = results
    .map((r) => `${r.vaccine}: ${r.status}`)
    .join("\n");

  const templateParams = {
    patient_name: name,
    birthday: birthDay,
    conditions: conditions.join(", "),
    results: formattedResults,
    user_email: userEmail,
  };

  emailjs
    .send("service_62d5msb", "template_hn5qc5r", templateParams)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Email failed:", error);
    });

  


  document.querySelector("#app").innerHTML = `
    <h1>Eligibility Results</h1>
    ${results.map((r) => `<p>${r.vaccine}: ${r.status}</p>`).join("")}
  `;
});