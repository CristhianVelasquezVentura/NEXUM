import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/intro-query-docs/intro-query-docs.component').then(c => c.IntroQueryDocsComponent),
  },
  {
    path: 'type',
    loadComponent: () => import('./pages/type-query-docs/type-query-docs.component').then(c => c.TypeQueryDocsComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-query-docs/dashboard-query-docs.component').then(c => c.DashboardQueryDocsComponent),
  },
  {
    path: 'workflows',
    loadComponent: () => import('./pages/list-workflows-query-docs/list-workflows-query-docs.component').then(c => c.ListWorkflowsQueryDocsComponent),
  },
  {
    path: 'tree-view',
    loadComponent: () => import('./pages/tree-view-query-docs/tree-view-query-docs.component').then(c => c.TreeViewQueryDocsComponent),
  },
  {
    path: 'comments',
    loadComponent: () => import('./pages/comments-query-docs/comments-query-docs.component').then(c => c.CommentsQueryDocsComponent),
  },
  {
    path: 'view-doc',
    loadComponent: () => import('./pages/view-doc-query-docs/view-doc-query-docs.component').then(c => c.ViewDocQueryDocsComponent),
  },
  {
    path: 'detail-doc',
    loadComponent: () => import('./pages/detail-doc-query-docs/detail-doc-query-docs.component').then(c => c.DetailDocQueryDocsComponent),
  },
  {
    path: 'status-sign',
    loadComponent: () => import('./pages/status-sign-doc-query-docs/status-sign-doc-query-docs.component').then(c => c.StatusSignDocQueryDocsComponent),
  },
];
