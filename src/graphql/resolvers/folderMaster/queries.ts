import { dbConnection } from "../../../db"
import { folderMaster, folderMasterWithCabinet } from "./types"

const queries = {
    getFolder: async (_: undefined, { id }: { id: number }): Promise<folderMaster[]> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetFolderMaster ?', [id], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows)
            })
        })

        return result
    },
    getFoldersInCabinet: async (_: undefined, { cabinet_id }: { cabinet_id: number }): Promise<folderMaster[]> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetFoldersInCabinet ?', [cabinet_id], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows)
            })
        })

        return result
    },

    getFolderWithCabinet: async (_: undefined, { id }: { id: number }): Promise<folderMasterWithCabinet[]> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetFolderMasterWithCabinet ?', [id], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows)
            })
        })

        return result
    }
}

export default queries