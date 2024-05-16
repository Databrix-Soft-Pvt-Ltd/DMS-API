export interface addSubFolderMapping {
    user_id: number,
    subfolder_id: number
}

export interface subFolderMapping extends addSubFolderMapping {
    id: number
}

export interface deleteSubFolderMapping extends subFolderMapping {}