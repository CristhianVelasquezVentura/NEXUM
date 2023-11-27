import {Annexes} from "@app/modules/workflow/models/steps";
import {FormGroup} from "@angular/forms";
import {RequestedDocument} from "@app/core/models/workflow/workflow.model";

export interface DocInfoStep1 {
  title: string;
  description: string;
  workflow: any;
  docMain: any;
  attachedDocuments: FileEvent[],
  annexes: Annexes[],
  requestedDocument: RequestedDocument[]
}

export interface DropdownModelWF {
  value: string;
  label: string;
}

export interface SectionData {
  id: number;
  data: any;
  show?: boolean;
}

export interface Signer {
  email : string;
  names : string;
  lastnames : string;
  role : string;
  id_identification_type : string;
  id_identification_number : string;
  code_phone : string;
  cellphone : string;
  access_code: string;
  isDisableCode: boolean;
  status?: boolean;
}

export interface DocumentNewDoc{
  base64: string;
  position: number;
}

export interface SignatureModel {
  email: string;
  names: string;
  last_name: string;
  contractor_role: string;
  identification?: Identification;
  phone_number: Phone;
  access_code?: number;
  requested_annexes: RequestedAnnexes;
}

export interface Identification {
  type: string;
  number: number;
}

export interface Phone {
  code: string;
  number: number;
}

export interface RequestedAnnexes {
  citizenship_card: boolean;
  military_card: boolean;
}

export interface FileEvent {
  name: string;
  value: string;
  extension: string;
}

export interface SignerModel {
  id: string;
  access_code: string;
  cellphone: string;
  code_phone: string;
  email: string;
  id_identification_number: string;
  id_identification_type: string;
  isDisableCode: boolean;
  lastnames: string;
  names: string;
  role: number;
  status?: boolean
}

export interface SignerPad {
  page: number;
  signer: SignerModel;
  id: string;
}


export interface SignersPad {
  page: number;
  userId: string;
  pads: SignerModel[];
}

export interface firmCoordsSigner {
  page: number;
  y: number;
  x: number;
  width: number;
  height: number;
  id: string;
  id_signer: string;
  rotation: number;
}

export interface SignerToFirmModel {
  signer: SignerModel;
  status: boolean;
}

export interface SectionFirmsCoords {
  section: number;
  firmCoords: firmCoordsSigner[];
}


export interface RotatePad {
  page: number;
  id: string;
  rotation: number;
}

export interface SignerSource {
  status: boolean,
  valid: boolean,
  signer: FormGroup,
}

export interface sectionSource {
  status: boolean,
  valid: boolean,
  initial: boolean,
  arraySigner: SignerSource[],
}
