import { Router } from "express"
import loginValidation from "../controllers/login.controller"
import { REGEX } from "../../globals/assets/regex"

const router = Router()

// TESTING PURPOSES, NOT IMPLEMENTED YET: HANDLES THE LOGIN LOGIC.
const loginRoute = router.post(`/private-api-001/login`, async (req, res) => {
    const { google } = req.body
    if(google){
        const validate = await loginValidation(google)

        if(validate?.error?.name === 'Internal server error'){
            res.status(503).json(validate)
        }else if(validate?.error?.name === 'Validation error'){
            res.status(400).json(validate)
        }else{
            res.status(200).json(validate)
        }
    }else{
        const { email, password } = req.body
        if(REGEX.emailString.test(email) && REGEX.rawPassword.test(password)){
            const validate = await loginValidation(google, email, password)
    
            if(validate?.error?.name === 'Internal server error'){
                res.status(503).json(validate)
            }else if(validate?.error?.name === 'Validation error'){
                res.status(400).json(validate)
            }else{
                res.status(200).json(validate)
            }
        }else{
            res.status(400).json({error: {name: 'Invalid field type', message: 'Password or email are not valid field inputs.'}, message: 'Password or email are not valid field inputs.', data: null})
        }
    }
})

export default loginRoute