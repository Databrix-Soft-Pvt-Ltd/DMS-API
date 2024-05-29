export interface addCabinetMaster {
  cabinet: string;
}

export interface editCabinetMaster extends addCabinetMaster {
  id: number;
}

export interface cabinetMaster extends editCabinetMaster {
  isActive: boolean;
  createdBy: string;
  createdDate: string;
}

export interface deleteCabinetMaster {
  id: number;
}

export interface AllCabinetParam {
  cabinetId: number;
  isActive: boolean;
  page: number;
  size: number;
  searchColumns: string;
  searchParam: string;
  orderAsc: string;
  orderDesc: string;
}

export interface GetAllCabinets {
  allCabinet: AllCabinets[];
  page: Page;
}

export interface AllCabinets {
  id: number;
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
