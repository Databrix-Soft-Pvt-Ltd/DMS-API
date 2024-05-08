import { dbConnection } from "../../../db"
import { addSubfolderMapping, deleteSubfolderMapping } from "./types"

const mutations = {
    addSubfolderMapping: async (_: undefined, { newSubfolderMap }: { newSubfolderMap: addSubfolderMapping } ) : Promise<string> => {

        const { user_id, subfolder_id } = newSubfolderMap

        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC addSubfolderMapping ?, ?, ?', [user_id, subfolder_id, ''], (err: any, res: any) => {
                if(err){
                    reject(err)
                }
                resolve(res[0].outputMessage)
            })
        })
        return result
    },

    deleteSubfolderMapping: async (_:undefined, { deleteSubfolderMapping }: { deleteSubfolderMapping: deleteSubfolderMapping }): Promise<string> => {

        const { id, user_id, subfolder_id } = deleteSubfolderMapping

        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC deleteSubfolderMapping ?, ?, ?, ?', [id, user_id, subfolder_id, ''], (err: any, res: any) => {
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