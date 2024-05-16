import { dbConnection } from "../../../db"
import { addSubFolderMapping, deleteSubFolderMapping } from "./types"

const mutations = {
    addSubFolderMapping: async (_: undefined, { addSubFolderMapping }: { addSubFolderMapping: addSubFolderMapping } ) : Promise<string> => {

        const { user_id, subfolder_id } = addSubFolderMapping
        console.log('add sub folder mapping', addSubFolderMapping)

        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddSubFolderMapping ?, ?, ?', [user_id, subfolder_id, ''], (err: any, res: any) => {
                if(err){
                    reject(err)
                }
                console.log(res)
                try{
                    resolve(res[0]?.outputMessage)
                } catch {
                    reject('cannot resolve')
                }
            })
        })
        return result
    },

    deleteSubFolderMapping: async (_:undefined, { deleteSubfolderMapping }: { deleteSubfolderMapping: deleteSubFolderMapping }): Promise<string> => {

        const { id, user_id, subfolder_id } = deleteSubfolderMapping

        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteSubFolderMapping ?, ?, ?, ?', [id, user_id, subfolder_id, ''], (err: any, res: any) => {
                if(err){
                    reject(err)
                }
                else{
                    console.log(res)
                    resolve(res[0]?.outputMessage)
                }
            })
        })
        return result
    }
}

export default mutations