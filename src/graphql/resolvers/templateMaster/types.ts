export interface add_template_master {
    name: string;
    page_id: number;
    is_active: boolean;
    is_deleted: boolean;
}

export interface edit_template_master extends add_template_master {
    id: number;
}

export interface get_all_templates extends edit_template_master {
    created_by: number;
    created_date: string;
}