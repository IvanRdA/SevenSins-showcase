import { Schema, model } from 'mongoose'

// Database model for planet items.
const planetModel = new Schema({
  name: String,
  sku: String,
  type: String,
  orbital: Number,
  moons: Array,
  size: String,
  tiles: { construction: Number, defensive: Number },
  biome: String,
  radius: Number,
  gravity: Number,
  habitability: { cold: Number, temperate: Number, warm: Number },
  temperature: Number,
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
  clime: String,
  mass: Number,
  system: String,
  buildings: { type: Array, default: [] },
  defensiveStructures: { type: Array, default: [] },
  colonizedBy: { type: String, default: null }
})

const PLANET = model('Planet', planetModel)

export default PLANET
