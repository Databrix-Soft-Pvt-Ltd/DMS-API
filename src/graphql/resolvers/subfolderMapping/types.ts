export interface addSubfolderMapping {
    user_id: number,
    subfolder_id: number
}

export interface subfolderMapping extends addSubfolderMapping {
    id: number
}

export interface deleteSubfolderMapping extends subfolderMapping {}