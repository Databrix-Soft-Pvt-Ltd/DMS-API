import { dbConnection } from "../../../db"
import { cabinetMaster } from "./types"

const queries = {
    getCabinet: async (_: undefined, { id }: any): Promise<cabinetMaster[]> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetCabinetMaster ?', [id], (err, rows: any) => {
                if(err) reject(err)

                // console.log(rows)
                resolve(rows)
            })
        })

        return result
    }
}

export default queries