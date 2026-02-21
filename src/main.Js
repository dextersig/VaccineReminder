import "./styles.css";
import "./dark.css";
import "./light.css";

import { Patient } from "./model/Patient";
import { RuleEngine } from "./model/RuleEngine";
import { MMRV, IPV, Varicella } from "./model/VaccineEligibility";

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const birthDay = document.getElementById("birthDay").value;

  const name = `${firstName} ${lastName}`;

  if (!name || !birthDay) {
    alert("Missing input");
    return;
  }

  const dob = new Date(birthDay);

  const patient = new Patient(name, dob, []);

  const engine = new RuleEngine([new MMRV(), new IPV(), new Varicella()]);

  const results = engine.evaluate(patient);

  document.querySelector("#app").innerHTML = `
    <h1>Eligibility Results</h1>
    ${results.map((r) => `<p>${r.vaccine}: ${r.status}</p>`).join("")}
  `;
});
