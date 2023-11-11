import {Component, OnInit} from '@angular/core';
import {codeCountries, languages} from '@app/core/utils/data/constant';
import {FormWorkflowService} from '@app/core/forms/workflow/form-workflow.service';
import {Router, RouterLink} from '@angular/router';
import {UiModule} from "@app/core/ui/ui.module";
import {NgForOf, NgIf} from "@angular/common";
import {
  NotifySignersSmsFormComponent
} from "@app/modules/workflow/components/notify-signers-sms-form/notify-signers-sms-form.component";
import {
  NotifySignersEmailFormComponent
} from "@app/modules/workflow/components/notify-signers-email-form/notify-signers-email-form.component";
import {ToastComponent} from "@app/public/toast/toast.component";
import {ToastService} from "@app/public/services/toast/toast.service";
import {IValuesStep3} from "@app/core/models/workflow/workflow.model";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";

@Component({
  selector: 'app-notify-signers',
  templateUrl: './notify-signers.component.html',
  styleUrls: ['./notify-signers.component.scss'],
  imports: [
    UiModule,
    NgIf,
    NgForOf,
    RouterLink,
    NotifySignersSmsFormComponent,
    NotifySignersEmailFormComponent,
    ToastComponent
  ],
  providers: [ToastService],
  standalone: true
})
export class NotifySignersComponent implements OnInit {
  codeCountries = codeCountries;
  languages = languages;
  showEmailOption: boolean = false;
  activeEmail: boolean = true;
  activeSMS: boolean = true;

  constructor(
    private _formService: FormWorkflowService,
    private _messageService: ToastService,
    private _router: Router,
    private _sessionStorageService: SessionStorageService,
  ) {
  }

  ngOnInit(): void {
  }

  setShowEmailOption(value: boolean) {
    this.showEmailOption = value;
  }

  public nextStep() {

    if (this._formService.notifySignersEmailForm.disabled && this._formService.notifySignersSMSForm.disabled) {
      this._messageService.add({
        type: 'warning',
        message: 'Debe habilitar almenos una opción de notificación!',
        life: 5000
      });
      return;
    }

    if (this._formService.notifySignersSMSForm.invalid) {
      this._formService.notifySignersSMSForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente de la notificación por sms',
        life: 5000
      });
      this.setShowEmailOption(false)
      return;
    }

    if (this._formService.notifySignersEmailForm.invalid) {
      this._formService.notifySignersEmailForm.markAllAsTouched();
      this._messageService.add({
        type: 'warning',
        message: 'Complete todos los campos correctamente de la notificación por email',
        life: 5000
      });
      this.setShowEmailOption(true)
      return;
    }

    const valuesStep: unknown = {
      formSignerNotifySMS: this._formService.notifySignersSMSForm.value,
      formSignerNotifyEMAIL: this._formService.notifySignersEmailForm.value,
    }

    this._sessionStorageService.setItem(
      'workflow-create-step-3', valuesStep as IValuesStep3
    )

    this._router.navigateByUrl('/workflow/create/otp-config');
  }
}
