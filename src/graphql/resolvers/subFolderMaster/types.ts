export interface addSubFolderMaster {
    sub_folder: string,
    folder_id: number
}

export interface editSubFolderMaster extends addSubFolderMaster {
    id: number
}

export interface subFolderMaster {
    id: number
    sub_folder: string
    folder_id: number
    created_by: number
    created_date: String
}

export interface subFolderMasterWithFolderAndCabinet extends subFolderMaster {
    folder: string
    cabinet_id: number
    cabinet: string
}

export interface deleteSubFolderMaster {
    id: number
}