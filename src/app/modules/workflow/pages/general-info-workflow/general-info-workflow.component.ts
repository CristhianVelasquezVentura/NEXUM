import { Component, OnInit } from '@angular/core';
import { FormDataWorkflowService } from '../../services/form-data-workflow.service';
import { DocInfoStep1 } from '@app/core/models/signature.model';
import { Annexes, DtoWorkflow } from '../../models/steps';
import { FormBuilder, FormGroup } from '@angular/forms';
import { codeCountries, fontText, languages } from '@app/core/utils/data/constant';
import { ToastService } from 'ecapture-ng-ui';
import { Router } from '@angular/router';
import { Renderer2, ElementRef } from '@angular/core';
@Component({
  selector: 'app-general-info-workflow',
  templateUrl: './general-info-workflow.component.html',
  styleUrls: ['./general-info-workflow.component.scss'],
})
export class GeneralInfoWorkflowComponent implements OnInit {
  public readonly languages = languages;
  public readonly codeCountries = codeCountries;
   public readonly fontText = fontText;

  public showBasicData: boolean = true;
  public showAddRequest: boolean = false;
  public generalInfoForm:FormGroup;
  public annexesForm:FormGroup;
  public annexes: Annexes[] = [];
  public logo:FileList= new DataTransfer().files;
  public imageURL: string = '';
  constructor(
    private _fb: FormBuilder,
    private formDataService: FormDataWorkflowService,
    private _messageService: ToastService,
    private _router: Router
  ) {
    this.generalInfoForm = _fb.group(formDataService.generalInfoFormControl);
    this.annexesForm = _fb.group(formDataService.annexesFormControl);
  }
  ngOnInit(): void {
    const generalInfoJSON = sessionStorage.getItem('generalInfo');
    if(generalInfoJSON){
      this.generalInfoForm.patchValue(JSON.parse(generalInfoJSON));
    }


    const annexesJSON = sessionStorage.getItem('generalInfo_annexes');
    if(annexesJSON){
      this.annexes = JSON.parse(annexesJSON);
    }

    const logoBase64 = sessionStorage.getItem("generalInfo_logo_base64");
    const fileName = sessionStorage.getItem("generalInfo_logo_name");

    if(logoBase64&&fileName){
      // this.imageURL = logoBase64;
      var base64Parts = logoBase64.split(",");
      var fileFormat = base64Parts[0].split(";")[0].split(":")[1];
      var fileContent = base64Parts[1];
      let container = new DataTransfer();
      const imageBlob = this.dataURItoBlob(fileContent);
      container.items.add(new File([imageBlob], fileName,  {type: fileFormat}));
      this.logo = container.files
    }

  }
  setShowBasicData(value: boolean) {
    this.showBasicData = value;
  }
  setShowAddRequest(value: boolean) {
    this.showAddRequest = value;
  }
  addAnnex(isRequired:boolean): void {
    if (!this.annexesForm.valid) {
      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente!', life: 5000})
      return;
    }
    this.annexes.push({name: this.annexesForm.value.name, isRequired});
    this.annexesForm.reset();
    this.setShowAddRequest(false);
  }
  onChangeIsRequiredAnnexe(index:number, target:any){
    this.annexes[index].isRequired =target.checked;
  }
  onChangeLogo(target:any){
    this.logo=target.files;
  }
  dataURItoBlob(dataURI:string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
 }
  nextStep(){
    console.log(this.generalInfoForm.value);

    if(!this.generalInfoForm.valid){
      console.log("Complete todos los campos correctamente");
      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente', life: 5000});
      return;
    }
    sessionStorage.setItem('generalInfo', JSON.stringify(this.generalInfoForm.value));
    sessionStorage.setItem('generalInfo_annexes', JSON.stringify(this.annexes));

   if(this.logo.length>0){
    var reader = new FileReader()
    const _router = this._router;
    const fileName = this.logo[0].name;
    reader.onload = function(base64) {
      sessionStorage.setItem("generalInfo_logo_base64", reader.result as string);
      sessionStorage.setItem("generalInfo_logo_name", fileName);
       _router.navigateByUrl("/workflow/create/sign-style");
    }
    reader.readAsDataURL(this.logo[0]);
   }else{
    this._router.navigateByUrl("/workflow/create/sign-style");
   }

  }
}
