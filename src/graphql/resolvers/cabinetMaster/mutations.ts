import { createCabinetMaster, deleteCabinetMaster, editCabinetMaster } from "./types"
import { dbConnection } from "../../../db"

const mutations = {
    addCabinet: async (_: undefined, { create_cabinet }: { create_cabinet: createCabinetMaster } ): Promise<string> => {

        const { Cabinet } = create_cabinet

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddCabinetMaster ?, ?;', [Cabinet, ''], (err, rows: any) => {
                if(err) reject(err)
                
                // console.log('Add Cabinet Rows', rows)
                resolve(rows[0].outputMessage)
            })
        })

        return result
    },

    editCabinet: async (_: undefined, { edit_cabinet }: { edit_cabinet: editCabinetMaster }): Promise<string> => {

        const { id, Cabinet } = edit_cabinet

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditCabinetMaster ?, ?, ?;', [id, Cabinet, ''], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows[0].outputMessage)
            })
        })

        return result
    },

    deleteCabinet: async(_: undefined, { id } : { id: number }): Promise<string> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteCabinetMaster ?, ?;', [id, ''], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows[0].outputMessage)
            })
        })

        return result
    }
}

export default mutations