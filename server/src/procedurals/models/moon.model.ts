import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'

// Database model for moon items.
const moonModel = new Schema({
  name: String,
  sku: String,
  orbital: Number,
  size: String,
  mass: Number,
  radius: Number,
  gravity: Number,
  tiles: { construction: Number, defensive: Number },
  habitability: { cold: Number, temperate: Number, warm: Number },
  bonuses: {
    habitability: Number,
    time: Number,
    combustion: Number,
    food: Number,
    builds: Number,
    equipments: Number,
    weapons: Number,
    energy: Number,
    gases: Number
  },
  clime: { type: String, validate: REGEX.climeString},
  biome: { type: String, validate: REGEX.symbolsString},
  temperature: { type: Number, min: 0, default: 45},
  planet: { type: String, required: true, validate: REGEX.SKUString },
  buildings: { type: Array, default: [] },
  defensiveStructures: { type: Array, default: [] },
  colonizedBy: { type: String, default: null }
})

const MOON = model('Moon', moonModel)

export default MOON
