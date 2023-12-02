import {IMainData} from "@app/core/forms/send-document";

export interface IValuesStep1 {
    formMainData: IMainData;
}

export interface IDocumentFiles {
    encoding: string;
    file_id: number;
    file_name: string;
}

export interface AttachedDocumentData {
    doctype_name: string;
    required: boolean;
    upload: boolean;
    data: IDocumentFiles | undefined;
}
