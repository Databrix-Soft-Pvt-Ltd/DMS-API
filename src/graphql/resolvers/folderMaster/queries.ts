import { dbConnection } from "../../../db"
import { folderMaster } from "./types"

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
    }
}

export default queries