import { APIResponse } from "../../types";
import { DatabaseOperation, InvalidToken, NullTokenError, ProceduralProcess, ValidationError } from "../classes/Errors";

// General method for handleling the custom errors that could happen through the processes.
export function handleError(error: any): APIResponse {
    if(error instanceof DatabaseOperation){
        console.error(`⛔️[ERROR]: \n${error.message}`)
        return {error: {name: error.name, message: 'Impossible to operate with database.'}, message: 'Impossible to operate with database', data: null}
    }else if(error instanceof ValidationError) {
        // NO CONSOLE LOG BECAUSE IT´S A CLIENT SIDE ERROR (VALIDATIONS)
        return {error: {name: error.name, message: error.message}, message: error.message, data: null}
    }
    else if(error instanceof ProceduralProcess){
        console.error(`⛔️[ERROR]: \nError in procedural process: ${error.message}`)
        return {error: {name: error.name, message: 'Error while procedural simulation.'}, message: error.message, data: null}
    }else if(error instanceof NullTokenError || error instanceof InvalidToken){
        return {error: {name: error.name, message: error.message}, message: error.message, data: null}
    }else {
        // JUST AN EDGE CASE FOR DEVELOPMENT PURPOSES
        return {error: {name: null, message: null}, message: null, data: null}
    }
}



biomes: ['Crystal Desert', 'Floating forest', 'Fog Ocean', 'Tomb',
'Gaia',
'Subterranean cities',
'Metallic Meadows',
'Crystal canyons', 'Magnetic skies',
'Luminous ice forest',
'Mirage desert',
'Floating meadows']