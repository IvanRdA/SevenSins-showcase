import { Schema, model } from 'mongoose'
import { resourceModel } from '../../globals/assets/constants'

// Database model for star items.
const starModel = new Schema({
  name: String,
  starClassName: String,
  sku: String,
  starClass: String,
  temperature: Number,
  color: String,
  mass: Number,
  radius: Number,
  gravity: Number,
  isMain: Boolean,
  orbital: Number,
  orbitalStarter: Number,
  resources: resourceModel,
  habitabilityLevels: { cold: Number, temperate: Number, warm: Number },
  system: String,
  minedBy: { type: String, default: null }
})

const STAR = model('Star', starModel)

export default STAR
