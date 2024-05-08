export interface createCabinetMaster {
    Cabinet: string
}

export interface editCabinetMaster extends createCabinetMaster {
    id: number
}

export interface cabinetMaster extends editCabinetMaster {
    IsActive: boolean,
    Created_By: string,
    Created_Date: string,
}

export interface deleteCabinetMaster {
    id: number
}