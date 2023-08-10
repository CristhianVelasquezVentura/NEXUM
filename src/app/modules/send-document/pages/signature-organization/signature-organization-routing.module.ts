import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignatureOrganizationComponent} from "@app/modules/send-document/pages/signature-organization/signature-organization.component";
import {OrderSignDocComponent} from "@app/modules/send-document/pages/signature-organization/pages/order-sign-doc/order-sign-doc.component";
import {OrderSignListComponent} from "@app/modules/send-document/pages/signature-organization/pages/order-sign-list/order-sign-list.component";

const routes: Routes = [
  {
    path: '',
    component: SignatureOrganizationComponent,
  },
  {
    path: 'list',
    component: OrderSignListComponent,
  },
  {
    path: 'doc',
    component: OrderSignDocComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class SignatureOrganizationRoutingModule {
}
