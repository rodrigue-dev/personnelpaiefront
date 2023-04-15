import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Avantage } from 'src/app/core/models/avantage';
import { Departement } from 'src/app/core/models/departement';
import { Fonction } from 'src/app/core/models/fonction';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.css']
})
export class FonctionComponent  implements OnInit {

  rows:Fonction[] | undefined;
  items: number[] = [];
  departements:Departement[] | undefined;
  departementsbyfonction:Departement[] | undefined;
  avantages:Avantage[] | undefined;
  selectFonction: null| undefined;
  departement:null| undefined;
  avantagesbyfonction:Avantage[] | undefined;
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
    
      }
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      typeFonction: ["", Validators.required],
      salaireSuppl: ["", Validators.required],
      heureTravaille: ["", Validators.required],
      id: [null, Validators.required]
    });
    this.database.getFonction().subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
    this.database.getDepartements().subscribe((res)=>{
      this.departements=res;
    },(error)=>{

    }
    );
    this.database.getAvantages().subscribe((res)=>{
      this.avantages=res;
    },(error)=>{

    }
    );
  }
  openLg(content:any) {
    this.modalService.open(content, { size: 'md' });

  }
  openDepartement(contentDepartement:any,id:any) {
    this.modalService.open(contentDepartement, { size: 'lg' });
    console.log(id)
    this.selectFonction=id
     this.database.getDepartementsByFoction(id).subscribe((res)=>{
      this.departementsbyfonction=res;
    },(error)=>{
    }
    ); 
  }
  openAvantage(contentDepartement:any,id:any) {
    this.modalService.open(contentDepartement, { size: 'lg' });
    this.database.getAvantagesByFoction(id).subscribe((res)=>{
      this.avantagesbyfonction=res;
    },(error)=>{

    }
    );
  }
  departementChange(event:any){
    console.log(event)
    this.items.push(event);
    const values = {
          'fonction_id':this.selectFonction,
          'items':this.items,
     
  }
  this.database.createFonctionDepartement(values).subscribe((res: any) => {
    this.toaster.success("Enregistrement avec success", 'OK');
    this.database.getDepartementsByFoction(this.selectFonction!).subscribe((res)=>{
      this.departementsbyfonction=res;
    }); 
  }, err => {
    console.log(err);
    this.toaster.error("Ust produite", err.message);
  });
  }
  onSubmit() {

    console.log(this.itemForm.value)
    this.database.createFonction(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();

    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}
