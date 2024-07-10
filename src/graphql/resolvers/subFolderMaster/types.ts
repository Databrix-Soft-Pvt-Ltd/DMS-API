export interface addSubFolderMaster {
    subFolder: string,
    folderId: number
}

export interface editSubFolderMaster extends addSubFolderMaster {
    id: number
}

export interface subFolderMaster {
    id: number
    subFolder: string
    folderId: number
    createdBy: number
    createdDate: string
    isActive: boolean
}

export interface subFolderMasterWithFolderAndCabinet extends subFolderMaster {
    folder: string
    cabinetId: number
    cabinet: string
}

export interface deleteSubFolderMaster {
    id: number
}

export interface AllSubFolderParam {
    subFolderId: number;
    isActive: boolean;
    page: number;
    size: number;
    searchColumns: string;
    searchParam: string;
    orderAsc: string;
    orderDesc: string;
  }
  
  export interface GetAllSubFolders {
    allSubFolder: AllSubFolders[];
    page: Page;
  }
  
  export interface AllSubFolders {
    id: number;
    subFolder: String;
    folderId: number;
    folder: string;
    cabinetId: number;
    cabinet: string;
    isActive: boolean;
    createdBy: string;
    createdDate: string;
    totalCount: number;
  }
  
  export interface Page {
    page: number | null;
    size: number | null;
    totalCount: number | null;
  }
  