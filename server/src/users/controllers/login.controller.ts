import bcrypt from 'bcrypt'
import USER from "../models/user.model"
import { DatabaseOperation, ValidationError } from "../../globals/classes/Errors"
import { handleError } from '../../globals/assets/libs'
import jwt from 'jsonwebtoken'

// Login controller. It is not finished yet because I want to implement the google login auth process.
const loginValidation = async (google: boolean, email: string = '', password: string = '') => {

    if(google){

    }else{
        try{
            const logged = await USER.findOne({'account.email': email}).exec().catch((e: any) => {
                throw new DatabaseOperation('Could not compare usernames with database.')
            })
    
            const storedPassword = logged?.account?.password
    
            if(logged) {
                const comparedPassword = await bcrypt.compare(password, storedPassword ?? '')
                const secret: string = process.env.SECRET_TOKEN as string
    
                if(comparedPassword){
                    const token = jwt.sign({ userId: logged._id, email: email }, secret, { expiresIn: '4h' })
                    const userNoPass = {
                        token: token,
                        account: {
                            ...logged.account,
                            password: '',
                        },
                        cookies: {},
                        ...logged
                    }
                    return {error: null, message: 'Logged in correctly', data: userNoPass}
                }else{
                    throw new ValidationError('Passwords doesn\'t match')
                }
    
            }else{
                throw new ValidationError('Email not registered.')
            }
        }catch(e: any){
            return handleError(e)
        }
    }
}

export default loginValidation