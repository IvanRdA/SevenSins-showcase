import Planet from '../classes/Planet'
import { planetProbs } from '../assets/constants'
import { Habitability } from '../../types'
import { getMaxEntities, handlePlanetHabitability, calculateEntityGravity } from '../assets/libs'
import { moonProceduralProcess } from './moonProcess.controller'
import { DatabaseOperation } from '../../globals/classes/Errors'

// Procedural process for planet items. It gets a minOrbital that represents the minimum distance from the main star, habLevels that represents habitability levels of the star,
// a systemSKU that will be stored as a tree index for future queries and the starMass to calculate the gravity of the item. This method triggers the moon process.
export async function planetProceduralProcess(
  minOrbital: number,
  habLevels: Habitability,
  systemSKU: string,
  starMass: number
): Promise<Planet[]> {
  const finalPlanets: Planet[] = []
  const maxPlanets = getMaxEntities(planetProbs, (13 - minOrbital))

  for (let p = 0; p < maxPlanets; p++) {
    finalPlanets.push(new Planet(minOrbital + p))

    const currP = finalPlanets[p]

    const gravityCurrP = calculateEntityGravity(finalPlanets[p].mass, starMass, finalPlanets[p].orbital)
    finalPlanets[p].gravity = gravityCurrP

    if (currP.type !== 'Gas') {
      finalPlanets[p].habitability = handlePlanetHabitability(
        currP.biome,
        currP.clime,
        habLevels,
        currP.bonuses.habitability
      )
    }
    
      finalPlanets[p].moons = await moonProceduralProcess(
        habLevels,
        finalPlanets[p].sku,
        finalPlanets[p].mass
      )
    

    await finalPlanets[p].storePlanet(systemSKU).catch((error: any) => {
      throw new DatabaseOperation('Could not store planet in database.')
    })
  }

  return finalPlanets
}
