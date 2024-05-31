import { dbConnection } from '../../../db'
import { subFolderMapping } from './types'

const queries = {
    getAllSubFolderMappings: async (_: undefined): Promise<subFolderMapping[]> => {

        const result: subFolderMapping[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC getAllSubFolderMapping', [], (err, res: any) => {
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
        return result
    },

    getSubFoldersOfUser: async (_: undefined, { userId }: { userId: number }): Promise<subFolderMapping[]> => {

        const result: subFolderMapping[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetAllSubFolderOfUser ?', [userId], (err, res: any) => {
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