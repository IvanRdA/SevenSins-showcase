import System from '../classes/System'
import Galaxy from '../classes/Galaxy'
import Star from '../classes/Star'
import { planetProceduralProcess } from './planetProcess.controller'
import { starProceduralProcess } from './starProcess.controller'
import { asteroidProceduralProcess } from './asteroidProcess.controller'
import { createCentralSystem, createSolarSystem } from '../assets/libs'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { handleError } from '../../globals/assets/libs'
import { assignSystemPosition } from '../assets/libs'

// This is the main procedural process. This function triggers all the galaxy creation system just receiving the name of the galaxy and the number of systems that wants to be created.
export default async function mainProceduralProcess(
  name: string,
  systems: number
): Promise<any>{
  const finalGalaxy = new Galaxy(name)
  
  // First of all the algorithm creates the solar system and the central system of the simulation because are given as constraints. It is made "by hand" because the data will never change over the time.
  // Once those systems are created, the algorithm will iterate from 2 (current idx in the result list) to n (being n the indicated number of systems). In each iteration, the function
  // launches the system process, then the star process, then the planet process (and this one the moon process) and then the asteroid process. With this done the current index system is almost created
  // completely, just need to assign a position and store it into the database.
  // As can see, the process looks like a tree where each child is implemented into his father once it's instanced.
  try{
    finalGalaxy.systems.push(await createCentralSystem(finalGalaxy.sku))
    finalGalaxy.systems.push(await createSolarSystem(finalGalaxy.sku, finalGalaxy.shape))
    finalGalaxy.systems[1].position = assignSystemPosition(finalGalaxy.shape)
    for (let i = 2; i < systems; i++) {
      finalGalaxy.systems.push(new System())
      finalGalaxy.systems[i].stars = await starProceduralProcess(
        finalGalaxy.systems[i].sku,
      )
  
      const mainStar = finalGalaxy.systems[i].stars.filter((star: Star) => {
        return star.isMain === true
      })
      
      finalGalaxy.systems[i].planets = await planetProceduralProcess(
        mainStar[0].orbitalStarter,
        mainStar[0].habitabilityLevels,
        finalGalaxy.systems[i].sku,
        mainStar[0].mass
        )
        
      finalGalaxy.systems[i].asteroids = await asteroidProceduralProcess(
        mainStar[0].orbitalStarter,
        finalGalaxy.systems[i].sku
      )
      finalGalaxy.systems[i].position = assignSystemPosition(finalGalaxy.shape)

      await finalGalaxy.systems[i].storeSystem(finalGalaxy.sku).catch((error: any) => {
        console.error(error)
        throw new DatabaseOperation('Could not store system in database.')
      })
    }
    return finalGalaxy
  }catch(error: any) {
    return handleError(error)
  }

}
