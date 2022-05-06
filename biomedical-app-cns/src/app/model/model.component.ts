import { AnotomyInformation } from '../models/anotomyInformation';
import { Term } from '../models/term';
import { Component, Inject, OnInit } from '@angular/core';
import { BioMedicalService } from '../services/library.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  term!: Term;

  constructor(
    @Inject(MAT_DIALOG_DATA) public anotomyID: string,
    private bioMedService: BioMedicalService,
    ) { }

  ngOnInit(): void {
      this.fetchData(this.anotomyID);
  }

  fetchData(id: any) {
    if(id ==="" || id === "not found in UBERON")
      return
    this.bioMedService.getAnatomyData(id)
    .subscribe(
      data => {
       this.buildModal(data);
      },
      error => {
        console.log(error);
    });
  }

  buildModal(anotomyInfo: AnotomyInformation) {
    for(let eterms of anotomyInfo._embedded.terms) {
      this.term = {label: eterms.label, link:eterms.obo_id, defination: eterms.annotation.definition}
    }
    console.log(this.term);
  }

}
