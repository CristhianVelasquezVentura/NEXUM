import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeQueryDocsComponent } from './pages/type-query-docs/type-query-docs.component';
import { IntroQueryDocsComponent } from './pages/intro-query-docs/intro-query-docs.component';
import { DashboardQueryDocsComponent } from './pages/dashboard-query-docs/dashboard-query-docs.component';
import { ListWorkflowsQueryDocsComponent } from './pages/list-workflows-query-docs/list-workflows-query-docs.component';
import { TreeViewQueryDocsComponent } from './pages/tree-view-query-docs/tree-view-query-docs.component';
import { CommentsQueryDocsComponent } from './pages/comments-query-docs/comments-query-docs.component';
import { ViewDocQueryDocsComponent } from './pages/view-doc-query-docs/view-doc-query-docs.component';
import { DetailDocQueryDocsComponent } from './pages/detail-doc-query-docs/detail-doc-query-docs.component';
import { StatusSignDocQueryDocsComponent } from './pages/status-sign-doc-query-docs/status-sign-doc-query-docs.component';
import { QueryDocsRoutingModule } from './query-docs-routing.module';
import {UiModule} from "@app/core/ui/ui.module";



@NgModule({
  declarations: [
    TypeQueryDocsComponent,
    IntroQueryDocsComponent,
    DashboardQueryDocsComponent,
    ListWorkflowsQueryDocsComponent,
    TreeViewQueryDocsComponent,
    CommentsQueryDocsComponent,
    ViewDocQueryDocsComponent,
    DetailDocQueryDocsComponent,
    StatusSignDocQueryDocsComponent
  ],
  imports: [
    CommonModule,
    QueryDocsRoutingModule,
    UiModule
  ]
})
export class QueryDocsModule { }
