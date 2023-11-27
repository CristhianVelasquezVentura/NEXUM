import { Component } from '@angular/core';

import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {timeOptions} from "@app/core/utils/data/constant";
import {ReminderEmailComponent, ReminderSmsComponent} from "@app/modules/workflow/components";
import {FormWorkflowService} from "@app/core/forms/workflow/form-workflow.service";
import {ToastService} from "@app/public/services/toast/toast.service";
import {Router, RouterLink} from "@angular/router";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {ToastComponent} from "@app/public/toast/toast.component";
import {IValuesStep5} from "@app/core/models/workflow/workflow-create.model";
import {HeaderNexumComponent} from "@app/core/ui";
@Component({
  selector: 'app-reminder-signers',
  templateUrl: './reminder-signers.component.html',
  styleUrls: ['./reminder-signers.component.scss'],
  imports: [
    NgIf,
    ReactiveFormsModule,
    ReminderSmsComponent,
    ReminderEmailComponent,
    ToastComponent,
    RouterLink,
    HeaderNexumComponent
  ],
  standalone: true,
  providers: [ToastService]
})
export class ReminderSignersComponent {
  public showFormSMS: boolean = true;

  constructor(
    private _formService: FormWorkflowService,
    private _messageService: ToastService,
    private _router: Router,
    private _sessionStorageService: SessionStorageService,
  ) {
  }

  public nextPage(){
    if (this._formService.reminderSMSForm.disabled && this._formService.reminderEMAILForm.disabled) {
      this._messageService.add({
        type: 'warning',
        message: 'Debe habilitar almenos una opción de recordatorio!',
        life: 5000
      });
      return;
    }

    if (this._formService.reminderSMSForm.invalid) {
      this._formService.reminderSMSForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente del recordatorio por sms',
        life: 5000
      });
      this.showFormSMS = true;
      return;
    }

    if (this._formService.reminderEMAILForm.invalid) {
      this._formService.reminderEMAILForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente del recordatorio por email',
        life: 5000
      });
      this.showFormSMS = true;
      return;
    }

    const valuesStep: unknown = {
      formReminderSMS: this._formService.reminderSMSForm.value,
      formReminderEMAIL: this._formService.reminderEMAILForm.value,
    }

    this._sessionStorageService.setItem(
      'workflow-create-step-5', valuesStep as IValuesStep5
    )

    this._router.navigateByUrl('/workflow/create/summary');
  }
}
