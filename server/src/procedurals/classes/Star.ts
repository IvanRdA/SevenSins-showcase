import { randomUUID } from 'crypto'
import { Habitability, StarResources, StarDefinitions } from '../../types'
import Dice from '../../globals/classes/Dice'
import STAR from '../models/star.model'
import { handleError } from '../../globals/assets/libs'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { starProbs } from '../assets/constants'
import { generateEntityName } from '../assets/libs'

// Star class that defines the star items.
export default class Star {
  name: string
  starClassName: string
  sku: string
  classification: number
  starClass: string
  temperature: number
  color: string
  mass: number
  radius: number
  gravity: number
  isMain: boolean
  orbital: number
  orbitalStarter: number
  resources: StarResources
  habitabilityLevels: Habitability
  maxPerSystem: number

  
  static starDefinitions: StarDefinitions = {
    0: {
      class: 'O',
      temperature: {
        min: 33000,
        max: 150000
      },
      color: '#4D99CE', // BLUE
      mass: {
        min: 16,
        max: 50
      },
      radius: {
        min: 8.6,
        max: 25
      },
      orbitalStarter: 6,
      className: 'Blue supergiant',
      habitabilityLevels: {
        cold: 0,
        temperate: 0.6,
        warm: 1
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 5000 * new Dice(2).getThrow(false),
            antiMatter: 2500 * new Dice(2).getThrow(false),
            exoticMatter: 1200 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 1
    },
    1: {
      class: 'B',
      temperature: {
        min: 10000,
        max: 32999
      },
      color: '#00CCFF', // BLUISH
      mass: {
        min: 2.1,
        max: 15.9
      },
      radius: {
        min: 6.8,
        max: 12.59
      },
      orbitalStarter: 5,
      className: 'Blue giant',
      habitabilityLevels: {
        cold: 0,
        temperate: 0.6,
        warm: 1
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 4000 * new Dice(2).getThrow(false),
            antiMatter: 1800 * new Dice(2).getThrow(false),
            exoticMatter: 950 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 1
    },
    2: {
      class: 'A',
      temperature: {
        min: 7500,
        max: 9999
      },
      color: '#FFFFFF', // WHITE
      mass: {
        min: 1.4,
        max: 2
      },
      radius: {
        min: 1.4,
        max: 2.79
      },
      orbitalStarter: 4,
      className: 'White dwarf',
      habitabilityLevels: {
        cold: 0.2,
        temperate: 0.5,
        warm: 0.8
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 3500 * new Dice(2).getThrow(false),
            darkMatter: 600 * new Dice(2).getThrow(false),
            exoticMatter: 1350 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 3
    },
    3: {
      class: 'F',
      temperature: {
        min: 6000,
        max: 7499
      },
      color: '#FCE79A', // WHITE-YELLOW
      mass: {
        min: 1.04,
        max: 1.39
      },
      radius: {
        min: 2.15,
        max: 4.39
      },
      orbitalStarter: 2,
      className: 'Brown dwarf',
      habitabilityLevels: {
        cold: 0.4,
        temperate: 0.8,
        warm: 0.8
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 1500 * new Dice(2).getThrow(false),
            antiMatter: 300 * new Dice(2).getThrow(false),
            exoticMatter: 400 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 3
    },
    4: {
      class: 'G',
      temperature: {
        min: 5200,
        max: 5999
      },
      color: '#FFCD3C', // YELLOW
      mass: {
        min: 0.89,
        max: 1.03
      },
      radius: {
        min: 0.96,
        max: 3.14
      },
      orbitalStarter: 1,
      className: 'Yellow dwarf',
      habitabilityLevels: {
        cold: 0.6,
        temperate: 1,
        warm: 0.6
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 1200 * new Dice(2).getThrow(false),
            antiMatter: 300 * new Dice(2).getThrow(false),
            exoticMatter: 300 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 3
    },
    5: {
      class: 'K',
      temperature: {
        min: 3700,
        max: 5199
      },
      color: '#FF9529', // ORANGE
      mass: {
        min: 0.45,
        max: 0.79
      },
      radius: {
        min: 0.7,
        max: 0.95
      },
      orbitalStarter: 1,
      className: 'Subdwarf',
      habitabilityLevels: {
        cold: 0.8,
        temperate: 0.8,
        warm: 0.6
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 1000 * new Dice(2).getThrow(false),
            antiMatter: 200 * new Dice(2).getThrow(false),
            exoticMatter: 220 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 4
    },
    6: {
      class: 'M',
      temperature: {
        min: 1000,
        max: 3699
      },
      color: '#BB1122', // RED
      mass: {
        min: 0.4,
        max: 2.45
      },
      radius: {
        min: 0.1,
        max: 0.69
      },
      orbitalStarter: 1,
      className: 'Red dwarf',
      habitabilityLevels: {
        cold: 1,
        temperate: 0.6,
        warm: 0.6
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 950 * new Dice(2).getThrow(false),
            antiMatter: 180 * new Dice(2).getThrow(false),
            exoticMatter: 180 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 4
    },
    7: {
      class: 'BH',
      temperature: {
        min: 150999,
        max: 300000
      },
      color: '#000000', // BLACK
      mass: {
        min: 40,
        max: 500
      },
      radius: {
        min: 8,
        max: 120
      },
      orbitalStarter: 6,
      className: 'Black hole',
      habitabilityLevels: {
        cold: 1,
        temperate: 0.4,
        warm: 0.2
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 8000 * new Dice(2).getThrow(false),
            darkMatter: 5000 * new Dice(2).getThrow(false),
            antiMatter: 3500 * new Dice(2).getThrow(false),
            exoticMatter: 4000 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 2
    },
    8: {
      class: 'N',
      temperature: {
        min: 180000,
        max: 300000
      },
      color: '#000000', // WHITE
      mass: {
        min: 60,
        max: 200
      },
      radius: {
        min: 3,
        max: 9
      },
      orbitalStarter: 8,
      className: 'Neutrons star',
      habitabilityLevels: {
        cold: 0.2,
        temperate: 0.4,
        warm: 1
      },
      resources: {
        primary: {
          energy: {
            electromagnetism: 12500 * new Dice(2).getThrow(false),
            antiMatter: 3000 * new Dice(2).getThrow(false),
            exoticMatter: 6000 * new Dice(2).getThrow(false),
          }
        }
      },
      maxPerSystem: 1
    }
  }

  constructor(
    classification?: number,
    orbital?: number,
    name?: string,
    starClassName?: string,
    starClass?: string,
    color?: string,
    temperature?: number,
    radius?: number,
    mass?: number,
    orbitalStarter?: number,
    resources?: StarResources
  ) {
    this.orbital = orbital ?? 0
    this.classification = classification ?? this.getStarClassification()
    this.name = name ?? generateEntityName()
    this.starClassName = starClassName ?? this.getStarClassName()
    this.sku = randomUUID()
    this.starClass = starClass ?? this.getStarClass()
    this.temperature = temperature ?? this.getStarTemperature()
    this.color = color ?? this.getStarColor()
    this.mass = mass ?? this.getStarMass()
    this.radius = radius ?? this.getStarRadius()
    this.gravity = this.calculateGravity()
    this.orbitalStarter = orbitalStarter ?? this.getStarOrbitalStarter()
    this.isMain = false
    this.resources = resources ?? this.getStarResources()
    this.habitabilityLevels = this.getHabitabilityLevels()
    this.maxPerSystem = this.getStarMaxPerSystem()
  }

  private getStarClassification(): number {
    const totalWeight = starProbs.reduce(
      (sum, probability) => sum + probability,
      0
    )
    const randomValue = new Dice(totalWeight).getThrow(false)

    let accumulatedWeight = 0
    for (let i = 0; i <= starProbs.length - 1; i++) {
      accumulatedWeight += starProbs[i]
      if (randomValue <= accumulatedWeight) {
        return i
      }
    }

    return 5
  }

  private getStarClassName(): string {
    return Star.starDefinitions[this.classification].className
  }

  private getStarTemperature(): number {
    let temperature = Math.floor(
      Star.starDefinitions[this.classification].temperature.min
    )
    const diff =
      Star.starDefinitions[this.classification].temperature.max - temperature
    const temp = new Dice(diff).getThrow(false)

    return temperature + temp
  }

  private getStarColor(): string {
    return Star.starDefinitions[this.classification].color
  }

  private getStarMass(): number {
    let mass = Star.starDefinitions[this.classification].mass.min
    const diff = Star.starDefinitions[this.classification].mass.max - mass
    const massiveness = new Dice(diff).getThrow(false)

    return mass + massiveness
  }

  private getStarClass(): string {
    return Star.starDefinitions[this.classification].class
  }

  private getStarOrbitalStarter(): number {
    return Star.starDefinitions[this.classification].orbitalStarter
  }

  private getStarRadius(): number {
    let radius = Star.starDefinitions[this.classification].radius.min
    const diff = Star.starDefinitions[this.classification].radius.max - radius
    const radiusNum = new Dice(diff).getThrow(false)

    return radius + radiusNum
  }

  private calculateGravity(): number {
  const G = 0o66743
  
  return parseFloat((G * this.mass).toExponential(3))
  }

  private getStarResources(): StarResources {
    return Star.starDefinitions[this.classification].resources
  }

  private getHabitabilityLevels(): Habitability {
    return Star.starDefinitions[this.classification].habitabilityLevels
  }

  private getStarMaxPerSystem(): number {
    return Star.starDefinitions[this.classification].maxPerSystem
  }

  public async storeStar(
    systemTracker: string
  ): Promise<any> {
    try {
      const mapper = {
        name: this.name,
        starClassName: this.starClassName,
        sku: this.sku,
        starClass: this.starClass,
        temperature: this.temperature,
        color: this.color,
        mass: this.mass,
        radius: this.radius,
        gravity: this.gravity,
        isMain: this.isMain,
        orbital: this.orbital,
        orbitalStarter: this.orbitalStarter,
        resources: this.resources,
        habitabilityLevels: this.habitabilityLevels,
        system: systemTracker
      }
      
      const newStar = new STAR(mapper)
      await newStar.save().catch((e: any) => {
        throw new DatabaseOperation('Could not store star in database.')
      })

      return {
        error: null,
        message: 'Star stored correctly into Database.'
      }
    } catch (error: any) {
      return handleError(error)
    }
  }
}
