import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvantageComponent } from './avantage/avantage.component';
import { DepartementComponent } from './departement/departement.component';
import { FonctionComponent } from './fonction/fonction.component';
import { HeureSupplComponent } from './heure-suppl/heure-suppl.component';
import { MyPlaningComponent } from './my-planing/my-planing.component';
import { PaiementMakeComponent } from './paiement-make/paiement-make.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { PlaningListComponent } from './planing-list/planing-list.component';
import { PlaningComponent } from './planing/planing.component';
import { PresenceComponent } from './presence/presence.component';
import { ProfilComponent } from './profil/profil.component';
import { TypePlaningComponent } from './type-planing/type-planing.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'my-profil',
    component: ProfilComponent,
    data: {
      title: 'Mon profil'
    }
  },
  {
    path: 'my-planing',
    component: MyPlaningComponent,
    data: {
      title: 'Mon planing'
    }
  },
  {
    path: 'personnel',
    component: PersonnelComponent,
    data: {
      title: 'Personnels'
    }
  },
  {
    path: 'heuresuppl',
    component: HeureSupplComponent,
    data: {
      title: 'heure suppl'
    }
  },
  {
    path: 'presence',
    component: PresenceComponent,
    data: {
      title: 'presences'
    }
  },
  {
    path: 'planing',
    component: PlaningComponent,
    data: {
      title: 'Planings'
    }
  },
  {
    path: 'planing-list',
    component: PlaningListComponent,
    data: {
      title: 'Planings listes'
    }
  },
  {
    path: 'paiement-make/:month',
    component: PaiementMakeComponent,
    data: {
      title: 'Paiements'
    }
  },
  {
    path: 'paiement',
    component: PaiementComponent,
    data: {
      title: 'Paiements'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users'
    }
  },
  {
    path: 'departements',
    component: DepartementComponent,
    data: {
      title: 'Departements'
    }
  },
  {
    path: 'type-planing',
    component: TypePlaningComponent,
    data: {
      title: 'Type planing'
    }
  },
  {
    path: 'avantages',
    component: AvantageComponent,
    data: {
      title: 'Avantages'
    }
  },
  {
    path: 'fonctions',
    component: FonctionComponent,
    data: {
      title: 'Fonctions'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
