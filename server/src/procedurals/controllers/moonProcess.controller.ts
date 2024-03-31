import Moon from '../classes/Moon'
import { Habitability } from '../../types'
import { handleMoonHabitability, getMaxEntities, calculateEntityGravity } from '../assets/libs'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { moonProbs } from '../assets/constants'

// Procedural process for moon items. It gets a habLevels that represents the habitability levels, a planetSKU as a father connector and a planetMass to calculate gravity of the item.
export async function moonProceduralProcess(
  habLevels: Habitability,
  planetSKU: string,
  planetMass: number
): Promise<Moon[]> {
  const finalMoons: Moon[] = []
  const maxMoons: number = getMaxEntities(moonProbs, 8)

  for (let m = 0; m < maxMoons; m++) {
    const currMoon = new Moon(m + 1)
    finalMoons.push(currMoon)
    const gravityCurrMoon = calculateEntityGravity(finalMoons[m].mass, planetMass, finalMoons[m].orbital)
    finalMoons[m].gravity = gravityCurrMoon

    finalMoons[m].habitability = handleMoonHabitability(
      finalMoons[m].clime,
      habLevels,
      finalMoons[m].bonuses.habitability
    )

      await currMoon.storeMoon(planetSKU).catch((error: any) => {
        throw new DatabaseOperation('Could not store moon in database.')

      })
    
  }

  return finalMoons
}
