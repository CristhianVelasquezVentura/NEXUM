import {Component, OnInit} from '@angular/core';
import {FormWorkflowService} from '@app/core/forms/workflow/form-workflow.service';
import {Annexes} from '../../models/steps';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {codeCountries, fontText, languages} from '@app/core/utils/data/constant';
import {Router} from '@angular/router';
import {UiModule} from "@app/core/ui/ui.module";
import {NgForOf, NgIf} from "@angular/common";
import {ToastComponent} from "@app/public/toast/toast.component";
import {ToastService} from "@app/public/services/toast/toast.service";
import {WorkflowBasicDataFormComponent, WorkflowBrandingFormComponent} from "@app/modules/workflow/components";

@Component({
  selector: 'app-general-info-workflow',
  templateUrl: './general-info-workflow.component.html',
  styleUrls: ['./general-info-workflow.component.scss'],
  standalone: true,
  imports: [
    UiModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    ToastComponent,
    WorkflowBasicDataFormComponent,
    WorkflowBrandingFormComponent
  ],
  providers: [ToastService],
})
export class GeneralInfoWorkflowComponent implements OnInit {

  public readonly languages = languages;
  public readonly codeCountries = codeCountries;
  public readonly fontText = fontText;

  public showBasicData: boolean = true;
  public annexes: Annexes[] = [];

  constructor(
    private _formService: FormWorkflowService,
    private _fb: FormBuilder,
    private _messageService: ToastService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    const annexesJSON = sessionStorage.getItem('generalInfo_annexes');
    if (annexesJSON) {
      this.annexes = JSON.parse(annexesJSON);
    }
  }

  setShowBasicData(value: boolean) {
    this.showBasicData = value;
  }

  public async nextStep() {
    console.log(this._formService.generalInfoForm)

    if (this._formService.generalInfoForm.invalid) {
      this._formService.generalInfoForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente de datos básicos',
        life: 5000
      });
      this.setShowBasicData(true)
      return;
    }
    if (this._formService.brandingForm.invalid) {
      this._formService.brandingForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente de branding',
        life: 5000
      });
      this.setShowBasicData(false)
      return;
    }

    sessionStorage.setItem('generalInfo', JSON.stringify({
      ...this._formService.generalInfoForm.value,
      attached_document: this._formService.attachedDocuments
    }));
    sessionStorage.setItem('branding', JSON.stringify(this._formService.brandingForm.value));

    await this._router.navigateByUrl("/workflow/create/sign-style")

  }
}
