import { Habitability } from '../../types'
import Planet from '../classes/Planet'
import Star from '../classes/Star'
import Moon from '../classes/Moon'
import System from '../classes/System'
import { asteroidProceduralProcess } from '../controllers/asteroidProcess.controller'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { handleError } from '../../globals/assets/libs'
import Dice from '../../globals/classes/Dice'
import { Position } from '../../types'
import { nameSyllables } from './constants'

const BONUS_FACTOR = 1.12
const MALUS_FACTOR = 0.76

// List of items in the real solar system.
const planets = [
  {
    orbital: 1,
    category: 0,
    name: 'Mercury',
    type: 'Solid',
    moons: [],
    size: 'Dwarf',
    biome: 'Tomb',
    radius: 0.383,
    temperature: 440,
    mass: 0.055
  },
  {
    orbital: 2,
    category: 0,
    name: 'Venus',
    type: 'Solid',
    moons: [],
    size: 'Dwarf',
    biome: 'Tomb',
    radius: 0.949,
    temperature: 735,
    mass: 0.815
  },
  {
    orbital: 3,
    category: 1,
    name: 'Earth',
    type: 'Solid',
    moons: [
      {
        name: 'Moon',
        orbital: 1,
        size: 'Regular',
        radius: 1,
        mass: 1,
        category: 1,
        temperature: 200
      }
    ],
    size: 'Dwarf',
    biome: 'Gaia',
    radius: 1,
    temperature: 288,
    mass: 1
  },
  {
    orbital: 4,
    category: 0,
    name: 'Mars',
    type: 'Solid',
    moons: [
      {
        name: 'Fobos',
        orbital: 1,
        size: 'Dwarf',
        radius: 0.000212,
        mass: 0.000015,
        category: 0,
        temperature: 120
      },
      {
        name: 'Deimos',
        orbital: 2,
        size: 'Dwarf',
        radius: 0.000078,
        mass: 0.0000024,
        category: 0,
        temperature: 120
      }
    ],
    size: 'Dwarf',
    biome: 'Tomb',
    radius: 0.532,
    temperature: 227,
    mass: 0.107
  },
  {
    orbital: 5,
    category: 2,
    name: 'Jupiter',
    type: 'Gas',
    moons: [
      {
        name: 'Io',
        orbital: 1,
        size: 'Dwarf',
        radius: 0.28,
        mass: 0.015,
        category: 0,
        temperature: 130
      },
      {
        name: 'Europa',
        orbital: 2,
        size: 'Dwarf',
        radius: 0.245,
        mass: 0.008,
        category: 0,
        temperature: 103
      },
      {
        name: 'Ganimedes',
        orbital: 3,
        size: 'Dwarf',
        radius: 0.41,
        mass: 0.025,
        category: 0,
        temperature: 110
      },
      {
        name: 'Calisto',
        orbital: 4,
        size: 'Dwarf',
        radius: 0.37,
        mass: 0.018,
        category: 0,
        temperature: 134
      }
    ],
    size: 'Giant',
    biome: 'Tomb',
    radius: 11.2,
    temperature: 120,
    mass: 317.8
  },
  {
    orbital: 6,
    category: 2,
    name: 'Saturn',
    type: 'Gas',
    moons: [
      {
        name: 'Titan',
        orbital: 1,
        size: 'Dwarf',
        radius: 0.4,
        mass: 0.0225,
        category: 0,
        temperature: 94
      },
      {
        name: 'Encelado',
        orbital: 2,
        size: 'Dwarf',
        radius: 0.0661,
        mass: 0.000004,
        category: 0,
        temperature: 75
      }
    ],
    size: 'Giant',
    biome: 'Tomb',
    radius: 9.449,
    temperature: 88,
    mass: 95.2
  },
  {
    orbital: 7,
    category: 2,
    name: 'Uranus',
    type: 'Solid',
    moons: [
      {
        name: 'Titania',
        orbital: 1,
        size: 'Dwarf',
        radius: 0.131,
        mass: 0.00029,
        category: 0,
        temperature: 70
      },
      {
        name: 'Oberon',
        orbital: 2,
        size: 'Dwarf',
        radius: 0.119,
        mass: 0.00026,
        category: 0,
        temperature: 70
      }
    ],
    size: 'Giant',
    biome: 'Tomb',
    radius: 4.007,
    temperature: 59,
    mass: 14.5
  },
  {
    orbital: 8,
    category: 2,
    name: 'Neptune',
    type: 'Solid',
    moons: [
      {
        name: 'Triton',
        orbital: 1,
        size: 'Dwarf',
        radius: 0.212,
        mass: 0.00003,
        category: 0,
        temperature: 38
      }
    ],
    size: 'Giant',
    biome: 'Tomb',
    radius: 3.883,
    temperature: 48,
    mass: 17.1
  }
]

// Methods that generates the planets and moons habitability taking as priority the distance from the main star.
export function handlePlanetHabitability(
  biome: string,
  clime: string,
  star: Habitability,
  bonus: number
): Habitability {
  if (biome === 'Tomb') {
    return { cold: 0, temperate: 0, warm: 0 }
  } else if (biome === 'Gaia') {
    return { cold: 1, temperate: 1, warm: 1 }
  }

  return handlePlanetClime(clime, star, bonus)
}
export function handlePlanetClime(
  clime: string,
  star: Habitability,
  bonus: number
): Habitability {
  if (clime === 'Cold') {
    return {
      cold: star.cold * BONUS_FACTOR + bonus,
      temperate: star.temperate,
      warm: star.warm * MALUS_FACTOR
    }
  } else if (clime === 'Temperate') {
    return {
      cold: star.cold,
      temperate: star.temperate * BONUS_FACTOR + bonus,
      warm: star.warm
    }
  } else {
    return {
      cold: star.cold * MALUS_FACTOR,
      temperate: star.temperate,
      warm: star.warm * BONUS_FACTOR + bonus
    }
  }
}
export function handleMoonHabitability(
  clime: string,
  star: Habitability,
  bonus: number
): Habitability {
  if (clime === 'Cold') {
    return {
      cold: star.cold * BONUS_FACTOR + bonus,
      temperate: star.temperate,
      warm: star.warm * MALUS_FACTOR
    }
  } else if (clime === 'Temperate') {
    return {
      cold: star.cold,
      temperate: star.temperate * BONUS_FACTOR + bonus,
      warm: star.warm
    }
  } else {
    return {
      cold: star.cold * MALUS_FACTOR,
      temperate: star.temperate,
      warm: star.warm * BONUS_FACTOR + bonus
    }
  }
}

// Method that creates by non-procedural process a real copy of the solar system.
export async function createSolarSystem(galaxyTracker: string, galaxyShape: string): Promise<any> {
  const solarSys: System = new System('Solar System')
  solarSys.stars.push(
    new Star(4, 0, 'Sun', undefined, undefined, undefined, 5773, 1, 1)
  )
  try{

    solarSys.stars[0].isMain = true
    solarSys.position = assignSystemPosition(galaxyShape)
    await solarSys.stars[0].storeStar(solarSys.sku).catch((e: any) => {
      throw new DatabaseOperation('Could not store star in database.')
    })
  
    for (let p = 0; p <= planets.length - 1; p++) {
      const curr = planets[p]
      solarSys.planets.push(
        new Planet(
          curr.orbital,
          curr.category,
          curr.name,
          curr.type,
          undefined,
          curr.size,
          curr.biome,
          undefined,
          curr.radius,
          curr.temperature,
          curr.mass
        )
      )
  
      if (planets[p].name === 'Earth') {
        solarSys.planets[p].habitability = { cold: 1, temperate: 1, warm: 1 }
      }
      const moons: Moon[] = []
      for (let m = 0; m <= planets[p].moons.length - 1; m++) {
        moons.push(
          new Moon(
            planets[p].moons[m].orbital,
            planets[p].moons[m].name,
            planets[p].moons[m].category,
            planets[p].moons[m].radius,
            planets[p].moons[m].mass,
            planets[p].moons[m].temperature
          )
        )
        moons[m].habitability = { cold: 0, temperate: 0, warm: 0 }
        moons[m].gravity = calculateEntityGravity(moons[m].mass, planets[p].mass, moons[m].orbital)
        await moons[m].storeMoon(solarSys.planets[p].sku).catch((e: any) => {
          throw new DatabaseOperation('Could not store moon in database.')
        })
      }
  
      solarSys.planets[p].moons = moons
      solarSys.planets[p].gravity = calculateEntityGravity(planets[p].mass, solarSys.stars[0].mass, planets[p].orbital)

      await solarSys.planets[p].storePlanet(solarSys.sku).catch((e: any) => {
        throw new DatabaseOperation('Could not store planet in database.')
      })
    }
  
    solarSys.asteroids = await asteroidProceduralProcess(
      solarSys.stars[0].orbitalStarter,
      solarSys.sku
    )
    
    await solarSys.storeSystem(galaxyTracker).catch((e: any) => {
      throw new DatabaseOperation('Could not store system in database.')
    })
    return solarSys
  }catch(error: any) {
    return handleError(error)
  }
}

// Method that creates by non-procedural process a system with a super massive black hole in the [0, 0, 0] (center) position of the galaxy.
export async function createCentralSystem(galaxyTracker: string): Promise<System> {
  const central = new System('Central system', [
    new Star(
      7,
      0,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      100,
      500
    )
  ])
  central.stars[0].isMain = true
  await central.stars[0].storeStar(central.sku).catch((e: any) => {
    throw new DatabaseOperation('Could not store star in database.')
  })
  central.position = { z: 0, y: 0, x: 0 }
  await central.storeSystem(galaxyTracker).catch((e: any) => {
    throw new DatabaseOperation('Could not store system in database.')
  })

  return central
}

// This method generates the max number of entities by type in a system.
export function getMaxEntities(entity: number[], diceFaces: number): number {
  const totalWeight = entity.reduce(
    (sum, probability) => sum + probability,
    0
  )
  const randomValue = new Dice(totalWeight).getThrow(false)
  let accumulated = 0
  for(let i = 0; i <= entity.length - 1; i++){
    accumulated += entity[i]
    if(randomValue <= accumulated){
      return i
    }
  }

  return new Dice(diceFaces).getThrow()
}

// Method that generates a random name for each entity on the simulation (but the ones that are explicitly indicated)
export function generateEntityName(): string {
  const firstWord = new Dice(2).getThrow() + 1
  const secondWord = new Dice(3).getThrow() + 1
  const dice = new Dice(1).getThrow(false)
  let lastName = ''

  if (dice >= 0.85) {
    return `${
      nameSyllables.specials[
        new Dice(nameSyllables.specials.length).getThrow()
      ]
    }${new Dice(10000).getThrow()}`
  }

  for (let f = 0; f <= firstWord; f++) {
    lastName +=
      nameSyllables.syllables[
        new Dice(nameSyllables.syllables.length).getThrow()
      ]
  }
  lastName += ' '
  for (let s = 0; s <= secondWord; s++) {
    lastName +=
      nameSyllables.syllables[
        new Dice(nameSyllables.syllables.length).getThrow()
      ]
  }

  const nameArr = lastName.split(' ')
  nameArr[0] = nameArr[0].charAt(0).toLocaleUpperCase() + nameArr[0].slice(1)
  nameArr[1] = nameArr[1].charAt(0).toLocaleUpperCase() + nameArr[1].slice(1)

  lastName = nameArr.join(' ')

  return lastName
}

// In order to make easier the data of the simulation, I've implemented a two way force to calculate the gravity of the items. It falls in the main star, the own entity and the distance between them.
export function calculateEntityGravity(entityMass: number, starMass: number, orbital: number): number {
  const G = 0o66743
  
  return parseFloat((G * (entityMass * starMass) / (orbital * orbital)).toExponential(3))
}

// Method that randomly generates a coordinate position given a galaxy shape.
export function assignSystemPosition(galaxyShape: string): Position {
  if(galaxyShape === 'Spheric'){
    const radius = 2400;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const xPos = radius * Math.sin(phi) * Math.cos(theta);
    const yPos = radius * Math.sin(phi) * Math.sin(theta);
    const zPos = radius * Math.cos(phi);

    return { x: xPos, y: yPos, z: zPos };
  }else if(galaxyShape === 'Spyral'){
    const radius = 2400;
    const numArms = 6;
    const armAngle = (Math.PI * 2) / numArms;
    const rotationSpeed = 0.2;

    const randomAngle = Math.random() * armAngle;
    const arm = Math.floor(Math.random() * numArms);
    const angle = arm * armAngle + randomAngle;

    // Agrega rotación para simular espiral
    const rotation = rotationSpeed * radius;
    const spiraledRadius = radius + rotation * angle;

    const xPos = spiraledRadius * Math.cos(angle);
    const yPos = spiraledRadius * Math.sin(angle);
    const zPos = (Math.random() - 0.5) * radius;

    return { x: xPos, y: yPos, z: zPos };
  }else{
    const blocksPerDimension = 400
    const range = 2400

    const xBlock =
      new Dice(blocksPerDimension).getThrow() - blocksPerDimension / 2
    const yBlock =
      new Dice(blocksPerDimension).getThrow() - blocksPerDimension / 2
    const zBlock =
      new Dice(blocksPerDimension).getThrow() - blocksPerDimension / 2

    const xPos = xBlock * (range / blocksPerDimension)
    const yPos = yBlock * (range / blocksPerDimension)
    const zPos = zBlock * (range / blocksPerDimension)

    return { z: xPos, y: yPos, x: zPos }
  }
}