import { Patient } from "./model/Patient.js";
import { RuleEngine } from "./model/RuleEngine.js";

import { IPV, MMR, MMRV, Varicella } from "./model/VaccineEligibility.js";
import emailjs from "@emailjs/browser";

emailjs.init({
  publicKey: "-X43-bLZm01-sjqVv",
});

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const birthDay = document.getElementById("birthDay").value;
  let vaccinesAndDates = [];

  const conditions = [...document.querySelectorAll('input[name="medical"]:checked, input[name="chronic"]:checked')]
  .map(cb => cb.value);

  //vaccines
  if (document.getElementById("MMRVDose1").checked) {
    vaccinesAndDates.push(document.getElementById("MMRV Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayMMRVDose1").value);
  }
  if (document.getElementById("MMRVDose2").checked) {
    vaccinesAndDates.push(document.getElementById("MMRV Dose 2").name);
    vaccinesAndDates.push(document.getElementById("dayMMRVDose2").value);
  }
  if (document.getElementById("IPVDose1").checked) {
    vaccinesAndDates.push(document.getElementById("IPV Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayIPVDose1").value);
  }

  if (document.getElementById("IPVDose2").checked) {
    vaccinesAndDates.push(document.getElementById("IPV Dose 2").name);
    vaccinesAndDates.push(document.getElementById("dayIPVDose2").value);
  }

  if (document.getElementById("MMRDose1").checked) {
    vaccinesAndDates.push(document.getElementById("MMR Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayMMRDose1").value);
  }

  if (document.getElementById("MMRDose2").checked) {
    vaccinesAndDates.push(document.getElementById("MMR Dose 2").name);
    vaccinesAndDates.push(document.getElementById("dayMMRDose2").value);
  }

  if (document.getElementById("VaricellaDose1").checked) {
    vaccinesAndDates.push(document.getElementById("Varicella Dose 1").name);
    vaccinesAndDates.push(document.getElementById("dayVaricellaDose1").value);
  }
  if (document.getElementById("VaricellaDose2").checked) {
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

  const engine = new RuleEngine([new Varicella(), new MMRV(), new IPV()]);

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
    .send("service_cphd9lc", "template_hn5qc5r", templateParams)
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
