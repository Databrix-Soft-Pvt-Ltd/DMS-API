export type formDetails = {
  databaseName: string;
  fieldName: string;
  dataType: string;
  maxLength: number;
};

export type formMaster = {
  templateId: number;
  formDetails: formDetails[];
};

export type editFormDetails = {
  id: number;
  databaseName: string;
  fieldName: string;
  dataType: string;
  maxLength: number;
}

export type editFormMaster = {
  templateId: number;
  formDetails: editFormDetails[];
}

export type getAllForms = {
  databaseName: string;
  fieldName: string;
  dataType: string;
  maxLength: number;
};

export interface AllFormParam {
  templateId: number;
  isActive: boolean;
  page: number;
  size: number;
  searchColumns: string;
  searchParam: string;
  orderAsc: string;
  orderDesc: string;
}

export interface GetAllForms {
  allForms: AllForms[];
  page: Page;
}

export interface AllForms {
  id: number;
  databaseName: string;
  fieldName: string;
  dataType: string;
  maxLength: string;
  templateId: number;
  templateName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdDate: string;
  totalCount: number;
}

export interface Page {
  page: number | null;
  size: number | null;
  totalCount: number | null;
}
