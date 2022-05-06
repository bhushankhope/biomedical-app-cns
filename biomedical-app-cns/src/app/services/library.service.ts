import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnotomyInformation } from '../models/anotomyInformation';
import { BehaviorSubject, Observable } from 'rxjs';
import { BioMedicalLibraryData } from '../models/biomedlibrarydata';

@Injectable({
  providedIn: 'root'
})
export class BioMedicalService {
  private _bioMedData: BehaviorSubject<BioMedicalLibraryData>;
  medicalURL = 'https://asctb-api.herokuapp.com/v2/18lJe-9fq5fHWr-9HuFTzhWnmfygeuXs2bbsXO8vh1FU/0';
  anatomyURL = 'https://www.ebi.ac.uk/ols/api/ontologies/uberon/terms?iri=http://purl.obolibrary.org/obo/';


  private bioMedDataStoring: {
    bioMedlibrarydata: BioMedicalLibraryData
  }

  constructor(private http: HttpClient) { 
    this.bioMedDataStoring = { bioMedlibrarydata:{data:[],csv:""} };
    this._bioMedData =  new BehaviorSubject<BioMedicalLibraryData>({data:[],csv:""});
  }

  get bioMedLibraryData(): Observable<BioMedicalLibraryData> {
    return this._bioMedData.asObservable();
  }

  loadMedicalData() {
    return this.http.get<BioMedicalLibraryData>(this.medicalURL)
      .subscribe(data => {
        this.bioMedDataStoring.bioMedlibrarydata = data;
        this._bioMedData.next(Object.assign({}, this.bioMedDataStoring).bioMedlibrarydata);
      }, error => {
        console.log("failed to retrieve: ", error);
      });
  }

  getAnatomyData(id: string): Observable<AnotomyInformation> {
    return this.http.get<AnotomyInformation>(this.anatomyURL+id);
  }
}
