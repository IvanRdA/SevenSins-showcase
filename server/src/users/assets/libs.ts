import { REGEX } from "../../globals/assets/regex"

// A first touch implementation to the validation fields method for the users asset.
export function validateUserInfo(fullName: string, email: string, password: string, galaxy: number): boolean {
    return REGEX.fullnameString.test(fullName) && REGEX.emailString.test(email) && REGEX.rawPassword.test(password) && (galaxy > 0 && galaxy < 10)
}