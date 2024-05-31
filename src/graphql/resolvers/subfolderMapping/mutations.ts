import { dbConnection } from "../../../db"
import { addSubFolderMapping, deleteSubFolderMapping } from "./types"

const mutations = {
    addSubFolderMapping: async (_: undefined, { addSubFolderMapping }: { addSubFolderMapping: addSubFolderMapping } ) : Promise<{ error: string | null, message: string | null }> => {

        const { userId, subFolderIds, createdBy } = addSubFolderMapping

        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddSubFolderMapping @userid = ?, @subFolderIds = ?, @createdBy = ?, @outputMessage = ?', 
                [userId, subFolderIds, createdBy, ''], (err: any, res: any) => {
                if(err){
                    reject(err)
                }
                // console.log(res)
                try{
                    resolve(res[0]?.outputMessage)
                } catch {
                    reject('cannot resolve')
                }
            })
        })
        if(result === 'Sub Folder Mapping Added Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    },

    deleteSubFolderMapping: async (_:undefined, { deleteSubfolderMapping }: { deleteSubfolderMapping: deleteSubFolderMapping }): Promise<string> => {

        const { id, userId, subFolderId } = deleteSubfolderMapping

        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteSubFolderMapping ?, ?, ?, ?', [id, userId, subFolderId, ''], (err: any, res: any) => {
                if(err){
                    reject(err)
                }
                else{
                    // console.log(res)
                    resolve(res[0]?.outputMessage)
                }
            })
        })
        return result
    }
}

export default mutations