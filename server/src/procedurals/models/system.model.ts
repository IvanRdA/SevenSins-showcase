import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'

// Database model for system items.
const systemModel = new Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, validate: REGEX.SKUString },
  position: { z: { type: Number }, y: { type: Number }, x: { type: Number } },
  stars: { type: Array },
  planets: { type: Array },
  asteroids: { type: Array },
  owner: { type: String, required: true, validate: REGEX.factionString },
  galaxy: { type: String, required: true, validate: REGEX.SKUString },
})

const SYSTEM = model('System', systemModel)

export default SYSTEM
