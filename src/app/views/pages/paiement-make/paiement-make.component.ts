import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paiement } from 'src/app/core/models/paiement';
import { DatabaseService } from 'src/app/core/service/database.service';

@Component({
  selector: 'app-paiement-make',
  templateUrl: './paiement-make.component.html',
  styleUrls: ['./paiement-make.component.css']
})
export class PaiementMakeComponent  implements OnInit {
  selectmonth!: number;
  currentUser: any;
  rows: Paiement[] = [];
    // @ts-ignore
    itemForm: FormGroup;
  constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
    private route: ActivatedRoute,private toaster: ToastrService,
    private router: Router,private database: DatabaseService){
      this.itemForm = this.formBuilder.group({
        total_jour: ["", Validators.required],
        user_id: ["", Validators.required],
        id: [null, Validators.required],
        precomptePro: [null, Validators.required],
        cotisationCnss: [null, Validators.required],
        retenu_retraite: [null, Validators.required],
        retenu_chomage: [null, Validators.required],
        retenu_total: [null, Validators.required],
        cnss_retenue: [null, Validators.required],
        suppl_transport: [null, Validators.required],
        prime_HS: [null, Validators.required],
        prime_prestation: [null, Validators.required],
        prime_equipe: [null, Validators.required],
        total_brut: [null, Validators.required],
        total_prime: [null, Validators.required],
        total_impossable: [null, Validators.required],
        total_net: [null, Validators.required],
      });
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    let id=Number(this.route.snapshot.paramMap.get('month'))
    let mon=new Date().getMonth;
    let year=new Date().getFullYear();
    console.log(year)
    this.selectmonth=id;
    this.database.getPaiementbyMonth(id).subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  calculSalaire(){
    if(this.rows.length>0 && this.rows[0].dateCreation==null){
      this.toaster.error("Une erreur s'est produite", "Le bulletin a deja ete genere pour ce mois");
    }else{
       this.rows=[]
    let id=Number(this.route.snapshot.paramMap.get('month'))
    let year=new Date().getFullYear();
    this.database.getCalculVariablebyMonth(id,year,1,this.currentUser.id).subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    ); 
    }
  
  }
  calculHeureSup(){
    this.rows=[]
    let year=new Date().getFullYear();
    let id=Number(this.route.snapshot.paramMap.get('month'))
    this.database.getCalculVariablebyMonth(id,year,2,this.currentUser.id).subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );
  }
  generateBulletin(){
    if(this.rows[0].dateCreation==null){
      this.toaster.error("Une erreur s'est produite", "Le bulletin a deja ete genere pour ce mois");
    }else{
    this.rows=[]
    let id=Number(this.route.snapshot.paramMap.get('month'))
    let year=new Date().getFullYear();
    this.database.getCalculVariablebyMonth(id,year,10,this.currentUser.id).subscribe((res)=>{
      this.rows=res;
    });}
  }
  sendMail(){
    if(this.rows[0].datePaie==null){
      this.toaster.error("Une erreur s'est produite", "Le bulletin a deja ete payé pour ce mois");
    }else{
    this.rows=[]
    let id=Number(this.route.snapshot.paramMap.get('month'))
    let year=new Date().getFullYear();
    this.database.getCalculVariablebyMonth(id,year,11,this.currentUser.id).subscribe((res)=>{
      this.rows=res;
    },(error)=>{

    }
    );}
  }
  calculRetenue(){
    let id=Number(this.route.snapshot.paramMap.get('month'))
  }
  detail(content: any, row: any) {
    this.itemForm.patchValue({
      'total_net': row.total_net,
      'user_id': row.user_id,
      total_impossable: row.total_impossable,
      prime_prestation: row.prime_prestation,
      total_brut: row.total_brut,
      prime_equipe: row.prime_equipe,
      retenu_total: row.retenu_total,
      prime_HS: row.prime_HS,
      cnss_retenue: row.cnss_retenue,
      suppl_transport: row.suppl_transport,

      cotisationCnss: row.cotisationCnss,
      precomptePro: row.precomptePro,
      retenu_chomage: row.retenu_chomage,
      id: row.id,
    })
    this.modalService.open(content, { size: 'lg' });
  }
  onSubmit(){
    this.database.createPaiement(this.itemForm.value).subscribe((res: any) => {
      this.toaster.success("Enregistrement avec success", 'OK');
     this.modalService.dismissAll();

    }, err => {
      console.log(err);
      this.toaster.error("Ust produite", err.message);
     // this.toaster.error(this.translateService.instant('internalServerError'), err.message);
    });
  }
}
