import {FileUploadModel} from "@app/core/ui/file-upload/models/file-upload.model";

export interface RequestedDocument {
    id: number;
    id_workflow: number;
    doctype_name: string;
    required: boolean;
    id_user: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
}

export interface AttachedDocument {
    id: number;
    id_workflow: number;
    doctype_name: string;
    required: boolean;
    id_user: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
}
