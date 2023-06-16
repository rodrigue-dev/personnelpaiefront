import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/core/models/departement';
import { Fonction } from 'src/app/core/models/fonction';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  departements:Departement[] | undefined;
  fonctions:Fonction[]|undefined;
  checkTypeplaning=false
  imageSrc: any = '';
  id:any;
  firstForm=true
  ibanPattern = "^[a-z0-9_-]{16,16}$";
  public selected :any = [];
  public dayworks :any=[];
      // @ts-ignore
      itemForm: FormGroup;
      constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
        private route: ActivatedRoute,private toaster: ToastrService,
        private router: Router,private database: DatabaseService){
          
          this.itemForm = this.formBuilder.group({
            password: ["12345", Validators.required],
            username: ["username", Validators.nullValidator],
            firstname: ["", Validators.required],
            lastname: ["", Validators.nullValidator],
            phone: ["", Validators.required],
            matricule: ["", Validators.nullValidator],
            genre: ["", Validators.nullValidator],
            etatCivil: ["", Validators.nullValidator],
            compteIban: ["", [Validators.required,Validators.pattern(this.ibanPattern), Validators.minLength(16)]],
            email: ["", Validators.required],
            role: ["", Validators.required],
            departement_id: ["", Validators.required],
            fonction_id: ["", Validators.required],
            id: [null, Validators.nullValidator],
            imageFile: ['', [Validators.required]],
            departement:[null, Validators.nullValidator],
            typeplaning:[null, Validators.nullValidator],
            dayworks:[null, Validators.nullValidator],
            dateDebut:[null, Validators.nullValidator],
            dateFin:[null, Validators.nullValidator],
          });
        
      }
  ngOnInit(): void {
   this.id=Number(this.route.snapshot.paramMap.get('id'))
   this.database.getDepartements().subscribe((res) => {
    this.departements = res;
  }
  );
   this.database.getUserById(parseInt(this.id)).subscribe((row)=>{
  
    this.database.getFonctionByDepartement(parseInt(row.departement_id)).subscribe((res)=>{
      this.fonctions=res;
    });
    this.imageSrc = row.imageFile;
    if(row.typeplaning==2){
      this.checkTypeplaning=true
      this.dayworks=row.dayworks
    }else{
      this.checkTypeplaning=false
      this.dayworks=[]
    }
    this.itemForm=this.formBuilder.group({
      username: row.username,
      firstname: row.firstname,
      lastname: row.lastname,
      phone: row.phone,
      matricule: row.matricule,
      genre: row.genre,
      etatCivil: row.etatCivil,
      compteIban: row.compteIban,
      email: row.email,
      role: row.role,
      departement_id: row.departement_id,
      fonction_id: row.fonction_id,
      id: row.id,
      departement: row.departement,
      typeplaning:row.typeplaning,
      dateDebut:row.dateDebut,
      dateFin:row.dateFin,
      imageFile:[],
      dayworks:[]
    })
  });
  } changeDepartement(departement:Event){
    this.database.getFonctionByDepartement(parseInt((departement.target as HTMLInputElement).value)).subscribe((res)=>{
      this.fonctions=res;
    });
  }
  changeTypePlaning(departement:Event){
  console.log( this.itemForm.value.typeplaning)
  if(this.itemForm.value.typeplaning==2){
    this.checkTypeplaning=true
  }else{
    this.checkTypeplaning=false
  }
  }
  onFileSelect(event:any) {
    const file = event.target.files[0];
    let status = event.target.files.length > 0;
    if (status === true){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imageSrc = reader.result;
          
           this.itemForm.value.imageFile = this.imageSrc;
           console.log(this.itemForm.value.imageFile)
        };
    }
   
}
onSubmit() {
    
  this.itemForm.value.dayworks = this.dayworks;
 // this.itemForm.value.imageFile = this.imageSrc;
  console.log(this.itemForm.value)
  this.database.createUser(this.itemForm.value).subscribe((res: any) => {
    this.toaster.success("Employe enregistré avec success", "Success");
    this.router.navigate(["/pages/users"]);
  }, err => {
    console.log(err);
    this.toaster.error("Une erreur s'est produite", err.message);
   
   // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
  });
}
clickDay(event:Event){
  console.log(this.dayworks.length)
  // @ts-ignore
  if(event.target!.checked!){
    if(this.dayworks.length <3){
       this.dayworks.push((event.target as HTMLInputElement).value)
    console.log(this.dayworks)
    }else{
      this.toaster.error("Impossible de travailler plus de 3 jours pour ce employé", "Erreur");
    }
   
  }else{
    console.log((event.target as HTMLInputElement).value)
    let index:number=this.dayworks.indexOf((event.target as HTMLInputElement).value)
   if(index !== -1){
    this.dayworks.splice(index,1)
   }
  }
  
}
nextButton(){
  this.firstForm=false;
}
previousButton(){
  this.firstForm=true;
}
}
