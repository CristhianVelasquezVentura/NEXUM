import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IntroQueryDocsComponent} from "@app/modules/query-docs/pages/intro-query-docs/intro-query-docs.component";
import { DashboardQueryDocsComponent } from "./pages/dashboard-query-docs/dashboard-query-docs.component";
import { TreeViewQueryDocsComponent } from "./pages/tree-view-query-docs/tree-view-query-docs.component";
import {TypeQueryDocsComponent} from "./pages/type-query-docs/type-query-docs.component";
import {CommentsQueryDocsComponent} from "@app/modules/query-docs/pages/comments-query-docs/comments-query-docs.component";
import {ViewDocQueryDocsComponent} from "@app/modules/query-docs/pages/view-doc-query-docs/view-doc-query-docs.component";
import { DetailDocQueryDocsComponent } from "./pages/detail-doc-query-docs/detail-doc-query-docs.component";
import {StatusSignDocQueryDocsComponent} from "@app/modules/query-docs/pages/status-sign-doc-query-docs/status-sign-doc-query-docs.component";
import {ListWorkflowsQueryDocsComponent} from "@app/modules/query-docs/pages/list-workflows-query-docs/list-workflows-query-docs.component";

const routes: Routes = [
  {
    path: '',
    component: IntroQueryDocsComponent,
  },
  {
    path: 'type',
    component: TypeQueryDocsComponent
  },
  {
    path: 'dashboard',
    component: DashboardQueryDocsComponent
  },
  {
    path: 'workflows',
    component: ListWorkflowsQueryDocsComponent
  },
  {
    path: 'tree-view',
    component: TreeViewQueryDocsComponent
  },
  {
    path: 'comments',
    component: CommentsQueryDocsComponent
  },
  {
    path: 'view-doc',
    component: ViewDocQueryDocsComponent
  },
  {
    path: 'detail-doc',
    component: DetailDocQueryDocsComponent
  },
  {
    path: 'status-sign',
    component: StatusSignDocQueryDocsComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class QueryDocsRoutingModule {
}
