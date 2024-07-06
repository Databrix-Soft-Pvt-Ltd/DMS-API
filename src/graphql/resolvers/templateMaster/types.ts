export interface addTemplate {
  name: string;
  pageId: number;
  description: number;
  isActive: boolean;
  isDeleted: boolean;
}

export interface editTemplate extends addTemplate {
  id: number;
  isActive: boolean;
}

export interface AllTemplateParam {
  templateId: number;
  isActive: boolean;
  page: number;
  size: number;
  searchColumns: string;
  searchParam: string;
  orderAsc: string;
  orderDesc: string;
}

export interface GetAllTemplates {
  allTemplate: AllTemplatesWithTotalCount[];
  page: Page;
}

export interface AllTemplates {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdDate: string;
}

export interface AllTemplatesWithTotalCount extends AllTemplates{
  totalCount: number;
}

export interface Page {
  page: number | null;
  size: number | null;
  totalCount: number | null;
}

export interface RequiredFields {
  id: number;
  pageId: number;
  field: string;
}

export interface RequiredFieldsInput {
  pageId: number;
  requiredFields: string;
}