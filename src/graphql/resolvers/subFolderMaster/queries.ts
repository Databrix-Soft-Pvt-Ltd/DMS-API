import { dbConnection } from "../../../db"
import { subFolderMaster, subFolderMasterWithFolderAndCabinet } from "./types"

const queries = {
    getSubFolder: async (_: undefined, { id }: { id: number }): Promise<subFolderMaster[]> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetSubFolderMaster ?', [id], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows)
            })
        })

        return result
    },

    getSubFolderWithFolderAndCabinet: async (_: undefined, { id }: { id: number }): Promise<subFolderMasterWithFolderAndCabinet[]> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetSubFolderMasterWithFolderAndCabinet ?', [id], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows)
            })
        })

        return result
    }
}

export default queries