import { Schema, model } from 'mongoose'

// Database model for galaxy items.
const galaxyModel = new Schema({
  name: { type: String },
  sku: { type: String },
  shape: { type: String },
  systems: { type: Array }
})

const GALAXY = model('Galaxy', galaxyModel)

export default GALAXY
