import Asteroid from '../classes/Asteroid'
import Dice from '../../globals/classes/Dice'
import { DatabaseOperation } from '../../globals/classes/Errors'

// Procedural process for asteroid items. It gets a minOrbital that represents the minimum distance from the main star and a systemSKU that will be stored as a tree index for future queries.
export async function asteroidProceduralProcess(
  minOrbital: number,
  systemSKU: string
): Promise<Asteroid[]> {
  const finalAsteroids: Asteroid[] = []
  const maxAsteroids = new Dice(10).getThrow() + 1

  for (let a = 0; a < maxAsteroids; a++) {
    const currAsteroid = new Asteroid(minOrbital + a + 0.5)
    finalAsteroids.push(currAsteroid)
    await currAsteroid.storeAsteroid(systemSKU).catch((error: any) => {
      throw new DatabaseOperation('Could not store asteroid in database.')
    })
  }

  return finalAsteroids
}
