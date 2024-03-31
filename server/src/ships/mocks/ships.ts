import { randomUUID } from 'crypto'
import { shipDefinitions } from '../../types'

const shipsList: shipDefinitions = {
  0: {
    className: 'Explorer',
    name: 'Last Explorer',
    sku: randomUUID(),
    tier: 'C',
    stats: {
      hp: 300,
      att: {
        energy: 20,
        atomic: 20,
        explosive: 20
      },
      def: {
        energy: 80,
        atomic: 80,
        explosive: 80
      },
      vel: 0.5,
      cargoCapacity: 300,
      maxTripulation: 2,
      fuelConsumption: 100
    },
    tripulation: [],
    equipment: {
      shields: [0],
      motor: [1],
      cargp: [],
      radars: [],
      energy: [],
      baseModule: [],
      fuel: []
    },
    weapons: {
      energy: [],
      atomic: [],
      explosive: []
    },
    cost: {
      time: 0,
      money: 0,
      energy: 0,
      steel: 0,
      crystals: 0,
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
      energy: 0
    },
    power: 0,
    fleet: 'None',
    owner: 'None'
  }
}

export default shipsList
