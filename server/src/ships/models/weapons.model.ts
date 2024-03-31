import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'
import { resourceModel } from '../../globals/assets/constants'

// Ship weapon model for the database.
const weaponModel = new Schema({
  name: { type: String, required: true, validate: REGEX.basicString },
  idx: { type: Number, required: true, unique: true, min: 0 },
  type: { type: String, required: true, validate: REGEX.weaponTypeString }, // Energy, Atomic...
  tier: { type: String, required: true, validate: REGEX.tierString },
  stats: {
    hp: { type: Number, min: 0, default: 0 },
    att: {
      energy: { type: Number, min: 0, default: 0 },
      atomic: { type: Number, min: 0, default: 0 },
      explosive: { type: Number, min: 0, default: 0 }
    }
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

const WEAPON = model('Weapon', weaponModel)

export default WEAPON
