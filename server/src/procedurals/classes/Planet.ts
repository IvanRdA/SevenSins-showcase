import { Habitability, Tiles, PlanetBonus, PlanetDefinitions } from '../../types'
import { randomUUID } from 'crypto'
import Dice from '../../globals/classes/Dice'
import Moon from './Moon'
import PLANET from '../models/planet.model'
import { handleError } from '../../globals/assets/libs'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { planetBiomes } from '../assets/constants'
import { generateEntityName } from '../assets/libs'

// Planet class that defines the planet items.
export default class Planet {
  name: string
  sku: string
  type: string
  orbital: number
  moons: Moon[]
  size: string
  tiles: Tiles
  biome: string
  radius: number
  mass: number
  gravity: number
  habitability: Habitability
  temperature: number
  bonuses: PlanetBonus
  category: number
  clime: string

  static temperatureTresholds = {
    min: 100,
    max: 1200
  }
  static typeProbabilities = [0.280, 0.32, 0.30, 0.10]
  static planetTypes = ['Gas', 'Solid']
  static planetDefinitions: PlanetDefinitions = {
    0: {
      class: 'Dwarf',
      mass: {
        min: 0.1,
        max: 0.5
      },
      radius: {
        min: 0.3,
        max: 1.2
      },
      tiles: {
        construction: {
          min: 12,
          max: 23
        },
        defensive: {
          min: 10,
          max: 20
        }
      },
      bonuses: {
        habitability: {
          min: 0.05,
          max: 0.25
        },

        time: {
          min: 0.02,
          max: 0.05
        },
        combustion: {
          min: 0.05,
          max: 0.12
        },
        food: {
          min: 0.15,
          max: 0.25
        },
        builds: {
          min: 0.07,
          max: 0.13
        },
        equipments: {
          min: 0.03,
          max: 0.08
        },
        weapons: {
          min: 0.03,
          max: 0.08
        },
        energy: {
          min: 0.04,
          max: 0.1
        },
        gases: {
          min: 0.08,
          max: 0.18
        }
      }
    },
    1: {
      class: 'Regular',
      mass: {
        min: 0.5,
        max: 2
      },
      radius: {
        min: 0.8,
        max: 3.5
      },
      tiles: {
        construction: {
          min: 18,
          max: 37
        },
        defensive: {
          min: 15,
          max: 25
        }
      },
      bonuses: {
        habitability: {
          min: 0.08,
          max: 0.31
        },

        time: {
          min: 0.04,
          max: 0.07
        },
        combustion: {
          min: 0.04,
          max: 0.1
        },
        food: {
          min: 0.2,
          max: 0.34
        },
        builds: {
          min: 0.09,
          max: 0.17
        },
        equipments: {
          min: 0.05,
          max: 0.11
        },
        weapons: {
          min: 0.05,
          max: 0.11
        },
        energy: {
          min: 0.09,
          max: 0.2
        },
        gases: {
          min: 0.12,
          max: 0.23
        }
      }
    },
    2: {
      class: 'Giant',
      mass: {
        min: 2,
        max: 400
      },
      radius: {
        min: 3.5,
        max: 25
      },
      tiles: {
        construction: {
          min: 30,
          max: 50
        },
        defensive: {
          min: 20,
          max: 30
        }
      },
      bonuses: {
        habitability: {
          min: 0.12,
          max: 0.35
        },

        time: {
          min: 0.05,
          max: 0.09
        },
        combustion: {
          min: 0.07,
          max: 0.15
        },
        food: {
          min: 0.24,
          max: 0.39
        },
        builds: {
          min: 0.12,
          max: 0.26
        },
        equipments: {
          min: 0.07,
          max: 0.19
        },
        weapons: {
          min: 0.07,
          max: 0.19
        },
        energy: {
          min: 0.13,
          max: 0.24
        },
        gases: {
          min: 0.18,
          max: 0.31
        }
      }
    },
    3: {
      class: 'SuperGiant',
      mass: {
        min: 800,
        max: 2500
      },
      radius: {
        min: 30,
        max: 55
      },
      tiles: {
        construction: {
          min: 90,
          max: 140
        },
        defensive: {
          min: 45,
          max: 99
        }
      },
      bonuses: {
        habitability: {
          min: 0.12,
          max: 0.35
        },
        time: {
          min: 0.05,
          max: 0.09
        },
        combustion: {
          min: 0.07,
          max: 0.15
        },
        food: {
          min: 0.24,
          max: 0.39
        },
        builds: {
          min: 0.12,
          max: 0.26
        },
        equipments: {
          min: 0.07,
          max: 0.19
        },
        weapons: {
          min: 0.07,
          max: 0.19
        },
        energy: {
          min: 0.13,
          max: 0.24
        },
        gases: {
          min: 0.18,
          max: 0.31
        }
      }
    }
  }

  constructor(
    orbital: number,
    category?: number,
    name?: string,
    type?: string,
    moons?: Moon[],
    size?: string,
    biome?: string,
    habitability?: Habitability,
    radius?: number,
    temperature?: number,
    mass?: number
  ) {
    this.orbital = orbital
    this.category = category ?? this.getPlanetCategory()
    this.habitability = habitability ?? this.generateNullHabitability()
    this.name = name ?? generateEntityName()
    this.sku = randomUUID()
    this.type = type ?? this.getPlanetType()
    this.moons = moons ?? []
    this.size = size ?? this.getPlanetSize()
    this.tiles = this.getPlanetTiles()
    this.biome = biome ?? this.getPlanetBiome()
    this.mass = mass ?? this.getPlanetMass()
    this.radius = radius ?? this.getPlanetRadius()
    this.gravity = 0
    this.temperature = temperature ?? this.getPlanetTemperature()
    this.bonuses = this.getPlanetBonuses()
    this.clime = this.generatePlanetClime()
  }

  private getPlanetTemperature(): number {
    const minT = Planet.temperatureTresholds.min
    const maxT = Planet.temperatureTresholds.max

    return minT + new Dice(maxT - minT).getThrow()
  }

  private getPlanetType(): string {
    return Planet.planetTypes[new Dice(Planet.planetTypes.length).getThrow()]
    
  }

  private getPlanetSize(): string {
    return Planet.planetDefinitions[this.category].class
  }

  private getPlanetCategory(): number {
    const totalWeight = Planet.typeProbabilities.reduce(
      (sum, probability) => sum + probability,
      0
    )
    const randomValue = new Dice(totalWeight).getThrow(false)

    let accumulatedWeight = 0
    for (let i = 0; i <= Planet.typeProbabilities.length - 1; i++) {
      accumulatedWeight += Planet.typeProbabilities[i]
      if (randomValue <= accumulatedWeight) {
        return i
      }
    }

    return new Dice(Planet.typeProbabilities.length + 1).getThrow()

  }

  private getPlanetTiles(): Tiles {
    const minConstTiles =
      Planet.planetDefinitions[this.category].tiles.construction.min
    const minDefTiles =
      Planet.planetDefinitions[this.category].tiles.defensive.min

    const maxConstTiles =
      Planet.planetDefinitions[this.category].tiles.construction.max
    const maxDefTiles =
      Planet.planetDefinitions[this.category].tiles.defensive.max

    return {
      construction:
        minConstTiles + new Dice(maxConstTiles - minConstTiles).getThrow(),
      defensive: minDefTiles + new Dice(maxDefTiles - minDefTiles).getThrow()
    }
  }

  private getPlanetBiome(): string {
    if(this.type === 'Gas'){
      return 'Gas'
    }

    return planetBiomes[
      new Dice(planetBiomes.length).getThrow()
    ]
  }

  private getPlanetRadius(): number {
    const minR = Planet.planetDefinitions[this.category].radius.min
    const maxR = Planet.planetDefinitions[this.category].radius.max

    return minR + new Dice(maxR - minR).getThrow(false)
  }

  private generateNullHabitability(): Habitability {
    return {
      cold: 0,
      temperate: 0,
      warm: 0
    }
  }

  private getPlanetBonuses(): PlanetBonus {
    const baseCase: PlanetBonus = {
      habitability: 0,
      time: 0,
      combustion: 0,
      food: 0,
      builds: 0,
      equipments: 0,
      weapons: 0,
      energy: 0,
      gases: 0
    }

    const bonuses = Planet.planetDefinitions[this.category].bonuses as Record<
      string,
      { min: number; max: number }
    >

    for (const key in baseCase) {
      const dice = new Dice(1).getThrow(false)
      const min = bonuses[key].min
      const max = bonuses[key].max
      let range = min + new Dice(max - min).getThrow(false)

      if (dice >= 0.9) {
        const malusDice = new Dice(1).getThrow(false)

        if (malusDice >= 0.7) {
          baseCase[key] = (bonuses[key].min + bonuses[key].min * range) * -1
        } else {
          baseCase[key] = bonuses[key].min + bonuses[key].min * range
        }
      }
    }

    return baseCase
  }

  private generatePlanetClime(): string {
    const range =
      Planet.temperatureTresholds.max - Planet.temperatureTresholds.min

    if (this.temperature < Planet.temperatureTresholds.min + range * 0.333) {
      return 'Cold'
    } else if (
      this.temperature >= Planet.temperatureTresholds.min + range * 0.333 &&
      this.temperature < Planet.temperatureTresholds.min + range * 0.67
    ) {
      return 'Temperate'
    } else {
      return 'Warm'
    }
  }

  private getPlanetMass(): number {
    const minM = Planet.planetDefinitions[this.category].mass.min
    const maxM = Planet.planetDefinitions[this.category].mass.max

    return minM + new Dice(maxM - minM).getThrow(false)
  }

  public async storePlanet(
    systemTracker: string
  ): Promise<any> {
    try {
      const skus: string[] = []
      this.moons.map((moon) => {
        skus.push(moon.sku)
      })
      const mapper = {
        name: this.name,
        sku: this.sku,
        type: this.type,
        orbital: this.orbital,
        moons: skus,
        size: this.size,
        tiles: this.tiles,
        biome: this.biome,
        radius: this.radius,
        habitability: this.habitability,
        temperature: this.temperature,
        bonuses: this.bonuses,
        clime: this.clime,
        mass: this.mass,
        gravity: this.gravity,
        system: systemTracker
      }
      const newPlanet = new PLANET(mapper)
      await newPlanet.save().catch((e: any) => {
        throw new DatabaseOperation('Could not store planet in database.')
      })

      return {
        error: null,
        message: 'Planet stored correctly into Database.'
      }
    } catch (error: any) {
      return handleError(error)
    }
  }
}
