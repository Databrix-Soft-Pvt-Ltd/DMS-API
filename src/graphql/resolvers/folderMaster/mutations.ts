import { addFolderMaster, editFolderMaster } from "./types"
import { dbConnection } from "../../../db"

const mutations = {
    addFolder: async (_: undefined, { add_folder_master }: { add_folder_master: addFolderMaster } ): Promise<string> => {

        const { folder, cabinet_id } = add_folder_master

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddFolderMaster ?, ?, ?;', [folder, cabinet_id, ''], (err, rows: any) => {
                if(err) reject(err)
                
                // console.log('Add Folder Rows', rows)
                resolve(rows[0].outputMessage)
            })
        })

        return result
    },

    editFolder: async (_: undefined, { edit_folder_master }: { edit_folder_master: editFolderMaster }): Promise<string> => {

        const { id, folder } = edit_folder_master

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditFolderMaster ?, ?, ?;', [id, folder, ''], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows[0]?.outputMessage)
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