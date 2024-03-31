import { randomUUID } from 'crypto'
import Dice from '../../globals/classes/Dice'
import ASTEROID from '../models/asteroid.model'
import { handleError } from '../../globals/assets/libs'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { AsteroidResources, AsteroidDefinitions } from '../../types'

// Asteroid class that defines the asteroid items.
export default class Asteroid {
  name: string
  sku: string
  orbital: number
  category: number
  size: string
  resources: AsteroidResources

  static typeProbabilities = [0.4, 0.31, 0.16, 0.13]
  static asteroidDefinition: AsteroidDefinitions = {
    0: {
      size: 'Small',
      resources: {
        primary: {
          minerals: {
            steel: 20,
            iron: 15,
            crystals: 30,
            gold: 10,
            uranium: 13
          },
          gases: {
            nitrogen: 18,
            helium: 15,
            neon: 22,
            argon: 14
          }
        }
      }
    },
    1: {
      size: 'Medium',
      resources: {
        primary: {
          minerals: {
            steel: 45,
            iron: 28,
            crystals: 42,
            gold: 29,
            uranium: 22
          },
          gases: {
            nitrogen: 27,
            helium: 31,
            neon: 33,
            argon: 26
          }
        }
      }
    },
    2: {
      size: 'Giant',
      resources: {
        primary: {
          minerals: {
            steel: 66,
            iron: 41,
            crystals: 58,
            gold: 38,
            uranium: 31
          },
          gases: {
            nitrogen: 44,
            helium: 56,
            neon: 39,
            argon: 44
          }
        }
      }
    },
    3: {
      size: 'Massive',
      resources: {
        primary: {
          minerals: {
            steel: 98,
            iron: 77,
            crystals: 92,
            gold: 64,
            uranium: 58
          },
          gases: {
            nitrogen: 61,
            helium: 88,
            neon: 63,
            argon: 71
          }
        }
      }
    }
  }

  constructor(orbital: number) {
    this.name = `Asteroid ASCL-${new Dice(2000000).getThrow()}`
    this.sku = randomUUID()
    this.orbital = orbital
    this.category = this.getAsteroidCategory()
    this.size = this.getAsteroidSize()
    this.resources = this.getAsteroidResources()
  }

  private getAsteroidCategory(): number {
    const totalWeight = Asteroid.typeProbabilities.reduce(
      (sum, probability) => sum + probability,
      0
    )
    const randomValue = new Dice(totalWeight).getThrow(false)

    let accumulatedWeight = 0
    for (let i = 0; i <= Asteroid.typeProbabilities.length - 1; i++) {
      accumulatedWeight += Asteroid.typeProbabilities[i]
      if (randomValue <= accumulatedWeight) {
        return i
      }
    }

    return 0
  }

  private getAsteroidSize(): string {
    return Asteroid.asteroidDefinition[this.category].size
  }

  private getAsteroidResources(): AsteroidResources {
    return Asteroid.asteroidDefinition[this.category].resources
  }

  public async storeAsteroid(
    systemTracker: string
  ): Promise<any> {
    try {
      const mapper = {
        name: this.name,
        sku: this.sku,
        orbital: this.orbital,
        size: this.size,
        resources: this.resources,
        system: systemTracker
      }
      const newAsteroid = new ASTEROID(mapper)
      await newAsteroid.save().catch((e:any) => {
        throw new DatabaseOperation('Could not store asteroid in database.')
      })

      return {
        error: null,
        message: 'Asteroid stored correctly into Database.'
      }
    } catch (error: any) {
      return handleError(error)
    }
  }
}
