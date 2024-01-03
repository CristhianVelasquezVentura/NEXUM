import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {FileUploadModel} from "@app/core/ui/file-upload/models/file-upload.model";

export interface IFormMainData {
  workflow_id: FormControl<string>;
  title: FormControl<string>;
  description: FormControl<string>;
  file: FormControl<FileUploadModel>;
  attachedDocuments: FormArray<FormGroup>;
}

export interface IMainData {
  workflow_id: string;
  title: string;
  description: string;
  file: FileUploadModel;
  attachedDocuments: AttachedDocuments[];
}

export interface AttachedDocuments {
  annexe: string
  file: FileUploadModel
}
