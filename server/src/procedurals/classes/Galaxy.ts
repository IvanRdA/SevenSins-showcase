import Dice from '../../globals/classes/Dice'
import System from './System'
import GALAXY from '../models/galaxy.model'
import { randomUUID } from 'crypto'
import { handleError } from '../../globals/assets/libs'
import { DatabaseOperation } from '../../globals/classes/Errors'

// Galaxy class that defines the galaxy items.
export default class Galaxy {
  name: string
  sku: string
  shape: string
  systems: System[]

  static galaxyShape = ['Spyral', 'Spheric', 'Irregular']

  constructor(name: string) {
    this.name = name
    this.sku = randomUUID()
    this.shape = this.generateGalaxyShape()
    this.systems = []
  }

  private generateGalaxyShape(): string {
    return Galaxy.galaxyShape[new Dice(Galaxy.galaxyShape.length).getThrow()]
  }

  public async storeGalaxy(): Promise<any> {
    try {
      const skus: string[] = []
      this.systems.map((system) => {
        skus.push(system.sku)
      })
      const mapper = {
        name: this.name,
        sku: this.sku,
        shape: this.shape,
        systems: skus
      }
      const newGalaxy = new GALAXY(mapper)
      await newGalaxy.save().catch((e: any) => {
        throw new DatabaseOperation('Could not store galaxy in database.')
      })

      return {
        error: null,
        message: 'Galaxy stored correctly into Database.'
      }
    } catch (error: any) {
      return handleError(error)
    }
  }
}
