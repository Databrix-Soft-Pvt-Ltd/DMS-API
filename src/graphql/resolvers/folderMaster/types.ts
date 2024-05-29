export interface addFolderMaster {
  folder: string;
  cabinetId: number;
}

export interface editFolderMaster extends addFolderMaster {
  id: number;
}

export interface folderMaster {
  id: number;
  folder: string;
  cabinetId: number;
  createdBy: string;
  createdDate: string;
}

export interface folderMasterWithCabinet extends folderMaster {
  folder: string;
}

export interface deleteFolderMaster {
  id: number;
}

export interface AllFolderParam {
  folderId: number;
  isActive: boolean;
  page: number;
  size: number;
  searchColumns: string;
  searchParam: string;
  orderAsc: string;
  orderDesc: string;
}

export interface GetAllFolders {
  allFolder: AllFolders[];
  page: Page;
}

export interface AllFolders {
  id: number;
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
