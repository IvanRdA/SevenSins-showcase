import { weaponDefinitions } from '../../types'

const weaponsList: weaponDefinitions = {
  0: {
    name: 'Plasma canyon',
    idx: 0,
    tier: 'B',
    type: 'Energy',
    stats: {
      hp: 300,
      att: {
        energy: 750,
        atomic: 0,
        explosive: 20
      }
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
    power: 500,
    owner: 'None'
  },
  1: {
    name: 'Gamma Ray Pulse',
    idx: 1,
    tier: 'S',
    type: 'Motor',
    stats: {
      hp: 1200,
      att: {
        energy: 600,
        atomic: 2500,
        explosive: 0
      }
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
    power: 1120,
    owner: 'None'
  }
}

export default weaponsList
