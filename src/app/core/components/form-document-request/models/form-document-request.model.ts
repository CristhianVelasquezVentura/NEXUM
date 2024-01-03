import {FormControl} from "@angular/forms";

export interface IFormDocumentRequest {
    name: FormControl<string>;
    required: FormControl<boolean>;
}
export interface IRequestDocument {
    name: string;
    required: boolean;
}
