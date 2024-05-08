export interface add_role {
    name: string;
    description: string;
    is_active: boolean;
    is_deleted: boolean;
}

export interface edit_role extends add_role {
    id: number;
}

export interface get_roles extends edit_role {
    created_by: number;
    created_date: string;
}