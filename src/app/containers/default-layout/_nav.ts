import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Mon planing',
    url: '/pages/my-planing',
    iconComponent: { name: 'cil-JustifyCenter' },
  },
  {
    name: 'Comptabilite',
    title: true
  },
  {
    name: 'Paiements',
    url: '/pages/paiement',
    iconComponent: { name: 'cil-Dollar' },
  },
  {
    name: 'Operations',
    title: true
  },
  {
    name: 'Fiche presence',
    url: '/pages/presence',
    iconComponent: { name: 'cil-Speedometer' },
  },
  {
    name: 'Heure suppl',
    url: '/pages/heuresuppl',
    iconComponent: { name: 'cil-ReportSlash' },
  },
  // {
  //   name: 'Planings List',
  //   url: '/pages/planing-list',
  //   iconComponent: { name: 'cil-ListNumbered' },
  // },
  {
    name: 'Planings',
    url: '/pages/planing',
    iconComponent: { name: 'cil-file' },
  },
  {
    name: 'Parametre',
    title: true
  },
  {
    name: 'Users',
    url: '/pages/users',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Departement',
    url: '/pages/departements',
    iconComponent: { name: 'cil-Task' },
  },
  {
    name: 'Type planing',
    url: '/pages/type-planing',
    iconComponent: { name: 'cil-Bookmark' },
  },
  {
    name: 'Fonctions',
    url: '/pages/fonctions',
    iconComponent: { name: 'cil-Layers' },
  },
  {
    name: 'Avantage',
    url: '/pages/avantages',
    iconComponent: { name: 'cil-Options' },
  },
];
