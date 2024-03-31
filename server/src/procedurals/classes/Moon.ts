import { Habitability, Tiles, MoonDefinitions, MoonBonus } from '../../types'
import { randomUUID } from 'crypto'
import Dice from '../../globals/classes/Dice'
import MOON from '../models/moon.model'
import { handleError } from '../../globals/assets/libs'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { moonBiomes } from '../assets/constants'
import { generateEntityName } from '../assets/libs'

// Moon class that defines the moon items.
export default class Moon {
  name: string
  sku: string
  orbital: number
  size: string
  mass: number
  radius: number
  gravity: number
  tiles: Tiles
  category: number
  habitability: Habitability
  bonuses: MoonBonus
  clime: string
  temperature: number
  biome: string

  static temperatureTresholds = {
    min: 123,
    max: 423
  }
  static moonDefinition: MoonDefinitions = {
    0: {
      class: 'Dwarf',
      mass: {
        min: 0.012,
        max: 0.2
      },
      radius: {
        min: 0.2,
        max: 0.5
      },
      tiles: {
        construction: {
          min: 6,
          max: 11
        },
        defensive: {
          min: 5,
          max: 10
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
        min: 0.2,
        max: 0.8
      },
      radius: {
        min: 0.5,
        max: 1
      },
      tiles: {
        construction: {
          min: 9,
          max: 18
        },
        defensive: {
          min: 7,
          max: 12
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
        min: 0.8,
        max: 1.6
      },
      radius: {
        min: 1,
        max: 2.1
      },
      tiles: {
        construction: {
          min: 15,
          max: 25
        },
        defensive: {
          min: 10,
          max: 15
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
    name?: string,
    category?: number,
    radius?: number,
    mass?: number,
    temperature?: number,
    biome?: string
  ) {
    this.name = name ?? generateEntityName()
    this.sku = randomUUID()
    this.orbital = orbital
    this.category = category ?? this.getMoonCategory()
    this.tiles = this.getMoonTiles()
    this.size = this.getMoonSize()
    this.radius = radius ?? this.getMoonRadius()
    this.mass = mass ?? this.getMoonMass()
    this.gravity = 0
    this.habitability = this.generateNullHabitability()
    this.bonuses = this.getMoonBonuses()
    this.temperature = temperature ?? this.getMoonTemperature()
    this.clime = this.getMoonClime()
    this.biome = biome ?? this.getMoonBiome()
  }

  private getMoonCategory(): number {
    const len = Object.keys(Moon.moonDefinition).length
    const idx = new Dice(len).getThrow()

    return idx
  }

  private getMoonSize(): string {
    return Moon.moonDefinition[this.category].class
  }

  private getMoonTiles(): Tiles {
    const minConstTiles =
      Moon.moonDefinition[this.category].tiles.construction.min
    const minDefTiles = Moon.moonDefinition[this.category].tiles.defensive.min

    const maxConstTiles =
      Moon.moonDefinition[this.category].tiles.construction.max
    const maxDefTiles = Moon.moonDefinition[this.category].tiles.defensive.max

    return {
      construction:
        minConstTiles + new Dice(maxConstTiles - minConstTiles).getThrow(),
      defensive: minDefTiles + new Dice(maxDefTiles - minDefTiles).getThrow()
    }
  }

  private getMoonRadius(): number {
    const minR = Moon.moonDefinition[this.category].radius.min
    const maxR = Moon.moonDefinition[this.category].radius.max

    return minR + new Dice(maxR - minR).getThrow()
  }

  private getMoonMass(): number {
    const minM = Moon.moonDefinition[this.category].mass.min
    const maxM = Moon.moonDefinition[this.category].mass.max

    return minM + new Dice(maxM - minM).getThrow()
  }

  private generateNullHabitability(): Habitability {
    return { cold: 0, temperate: 0, warm: 0 }
  }

  private getMoonBonuses(): MoonBonus {
    const baseCase: MoonBonus = {
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

    const bonuses = Moon.moonDefinition[this.category].bonuses as Record<
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

  private getMoonClime(): string {
    const range = Moon.temperatureTresholds.max - Moon.temperatureTresholds.min

    if (this.temperature < Moon.temperatureTresholds.min + range * 0.333) {
      return 'Cold'
    } else if (
      this.temperature >= Moon.temperatureTresholds.min + range * 0.333 &&
      this.temperature < Moon.temperatureTresholds.min + range * 0.67
    ) {
      return 'Temperate'
    } else {
      return 'Warm'
    }
  }

  private getMoonTemperature(): number {
    const minT = Moon.temperatureTresholds.min
    const maxT = Moon.temperatureTresholds.max

    return minT + new Dice(maxT - minT).getThrow()
  }

  private getMoonBiome(): string {
    return moonBiomes[new Dice(moonBiomes.length).getThrow()]
  }

  public async storeMoon(
    planetTracker: string
  ): Promise<any> {
    try {
      const mapper = {
        name: this.name,
        sku: this.sku,
        orbital: this.orbital,
        size: this.size,
        mass: this.mass,
        radius: this.radius,
        gravity: this.gravity,
        tiles: this.tiles,
        habitability: this.habitability,
        bonuses: this.bonuses,
        clime: this.clime,
        temperature: this.temperature,
        planet: planetTracker,
        biome: this.biome
      }
      const newMoon = new MOON(mapper)
      await newMoon.save().catch((e: any) => {
        throw new DatabaseOperation('Could not store moon in database.')
      })

      return {
        error: null,
        message: 'Moon stored correctly into Database.'
      }
    } catch (error: any) {
      return handleError(error)
    }
  }
}
