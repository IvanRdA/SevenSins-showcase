import { Request } from 'express'

export type Position = {
  z: number
  y: number
  x: number
}

export type Tiles = {
  construction: number
  defensive: number
}

export type Habitability = {
  cold: number
  temperate: number
  warm: number
}

export type StarResources = {
    primary: {
      energy: {
        electromagnetism: number
        darkMatter?: number
        antiMatter?: number
        exoticMatter?: number
      }
  },
}

export type APIResponse = {
  error: {
    name: string | null
    message: string | null
  }
  message: string | null
  data: any
}

export interface RequestWithUser extends Request {
  user?: any
}

export interface Technology {
  name: string
  idx: number
  description: string
  prerequisites: number[]
  resourcesCost: {
    primary?: {
      time?: number
      minerals?: {
        crystals: number
      }
    }
  }
  discover: {
    buildings: number[]
    equipments: number[]
    weapons: number[]
    tripulation: number[]
    ships: number[]
    resources: number[]
    eras: number[]
  }
  maxLevel: number
  incremental?: number
}

export type TechnologyGraph = Record<number, Technology>

export type shipDefinition = {
  className: string
  name: string
  sku: string
  tier: string
  stats: {
    hp: number
    att: {
      energy: number
      atomic: number
      explosive: number
    }
    def: {
      energy: number
      atomic: number
      explosive: number
    }
    vel: number
    cargoCapacity: number
    maxTripulation: number
    fuelConsumption: number
  }
  tripulation: []
  equipment: {
    shields: number[]
    motor: number[]
    cargp: number[]
    radars: number[]
    energy: number[]
    baseModule: number[]
    fuel: number[]
  }
  weapons: {
    energy: string[]
    atomic: string[]
    explosive: string[]
  }
  cost: {
    time: number
    money: number
    energy: number
    steel: number
    crystals: number
    iron: number
    silicon: number
    gold: number
    cobalt: number
    uranium: number
    neon: number
    argon: number
    helium: number
    nitrogen: number
  }
  maintance: {
    money: number
    energy: number
  }
  power: number
  fleet: string
  owner: string
}
export type shipDefinitions = Record<number, shipDefinition>

export type equipmentDefinition = {
  name: string
  idx: number
  type: string
  tier: string
  stats: {
    hp: number
    def: {
      energy: number
      atomic: number
      explosive: number
    }
    vel: number
    cargoCapacity: number
    fuelConsumption: number
  }
  cost: {
    time: number
    money: number
    energy: number
    steel: number
    crystals: number
    iron: number
    silicon: number
    gold: number
    cobalt: number
    uranium: number
    neon: number
    argon: number
    helium: number
    nitrogen: number
  }
  maintance: {
    money: number
    energy: number
  }
  power: number
  owner: string
}

export type equipmentDefinitions = Record<number, equipmentDefinition>

export type weaponDefinition = {
  name: string
  idx: number
  type: string
  tier: string
  stats: {
    hp: number
    att: {
      energy: number
      atomic: number
      explosive: number
    }
  }
  cost: {
    time: number
    money: number
    energy: number
    steel: number
    crystals: number
    iron: number
    silicon: number
    gold: number
    cobalt: number
    uranium: number
    neon: number
    argon: number
    helium: number
    nitrogen: number
  }
  maintance: {
    money: number
    energy: number
  }
  power: number
  owner: string
}

export type weaponDefinitions = Record<number, weaponDefinition>


export type tripulationDefinition = {
  name: string
    type: string
    tier: string
    bonus: { 
        // Define the possible bonus per type of tripulation and create a dictionary with the types.
    },
    assignedTo: string
    userName: string,
    cost: {
      time: number
      money: number
    },
  maintance: number
}

export type tripulationDefinitions = Record<number, tripulationDefinition>

export type BuildingDefinition = {}
export type BuildingDefinitions = Record<number, BuildingDefinition>

export type AsteroidResources = {
  primary: {
    minerals: {
      steel: number
      iron: number
      crystals: number
      gold: number
      uranium: number
    },
    gases: {
      nitrogen: number
      helium: number
      neon: number
      argon: number
    }
  }
}

export type AsteroidDefinition = {
  size: string
  resources: AsteroidResources
}

export type AsteroidDefinitions = Record<number, AsteroidDefinition>

export type MoonBonuses = {
  habitability: number
  time: number
  combustion: number
  food: number
  builds: number
  equipments: number
  weapons: number
  energy: number
  gases: number
}

export type MoonDefinition = {
  class: string
  mass: {
    min: number
    max: number
  }
  radius: {
    min: number
    max: number
  }
  tiles: {
    construction: {
      min: number
      max: number
    }
    defensive: {
      min: number
      max: number
    }
  }
  bonuses: {
    habitability: {
      min: number
      max: number
    }
    time: {
      min: number
      max: number
    }
    combustion: {
      min: number
      max: number
    }
    food: {
      min: number
      max: number
    }
    builds: {
      min: number
      max: number
    }
    equipments: {
      min: number
      max: number
    }
    weapons: {
      min: number
      max: number
    }
    energy: {
      min: number
      max: number
    }
    gases: {
      min: number
      max: number
    }
  }
}

export type MoonDefinitions = Record<number, MoonDefinition>
export type MoonBonus = Record<string, number>

export type PlanetDefinition = {
  class: string
  mass: {
    min: number
    max: number
  }
  radius: {
    min: number
    max: number
  }
  tiles: {
    construction: {
      min: number
      max: number
    }
    defensive: {
      min: number
      max: number
    }
  }
  bonuses: {
    habitability: {
      min: number
      max: number
    }
    time: {
      min: number
      max: number
    }
    combustion: {
      min: number
      max: number
    }
    food: {
      min: number
      max: number
    }
    builds: {
      min: number
      max: number
    }
    equipments: {
      min: number
      max: number
    }
    weapons: {
      min: number
      max: number
    }
    energy: {
      min: number
      max: number
    }
    gases: {
      min: number
      max: number
    }
  }
}

export type PlanetDefinitions = Record<number, PlanetDefinition>
export type PlanetBonus = Record<string, number>
export type PlanetBonuses = {
  habitability: number
  time: number
  combustion: number
  food: number
  builds: number
  equipments: number
  weapons: number
  energy: number
  gases: number
}


export type StarDefinition = {
  class: string
  temperature: {
    min: number
    max: number
  }
  color: string
  mass: {
    min: number
    max: number
  }
  radius: {
    min: number
    max: number
  }
  orbitalStarter: number
  className: string
  habitabilityLevels: {
    cold: number
    temperate: number
    warm: number
  }
  resources: {
    primary: {
      energy: {
        electromagnetism: number
        darkMatter?: number
        antiMatter?: number
        exoticMatter?: number
      }
    }
  }
  maxPerSystem: number
}

export type StarDefinitions = Record<number, StarDefinition>

