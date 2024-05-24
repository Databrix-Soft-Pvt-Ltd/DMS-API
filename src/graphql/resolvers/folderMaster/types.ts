export interface addFolderMaster {
    folder: string,
    cabinet_id: number
}

export interface editFolderMaster extends addFolderMaster {
    id: number
}

export interface folderMaster {
    id: number,
    folder: string,
    cabinet_id: number,
    created_by: string,
    created_date: string,
}

export interface folderMasterWithCabinet extends folderMaster{
    cabinet: string
}

export interface deleteFolderMaster {
    id: number
}