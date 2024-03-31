import { handleError } from "../../globals/assets/libs"
import { DatabaseOperation, ValidationError } from "../../globals/classes/Errors"
import USER from "../models/user.model"
import bcrypt from 'bcrypt'

// User registration controller. 
const userRegistration = async (fullName: string, email: string, password: string, galaxy: number) => {
    try{
        const uniqueMail = await USER.findOne({'account.email': email}).exec().catch((e: any) => {
            throw new DatabaseOperation('Impossible to check if email is yet registered.')
        })
        if(uniqueMail !== null){
            throw new ValidationError('Email field is repeated.')
        }

        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new USER({account: {fullName, email, password: hashedPassword, galaxy}})
        await newUser.save().catch((e: any) => {
            console.error(e)
            throw new DatabaseOperation('Impossible to store the new user on database.')
        })

        const newUserNoPass = {
            account: {
                password: '',
                ...newUser.account
            },
            ...newUser
        }
        return {error: null, message: 'New user stored correctly.', data: newUserNoPass}

    }catch(e: any){
        return handleError(e)
    }
}

export default userRegistration