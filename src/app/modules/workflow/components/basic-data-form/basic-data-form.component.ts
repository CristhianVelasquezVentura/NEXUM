import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {codeCountries, fontText, languages, time} from "@app/core/utils/data/constant";
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {Annexes, IRoleSigner} from "@app/modules/workflow/models/steps";
import {ToastService} from "@app/public/services/toast/toast.service";
import {ToastComponent} from "@app/public/toast/toast.component";
import {getFormControlError} from "@app/public/control-error/utils/functions-form";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {IFormBasicDataValues, IValuesStep1} from "@app/core/models/workflow/workflow.model";
import {UiModule} from "@app/core/ui/ui.module";
import {BlockUiComponent} from "@app/core/ui/block-ui/block-ui.component";
import {RoleSignerFormComponent} from "@app/modules/workflow/components/role-signer-form/role-signer-form.component";

@Component({
  selector: 'workflow-basic-data-form',
  templateUrl: './basic-data-form.component.html',
  styleUrls: ['./basic-data-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent, NgIf, NgForOf, UiModule, BlockUiComponent, RoleSignerFormComponent],
  providers: [ToastService]
})
export class BasicDataFormComponent implements OnInit {
  public generalInfoForm: FormGroup;
  public annexesForm: FormGroup;
  public roleForm: FormGroup;
  public annexes: Annexes[] = [];
  public rolesSigner: IRoleSigner[] = [];
  public showModalAnnexe: boolean = false;
  public showModalRole: boolean = false;

  protected readonly fontText = fontText;


  protected readonly codeCountries = codeCountries;
  protected readonly languages = languages;
  public readonly timeData = time;

  constructor(
    private _formService: FormWorkflowService,
    private _messageService: ToastService,
    private _sessionStorageService: SessionStorageService,
  ) {
    this.generalInfoForm = this._formService.generalInfoForm;
    this.annexesForm = this._formService.annexesForm;
    this.roleForm = this._formService.roleForm;
  }

  ngOnInit() {

    const workflowCreateStep1 = this._sessionStorageService.getItem<IValuesStep1>('workflow-create-step-1')
    if (workflowCreateStep1?.formBasic) this.mapValuesForm(workflowCreateStep1.formBasic)
  }

  private mapValuesForm(generalInfoFormValues: IFormBasicDataValues) {

    this.generalInfoForm.patchValue(generalInfoFormValues);
    this.annexes = generalInfoFormValues.attached_document;
    this.rolesSigner = generalInfoFormValues.roleSigners;
  }

  public isErrorControl(formControl: AbstractControl) {
    return formControl.invalid && formControl.touched
  }

  public getError(formControl: AbstractControl) {
    return getFormControlError(formControl)
  }

  public setShowAddRequest(value: boolean) {
    this.showModalAnnexe = value;
  }

  public cancelFormAnnexe() {
    this.showModalAnnexe = false;
    this.annexesForm.reset()
  }

  public onChangeIsRequiredAnnexe(index: number, target: any) {
    this.annexes[index].isRequired = target.checked;
    this._formService.attachedDocuments[index].isRequired = target.checked;
  }

  public deleteAnnexe(annexeName: string){
    this.annexes = this.annexes.filter(annexe => annexe.name !== annexeName)
    this._formService.attachedDocuments = this._formService.attachedDocuments.filter(annexe => annexe.name !== annexeName)
  }

  public addAnnexe(): void {
    if (this.annexesForm.invalid) {
      this.annexesForm.markAllAsTouched()
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente del Anexo!',
        life: 5000
      })
      return;
    }

    this.annexes.push(this.annexesForm.value);
    this._formService.attachedDocuments.push(this.annexesForm.value)
    this.annexesForm.reset();

    this.setShowAddRequest(false);
  }

  public addRole(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched()
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente del Rol!',
        life: 5000
      })
      return;
    }

    this.rolesSigner.push(this.roleForm.value);
    this._formService.roleSigners.push(this.roleForm.value)
    this.roleForm.reset();

    this.showModalRole = false;
  }

  public cancelFormRole() {
    this.showModalRole = false;
    this.roleForm.reset()
  }

  public deleteRole(roleName: string){
    this.rolesSigner = this.rolesSigner.filter(role => role.name !== roleName)
    this._formService.roleSigners = this._formService.roleSigners.filter(role => role.name !== roleName)
  }
}
