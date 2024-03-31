import { randomUUID } from 'crypto'
import { Position } from '../../types'
import Planet from './Planet'
import Star from './Star'
import Asteroid from './Asteroid'
import SYSTEM from '../models/system.model'
import { handleError } from '../../globals/assets/libs'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { generateEntityName } from '../assets/libs'

export enum Factions {
  Humans = 'Humans',
  Banished = 'Banished',
  Xenomorphs = 'Xenomorphs',
  Neutral = 'Neutral'
}

// System class that defines the system items.
export default class System {
  name: string
  sku: string
  position: Position
  stars: Star[]
  planets: Planet[]
  asteroids: Asteroid[]
  owner: Factions

  constructor(name?: string, stars?: Star[], planets?: Planet[]) {
    this.name = name ?? generateEntityName()
    this.sku = randomUUID()
    this.position = {z: 0, y: 0, x: 0}
    this.stars = stars ?? []
    this.planets = planets ?? []
    this.asteroids = []
    this.owner = this.generateSystemOwner()
  }

  private generateSystemOwner(): Factions {
    const ranges: {
      faction: Factions
      x: { min: number; max: number }
      y: { min: number; max: number }
      z: { min: number; max: number }
    }[] = [
      {
        faction: Factions.Humans,
        x: { min: -2400, max: -1200 },
        y: { min: -2400, max: -1200 },
        z: { min: -2400, max: -1200 }
      },
      {
        faction: Factions.Humans,
        x: { min: -1200, max: 0 },
        y: { min: -2400, max: 0 },
        z: { min: -2400, max: -1200 }
      },

      {
        faction: Factions.Banished,
        x: { min: 0, max: 1200 },
        y: { min: -2400, max: 0 },
        z: { min: -2400, max: -1200 }
      },
      {
        faction: Factions.Banished,
        x: { min: 1200, max: 2400 },
        y: { min: -2400, max: -1200 },
        z: { min: -2400, max: 0 }
      },

      {
        faction: Factions.Xenomorphs,
        x: { min: -2400, max: 0 },
        y: { min: 0, max: 1200 },
        z: { min: -2400, max: -1200 }
      },
      {
        faction: Factions.Xenomorphs,
        x: { min: 0, max: 1200 },
        y: { min: 0, max: 2400 },
        z: { min: -2400, max: 0 }
      },

      {
        faction: Factions.Neutral,
        x: { min: -400, max: 400 },
        y: { min: -400, max: 400 },
        z: { min: -400, max: 400 }
      }
    ]

    for (const range of ranges) {
      if (
        this.position.x >= range.x.min &&
        this.position.x <= range.x.max &&
        this.position.y >= range.y.min &&
        this.position.y <= range.y.max &&
        this.position.z >= range.z.min &&
        this.position.z <= range.z.max
      ) {
        return range.faction
      }
    }

    return Factions.Neutral
  }

  public async storeSystem(galaxyTracker: string): Promise<any> {
    try {
      const starsSkus: string[] = []
      const planetsSkus: string[] = []
      const asteroidsSkus: string[] = []

      this.stars.map((star) => {
        starsSkus.push(star.sku)
      })
      this.planets.map((planet) => {
        planetsSkus.push(planet.sku)
      })
      this.asteroids.map((asteroid) => {
        asteroidsSkus.push(asteroid.sku)
      })

      const mapper = {
        name: this.name,
        sku: this.sku,
        position: this.position,
        stars: starsSkus,
        planets: planetsSkus,
        asteroids: asteroidsSkus,
        owner: this.owner,
        galaxy: galaxyTracker
      }
      const newSystem = new SYSTEM(mapper)
      await newSystem.save().catch((e: any) => {
        throw new DatabaseOperation('Could not store system in database.')
      })

      return {
        error: null,
        message: 'System stored correctly into Database.'
      }
    } catch (error: any) {
      return handleError(error)
    }
  }
}
