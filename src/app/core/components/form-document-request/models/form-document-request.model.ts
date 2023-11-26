import {FormControl} from "@angular/forms";

export interface IFormDocumentRequest {
    name: FormControl<string>;
    isRequired: FormControl<boolean>;
}
export interface IFormDocumentRequestValue {
    name: string;
    isRequired: boolean;
}
