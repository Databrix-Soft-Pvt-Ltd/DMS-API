export interface addCabinetMaster {
    cabinet: string
}

export interface editCabinetMaster extends addCabinetMaster {
    id: number
}

export interface cabinetMaster extends editCabinetMaster {
    is_active: boolean,
    created_by: string,
    created_date: string,
}

export interface deleteCabinetMaster {
    id: number
}