export interface addFolderMaster {
    folder: string,
    cabinet_id: number
}

export interface editFolderMaster {
    id: number
    folder: string
}

export interface folderMaster {
    id: number,
    folder: string,
    cabinet_id: number,
    created_by: string,
    created_date: string,
}

export interface deleteFolderMaster {
    id: number
}