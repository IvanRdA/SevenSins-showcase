import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'
import { resourceModel } from '../../globals/assets/constants'

// Ship tripulation model for the database.
const tripulationModel = new Schema({
    name: { type: String, default: 'None None', required: true, validate: REGEX.fullnameString },
    type: { type: String, required: true, validate: REGEX.tripulationTypeString }, // Scientist, Miner, Navigator...
    tier: { type: String, required: true, validate: REGEX.tierString },
    bonus: { 
        // Define the possible bonus per type of tripulation and create a dictionary with the increments.
    },
    assignedTo: { type: String, required: true, default: 'None', validate: REGEX.SKUStringWithNone },
    userName: { type: String, required: true, default: 'None', validate: REGEX.idMongoString },
    cost: resourceModel,
    maintance: resourceModel
})

const TRIPULATION = model('Tripulation', tripulationModel)

export default TRIPULATION