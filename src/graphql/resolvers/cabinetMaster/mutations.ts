import { addCabinetMaster, editCabinetMaster } from "./types"
import { dbConnection } from "../../../db"

const mutations = {
    addCabinet: async (_: undefined, { add_cabinet_master }: { add_cabinet_master: addCabinetMaster } ): Promise<string> => {

        const { cabinet } = add_cabinet_master

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddCabinetMaster ?, ?;', [cabinet, ''], (err, rows: any) => {
                if(err) reject(err)
                else {
                    // console.log(rows)
                    resolve(rows[0]?.outputMessage)
                }
            })
        })
        return result
    },

    editCabinet: async (_: undefined, { edit_cabinet_master }: { edit_cabinet_master: editCabinetMaster }): Promise<string> => {

        const { id, cabinet } = edit_cabinet_master

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditCabinetMaster ?, ?, ?;', [id, cabinet, ''], (err, rows: any) => {
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