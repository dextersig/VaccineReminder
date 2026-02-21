import { VaccineStatus } from "./VaccineStatus";
import { Patient } from "./Patient";

export interface VaccineRule {
  name: string;
  checkEligibility(patient: Patient): VaccineStatus;
}
