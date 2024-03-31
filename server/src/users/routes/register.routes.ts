import { Router } from "express";
import { validateUserInfo } from "../assets/libs";
import userRegistration from "../controllers/register.controller";

const router = Router()

// TESTING PURPOSES, NOT IMPLEMENTED YET: HANDLES THE USER REGISTRATION LOGIC.
const registerUserRoute = router.post(`/private-api-001/register-new-user`, async (req, res) => {
    const { fullName, email, password, galaxy } = req.body
    const validated = validateUserInfo(fullName, email, password, galaxy)

    if(validated){
        const registerUser = await userRegistration(fullName, email, password, galaxy)

        if(registerUser?.error?.name === 'Database Operation'){
            res.status(500).json(registerUser)
        }else{
            res.status(200).json(registerUser)
            
        }
    }
})

export default registerUserRoute