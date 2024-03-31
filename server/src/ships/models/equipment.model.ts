import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'
import { resourceModel } from '../../globals/assets/constants'

// Ship equipment model for the database.
const equipmentModel = new Schema({
  name: { type: String, required: true, validate: REGEX.basicString },
  idx: { type: Number, required: true, unique: true, min: 0 },
  type: { type: String, required: true, validate: REGEX.equipmentTypeString }, // Shield, Motor, Base Module...
  tier: { type: String, required: true, validate: REGEX.tierString },
  stats: {
    hp: { type: Number, min: 0, default: 0 },
    def: {
      energy: { type: Number, min: 0, default: 0 },
      atomic: { type: Number, min: 0, default: 0 },
      explosive: { type: Number, min: 0, default: 0 }
    },
    vel: { type: Number, min: 0, max: 5, default: 0.5 },
    cargoCapacity: { type: Number, min: 0, default: 0 },
    fuelConsumption: { type: Number, min: 0, default: 0 }
  },
  cost: resourceModel,
  maintance: resourceModel,
  power: { type: Number, min: 0, default: 0 },
  owner: {
    type: String,
    required: true,
    validate: REGEX.SKUStringWithNone,
    default: 'None'
  }
})

const EQUIPMENT = model('Equipment', equipmentModel)

export default EQUIPMENT
