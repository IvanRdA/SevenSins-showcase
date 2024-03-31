import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'
import { resourceModel } from '../../globals/assets/constants'

// Ship model for the database.
const shipModel = new Schema({
  className: { type: String, required: true, validate: REGEX.basicString },
  name: { type: String, required: true, validate: REGEX.basicString },
  sku: {
    type: String,
    required: true,
    unique: true,
    validate: REGEX.SKUString
  },
  tier: { type: String, required: true, validate: REGEX.tierString },
  stats: {
    hp: { type: Number, min: 0, default: 0 },
    att: {
      energy: { type: Number, min: 0, default: 0 },
      atomic: { type: Number, min: 0, default: 0 },
      explosive: { type: Number, min: 0, default: 0 }
    },
    def: {
      energy: { type: Number, min: 0, default: 0 },
      atomic: { type: Number, min: 0, default: 0 },
      explosive: { type: Number, min: 0, default: 0 }
    },
    vel: { type: Number, min: 0, max: 5, default: 0.5 },
    cargoCapacity: { type: Number, min: 0, default: 0 },
    maxTripulation: { type: Number, min: 0 },
    fuelConsumption: { type: Number, min: 0, default: 0 }
  },
  tripulation: { type: Array },
  equipment: {
    shields: { type: Array },
    motor: { type: Array },
    cargp: { type: Array },
    radars: { type: Array },
    energy: { type: Array },
    baseModule: { type: Array },
    fuel: { type: Array }
  },
  weapons: {
    energy: { type: Array },
    atomic: { type: Array },
    explosive: { type: Array }
  },
  cost: resourceModel,
  maintance: resourceModel,
  power: { type: Number, min: 0, default: 0 },
  fleet: { type: String, validate: REGEX.SKUStringWithNone },
  owner: { type: String, validate: REGEX.SKUStringWithNone }
})

const SHIP = model('Ship', shipModel)

export default SHIP
