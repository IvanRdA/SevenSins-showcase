import { equipmentDefinitions } from '../../types'

const equipmentsList: equipmentDefinitions = {
  0: {
    name: 'Basic shield system',
    idx: 0,
    tier: 'C',
    type: 'Shield',
    stats: {
      hp: 300,
      def: {
        energy: 80,
        atomic: 80,
        explosive: 80
      },
      vel: 0,
      cargoCapacity: 0,
      fuelConsumption: 0
    },
    cost: {
      time: 60,
      money: 20,
      energy: 0,
      steel: 0,
      crystals: 40,
      iron: 0,
      silicon: 0,
      gold: 0,
      cobalt: 0,
      uranium: 0,
      neon: 0,
      argon: 0,
      helium: 0,
      nitrogen: 0
    },
    maintance: {
      money: 2,
      energy: 0
    },
    power: 120,
    owner: 'None'
  },
  1: {
    name: 'Atomic Motor',
    idx: 1,
    tier: 'C',
    type: 'Motor',
    stats: {
      hp: 300,
      def: {
        energy: 20,
        atomic: 20,
        explosive: 20
      },
      vel: 0.5,
      cargoCapacity: 0,
      fuelConsumption: 400
    },
    cost: {
      time: 60,
      money: 20,
      energy: 0,
      steel: 0,
      crystals: 40,
      iron: 0,
      silicon: 0,
      gold: 0,
      cobalt: 0,
      uranium: 0,
      neon: 0,
      argon: 0,
      helium: 0,
      nitrogen: 0
    },
    maintance: {
      money: 0,
      energy: 10
    },
    power: 110,
    owner: 'None'
  }
}

export default equipmentsList
