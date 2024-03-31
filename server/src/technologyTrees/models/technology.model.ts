import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'
import { resourceModel } from '../../globals/assets/constants'

// Technology unit (not tree) model for the database.
const technologyModel = new Schema({
    name: { type: String, required: true, validate: REGEX.fullnameString },
    idx: { type: Number, required: true, min: 0, unique: true },
    tree: { type: String, required: true, validate: REGEX.treeString },
    description: { type: String, required: true, validate: REGEX.basicString },
    prerequisites: { type: Array },
    resourcesCost: resourceModel,
    discover: {
      buildings: { type: Array },
      equipments: { type: Array },
      weapons: { type: Array },
      tripulation: { type: Array },
      ships: { type: Array },
      resources: { type: Array },
      eras: { type: Array }
    },
    maxLevel: { type: Number, min: 0, max: 25 },
    incremental: { type: Number, min: 1, default: 1 }
})

const TECHNOLOGY = model('Technology', technologyModel)

export default TECHNOLOGY