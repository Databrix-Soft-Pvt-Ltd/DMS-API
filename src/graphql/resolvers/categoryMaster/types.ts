export interface addCategory {
  name: string;
  description: number;
  isActive: boolean;
  isDeleted: boolean;
}

export interface editCategory extends addCategory {
  id: number;
  isActive: boolean;
}

export interface AllCategoryParam {
  categoryId: number;
  isActive: boolean;
  page: number;
  size: number;
  searchColumns: string;
  searchParam: string;
  orderAsc: string;
  orderDesc: string;
}

export interface GetAllCategorys {
  allCategorys: AllCategorysWithTotalCount[];
  page: Page;
}

export interface AllCategorys {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdDate: string;
}

export interface AllCategorysWithTotalCount extends AllCategorys{
  totalCount: number;
}

export interface Page {
  page: number | null;
  size: number | null;
  totalCount: number | null;
}