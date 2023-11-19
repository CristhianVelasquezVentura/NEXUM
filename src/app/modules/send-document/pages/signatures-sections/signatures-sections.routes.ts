import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./signatures-sections.component').then(m => m.SignaturesSectionsComponent)
  },
  {
    path: 'signatures',
    loadComponent: () => import('./pages/signatures-group/signatures-group.component').then(m => m.SignaturesGroupComponent)
  },
  {
    path: 'sections-sign',
    loadComponent: () => import('./pages/sections-sign-group/sections-sign-group.component').then(m => m.SectionsSignGroupComponent)
  },
  {
    path: 'signatures/form',
    loadComponent: () => import('./pages/signature-form/signature-form.component').then(m => m.SignatureFormComponent)
  },
  {
    path: 'sections-sign/form',
    loadComponent: () => import('./pages/section-sign-form/section-sign-form.component').then(m => m.SectionSignFormComponent)
  },
];
