
export type form_details = {
    database_name: string;
    field_name: string;
    datatype: string;
    max_length: number;
}

export type formMaster = {
    template_id: number;
    form_details: form_details[];
}

export type getAllForms = {
    database_name: string;
    field_name: string;
    datatype: string;
    template_id: number;
    template_name: string;
    form_id: number;
    max_length: number;
}