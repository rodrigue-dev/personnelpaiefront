import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/core/models/departement';
import { User } from 'src/app/core/models/user';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit{
  rows:User[] | undefined;
  departements:Departement[] | undefined;
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
    
      }
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      password: ["12345", Validators.required],
      username: ["username", Validators.nullValidator],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      phone: ["", Validators.required],
      matricule: ["", Validators.required],
      genre: ["", Validators.required],
      etatCivil: ["", Validators.required],
      compteIban: ["", Validators.required],
     email: ["", Validators.required],
     role: ["", Validators.required],
      departement_id: ["", Validators.required],
      id: [null, Validators.required],
      departement:[null]
    });
    this.database.getUsers().subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
    this.database.getDepartements().subscribe((res)=>{
      this.departements=res;
    },(error)=>{

    }
    );
  }
  onSubmit() {

    console.log(this.itemForm.value)
    this.database.createUser(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();

    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}
