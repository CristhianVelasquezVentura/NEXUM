import {IMainData} from "@app/core/forms/send-document";
import {AttachedDocument, RequestedDocument} from "@app/core/models/workflow/workflow.model";

export interface IValuesStep1 {
    formMainData: IMainData;
}

export interface IDocumentFiles {
    encoding: string;
    file_id: number;
    file_name: string;
}

export interface AttachedDocumentData extends AttachedDocument {
    upload: boolean;
    data: IDocumentFiles | undefined;
}

export interface RequestedDocumentData extends RequestedDocument {
    upload: boolean;
    data: IDocumentFiles | undefined;
}
