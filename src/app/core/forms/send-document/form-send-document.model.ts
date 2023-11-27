import {FormControl} from "@angular/forms";

export interface IFormMainData {
    workflow_id: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
}

export interface IMainData {
    workflow_id: string;
    title: string;
    description: string;
}
