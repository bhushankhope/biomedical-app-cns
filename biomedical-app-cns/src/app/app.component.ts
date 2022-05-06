import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ModelComponent } from './model/model.component';
import { Anotomy } from './models/anotomy';
import { BioMedicalLibraryData } from './models/biomedlibrarydata';
import { BioMedicalService } from './services/library.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'biomedical-app-cns';
  medicalData!: Observable<BioMedicalLibraryData>;
  dataSource!: MatTableDataSource<Anotomy>;
  columnsDisplay: string[] = ['id', 'name'];
  anatomyData: Array<Anotomy> = [];

  constructor(
    private bioMedService: BioMedicalService,
    public modal: MatDialog
  ) { }

  ngOnInit(): void {

    this.medicalData = this.bioMedService.bioMedLibraryData;
    this.bioMedService.loadMedicalData();
    this.medicalData.subscribe( data => {
      console.log(data);
      this.makeModal(data);
    },
     error=> {
       console.log('Error has occured:', error);
     })
  }

  // Open dialog box
  // Replacing : with _
  showModal(id: string) {
    id = id.replace(':','_');
    console.log("id:", id);
    let modelReference = this.modal.open(ModelComponent, {
      width: '300px',
      data: id,
    });
  }

  makeModal(medicalData: BioMedicalLibraryData) {
    for (let row of medicalData.data) {
      for(let anotomyStructure of row.anatomical_structures) {
        this.anatomyData.push({ id: anotomyStructure.id,name: anotomyStructure.name });
      }
    }
    // Filter the data
    this.anatomyData = this.anatomyData.filter(
      (thing, i, arr) => arr.findIndex(t => t.name === thing.name) === i
    );
    console.log("The data is:",this.anatomyData[0]);
    this.dataSource = new MatTableDataSource<Anotomy>(this.anatomyData);
  }

  
}