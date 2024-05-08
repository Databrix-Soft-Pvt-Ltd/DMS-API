export interface createFolderMaster {
    Folder: string,
    Cabinet_id: number
}

export interface editFolderMaster extends createFolderMaster {
    id: number
}

export interface folderMaster extends editFolderMaster {
    Created_By: string,
    Created_Date: string,
}

export interface deleteFolderMaster {
    id: number
}