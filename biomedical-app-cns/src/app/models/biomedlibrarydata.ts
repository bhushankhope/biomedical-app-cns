import { Row } from "./row";

  export interface BioMedicalLibraryData {
    data: Array<Row>;
    csv: string;
    parsed?: string;
  }