export interface Document {
  id_workflow: number;
  title: string;
  description: string;
  document_status: DocumentStatus;
  files: FileDocument[];
  sections: SectionDocument[];
}

export interface DocumentStatus {
  id_document: number;
  id_queue: number;
}

export interface FileDocument {
  id_document: number;
  encoding: string;
  original_file: string;
  hash: string;
  file_size: number;
  path: string;
  file_name: string;
  number_page: number;
  bucket: string;
  id_file: number;
}

export interface SectionDocument {
  id_document: number;
  level: number;
  min_signatures: number;
  signers: SignerSection[];
}

export interface SignerSection {
  id_section: number;
  id_user_related: number;
  email: string;
  names: string;
  lastnames: string;
  role: string;
  cellphone: string;
  id_identification_type: number;
  identification_number: string;
  access_code: string;
  signature_position: SignaturePosition[]
}

export interface SignaturePosition {
  id_signer: number;
  page: number;
  x: number;
  y: number;
  height: number;
  width: number;
  rotation: number;
}

export interface ResponseCreateDocument {
  error: boolean;
  data: any;
  code: number;
  type: string;
  msg: string;
}

export interface ResponseDocumentsStatus {
  error: boolean;
  data: DocumentsStatus[];
  code: number;
  type: string;
  msg: string;
}

export interface DocumentsStatus {
  id: number;
  id_workflow: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export interface ResponseDocumentById {
  error: boolean;
  data: Document;
  code: number;
  type: string;
  msg: string;
}

export interface ResponseFilesByDocumentId {
  error: boolean;
  data: FileAnnexe[];
  code: number;
  type: string;
  msg: string;
}

export interface FileAnnexe {
  name_document: string;
  encoding: string;
  file_id: number;
  active: boolean;
  type: string;
}

export interface DocumentFilter {
  workflow_id: number;
  start_date: string;
  end_date: string;
  status: string[];
}

