import {FormControl} from "@angular/forms";

export interface IFormDocumentRequest {
    name: FormControl<string>;
    required: FormControl<boolean>;
}
export interface IDocumentRequest {
    name: string;
    required: boolean;
}
