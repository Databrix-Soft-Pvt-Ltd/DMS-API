export interface add_role {
    role_name: string;
    description: string;
    created_by: number;
}

export interface edit_role extends add_role {
    id: number;
}

export interface get_roles extends edit_role {
    created_date: string;
    is_active: boolean;
    is_deleted: boolean;
}