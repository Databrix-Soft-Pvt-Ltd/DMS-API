
export type formDetails = {
    databaseName: string;
    fieldName: string;
    dataType: string;
    maxLength: number;
}

export type formMaster = {
    templateId: number;
    formDetails: formDetails[];
}

export type getAllForms = {
    databaseName: string;
    fieldName: string;
    dataType: string;
    maxLength: number;
}