
import { dbConnection } from "../../../db"
import { authStatus, changePasswordCredentials, loginCredentials, userInfo } from "./types"
import { compare, compareSync, hash } from 'bcrypt'
import { default as jwt } from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import * as randomstring from 'randomstring';

const mutations = {
    login: async (_: undefined, { loginCredentials }: { loginCredentials: loginCredentials }): Promise<authStatus> => {

        const authStatus: authStatus = {
            validUser: false,
            token: null,
            message: null
        }

        const { username, email_id, password } = loginCredentials

        if (!password) authStatus.message = 'Password is Required'
        else if (!username && !email_id) authStatus.message = 'Username or Email ID is Required'
        else {
            const result: loginCredentials = await new Promise((resolve, reject) => {
                if (username) {
                    dbConnection.query('select username, email_id, password from users where username=?', [username], (err, res: any) => {
                        if (err) reject(err)
                        resolve(res[0])
                    })
                } else if (email_id) {
                    dbConnection.query('select username, email_id, password from users where email_id=?', [email_id], (err, res: any) => {
                        if (err) reject(err)

                        resolve(res[0])
                    })
                }
            })

            authStatus.validUser = compareSync(password, result.password)

            if (authStatus.validUser === true) {
                authStatus.message = 'VALID_USER';
                authStatus.token = jwt.sign({
                    credentials: `${result.username}#${result.email_id}`
                }, 'secret', { expiresIn: '1h' });
                authStatus.validUser = true;
            }
        }

        return authStatus
    },

    changePassword: async (
        _: undefined,
        { changePasswordCredentials }: { changePasswordCredentials: changePasswordCredentials }
    ): Promise<string> => {
        const { username, email_id, password, newPassword } = changePasswordCredentials

        if (!password) return 'Old Password Required'
        else if (!username && !email_id) return 'Username or Email ID is Required'
        else {
            const result: changePasswordCredentials = await new Promise((resolve, reject) => {
                if (username) {
                    dbConnection.query('select password from users where username=?', [username], (err, res: any) => {
                        if (err) reject(err)

                        resolve(res[0])
                    })
                } else if (email_id) {
                    dbConnection.query('select password from users where email_id=?', [email_id], (err, res: any) => {
                        if (err) reject(err)

                        resolve(res[0])
                    })
                }
            })
            const validUser = await compare(password, result.password)

            if (validUser === true) {
                const hashedNewPassword = await hash(newPassword, Number(process.env.BCRYPT_SALT_ROUNDS))

                const returnStatement: string = await new Promise((resolve, reject) => {
                    var credential: string = '';
                    var type: string = '';
                    if(username){
                        credential=username;
                        type='username'
                    } else if(email_id){
                        credential=email_id;
                        type='email_id'
                    }

                    dbConnection.query('EXEC ChangePassword ?, ?, ?, ?', [credential, type, hashedNewPassword, ''], async (err, res: any) => {
                        if(err) reject(err)
                        resolve(res[0]?.outputMessage)
                    })
                })

                return returnStatement

            } else {
                return 'Incorrect Password'
            }
        }
    },
    resetPasswordThroughEmail: async (_: undefined, { email_id }: { email_id: string }): Promise<string> => {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_SENDER,
                    pass: process.env.EMAIL_SENDER_PASSWORD
                }
            });

            const newPassword = randomstring.generate({ length: 10 })
            const GTdetails = {
                //sending male to itself that's why same email is used here
                from: process.env.EMAIL_SENDER,
                to: email_id,
                subject: 'Enquiry from Website',
                text: `You New Password is ${newPassword}`,
            };

            const res = transporter.sendMail(GTdetails, async (err, info) => {
                if (err) {
                    console.error(err)
                }
                else {
                    try {
                        const hashedNewPassword: string = await hash(newPassword, Number(process.env.BCRYPT_SALT_ROUNDS))
                        const result = await new Promise((resolve, reject) => {
                            dbConnection.query('update users set password=? where email_id=?', [hashedNewPassword, email_id], (err, res) => {
                                if(err){
                                    reject('password not updated in database. new password will not work')
                                }
                                resolve('password successfully updated in database')
                            })
                        })
                        return result
                    } catch (error) {
                        console.error(error)
                        return 'cannot update password in database.'
                    }
                }
            })
        }
        catch (error) {
            console.error('cannot rejet password through email', error)
            return 'cannot reset password'
        }

        return 'success'
    }
}

export default mutations