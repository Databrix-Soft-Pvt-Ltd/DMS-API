export interface addSubFolderMapping {
    userId: number,
    subFolderIds: string,
    createdBy: number,
}

export interface subFolderMapping {
    id: number
    userId: number
    subFolderId: number,
    createdBy: number,
    createdDate: string
}

export interface deleteSubFolderMapping extends subFolderMapping {}