import { Patient } from "./model/Patient";
import { RuleEngine } from "./model//RuleEngine";
import { MMRV, IPV, Varicella } from "./model/VaccineEligibility";
import "./styles.css";
import "./dark.css";
import "./light.css";
// Get input
const name = prompt("Enter patient name:");
const dobInput = prompt("Enter DOB (YYYY-MM-DD):");

if (!dobInput || !name) {
  throw new Error("Missing input");
}

const dob = new Date(dobInput);

// Create patient
const patient = new Patient(name, dob, []);

// Run rules
const engine = new RuleEngine([new MMRV(), new IPV(), new Varicella()]);

const results = engine.evaluate(patient);

// Output to page
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <h1>Eligibility Results</h1>
    ${results.map((r) => `<p>${r.vaccine}: ${r.status}</p>`).join("")}
`;
