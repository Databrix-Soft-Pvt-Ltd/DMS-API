import { createFolderMaster, editFolderMaster } from "./types"
import { dbConnection } from "../../../db"

const mutations = {
    addFolder: async (_: undefined, { add_folder }: { add_folder: createFolderMaster } ): Promise<string> => {

        const { Folder, Cabinet_id } = add_folder

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddFolderMaster ?, ?, ?;', [Folder, Cabinet_id, ''], (err, rows: any) => {
                if(err) reject(err)
                
                console.log('Add Folder Rows', rows)
                resolve(rows[0].outputMessage)
            })
        })

        return result
    },

    editFolder: async (_: undefined, { edit_folder }: { edit_folder: editFolderMaster }): Promise<string> => {

        const { id, Folder, Cabinet_id } = edit_folder

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditFolderMaster ?, ?, ?, ?;', [id, Folder, Cabinet_id, ''], (err, rows: any) => {
                if(err) reject(err)

                console.log(rows)
                resolve(rows[0].outputMessage)
            })
        })

        return result
    },

    deleteFolder: async(_: undefined, { id } : { id: number }): Promise<string> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteFolderMaster ?, ?;', [id, ''], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows[0].outputMessage)
            })
        })

        return result
    }
}

export default mutations