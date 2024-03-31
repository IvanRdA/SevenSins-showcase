import { TechnologyGraph } from "../../types"

export const physicsTree: TechnologyGraph = {
  0: {
    name: 'Hire new colonizer',
    idx: 0,
    description:
      'Start your career on colonization investigation and expand the borders of your Empire over the Galaxy.',
    prerequisites: [],
    resourcesCost: {
      primary: {
        time: 180
      }
    },
    discover: {
      buildings: [],
      equipments: [],
      weapons: [],
      tripulation: [],
      ships: [],
      resources: [],
      eras: []
    },
    maxLevel: 1,
    incremental: 1
  },
  1: {
    name: 'Oxygen ultracompression',
    idx: 1,
    description: 'Start compressing oxygen to create O3.',
    prerequisites: [0],
    resourcesCost: {
      primary: {
        time: 240,
        minerals: {
          crystals: 120
        }
      }
    },
    discover: {
      buildings: [],
      equipments: [],
      weapons: [],
      tripulation: [],
      ships: [],
      resources: [],
      eras: []
    },
    maxLevel: 1,
    incremental: 1
  },
  2: {
    name: 'Continuous movement',
    idx: 2,
    description:
      'Allow to create a continuous movement mechanism that generate electromagnetism resource.',
    prerequisites: [0],
    resourcesCost: {
      primary: {
        time: 45,
        minerals: {
          crystals: 120
        }
      }
    },
    discover: {
      buildings: [],
      equipments: [],
      weapons: [],
      tripulation: [],
      ships: [],
      resources: [],
      eras: []
    },
    maxLevel: 1,
    incremental: 1
  },
  3: {
    name: 'Continuous movement TO TEST',
    idx: 3,
    description:
      'Allow to create a continuous movement mechanism that generate electromagnetism resource.',
    prerequisites: [0, 2, 1],
    resourcesCost: {
      primary: {
        time: 215,
        minerals: {
          crystals: 350
        }
      }
    },
    discover: {
      buildings: [0],
      equipments: [],
      weapons: [],
      tripulation: [],
      ships: [],
      resources: [],
      eras: []
    },
    maxLevel: 1,
    incremental: 1
  }
}
