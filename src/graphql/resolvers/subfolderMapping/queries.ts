import { dbConnection } from '../../../db'
import { subfolderMapping } from './types'

const queries = {
    getAllSubfolderMappings: async (_: undefined): Promise<subfolderMapping[]> => {

        const result: subfolderMapping[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC getAllSubfolderMapping', [], (err, res: any) => {
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
        return result
    },

    getSubfoldersOfUser: async (_: undefined, { user_id }: { user_id: number }): Promise<subfolderMapping[]> => {
        const result: subfolderMapping[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC getAllSubfoldersOfUser ?', [user_id], (err, res: any) => {
                if(err) {
                    reject(err)
                }
                resolve(res)
            })
        })

        return result
    }
}

export default queries