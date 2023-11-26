import {FormControl} from "@angular/forms";

export interface IFormBasicData {
    workflow: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
}

export interface IFormBasicDataValues {
    workflow: string;
    title: string;
    description: string;
}
