export interface addRole {
    roleName: string;
    description: string;
    createdBy: number;
}

export interface editRole extends addRole {
    id: number;
    isActive : Boolean;
}

export interface GetAllRoles {
    allRoles: AllRoles[];
    page: Page;
  }
  
  export  interface AllRoles {
    id: number;
    roleName: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    createdDate: string;
    totalCount: number;
  }
  
  export  interface Page {
    page: number | null;
    size: number | null;
    totalCount: number  | null;
  }

export interface AllRolesParam{
    roleId: number;
    isActive: boolean;
    page: number;
    size: number;
    searchColumns: string;
    searchParam: string;
    orderAsc: string;
    orderDesc: string;

}