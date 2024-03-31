import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'
import { resourceModel } from '../../globals/assets/constants'

const buildingModel = new Schema({
    name: { type: String, required: true, validate: REGEX.basicString },
    idx: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, validate: REGEX.buildingTypeString }, // Base, Module, Ampliation...
    maxLevel: { type: Number, required: true, min: 1, max: 100, default: 100 },
    level: { type: Number, required: true, min: 1, max: 100, default: 1 },
    incremental: { type: Number, min: 1, default: 1.2 },
    slotCost: {
        construction: { type: Number, required: true, min: 1, default: 1 },
        defensive: { type: Number, required: true, min: 1, default: 1 },
    },
    modules: { type: Array },
    ampliations: { type: Array },
    cost: resourceModel,
    maintance: resourceModel,
    production: resourceModel,
    buildedOn: { type: String, required: true, default: 'None', validate: REGEX.SKUStringWithNone },
})

const BUILDING = model('Building', buildingModel)

export default BUILDING