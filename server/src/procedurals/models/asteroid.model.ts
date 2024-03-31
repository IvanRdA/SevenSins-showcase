import { Schema, model } from 'mongoose'
import { resourceModel } from '../../globals/assets/constants'

// Database model for asteroid items.
const asteroidModel = new Schema({
  name: String,
  sku: String,
  orbital: Number,
  size: String,
  resources: resourceModel,
  system: String,
  minedBy: { type: String, default: null }
})

const ASTEROID = model('Asteroid', asteroidModel)

export default ASTEROID
