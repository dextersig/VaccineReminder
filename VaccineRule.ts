import { VaccineStatus } from "./VaccineStatus";
import { Patient } from "./Patient";

export class VaccineRule {
  name: string;
  checkEligibility(patient: Patient): VaccineStatus;
}
