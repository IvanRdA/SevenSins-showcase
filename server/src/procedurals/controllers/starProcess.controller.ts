import Star from '../classes/Star'
import Dice from '../../globals/classes/Dice'
import { DatabaseOperation } from '../../globals/classes/Errors'

// Star procedural process. This is maybe the most complicated because the level of given constraints in star creation.
// Follow the comments through the method to know more about.
export async function starProceduralProcess(
  systemSKU: string
): Promise<Star[]> {
  let finalStars: Star[] = []
  // * THROW A DICE TO GET NUMBER OF STARS IN THE SYSTEM *
  const maxStars = new Dice(4).getThrow() + 1

  // * CREATE AN ARRAY WITH THE CREATED STARS *
  for (let i = 0; i <= maxStars; i++) {
    finalStars.push(new Star())
  }

  // * FILTER THE ARRAY AND GET JUST BLACK HOLES *
  const hasBH = finalStars.filter((star) => {
    return star.starClassName === 'Black hole'
  })
  // * FILTER THE ARRAY AND GET JUST NEUTRONS STARS *
  const hasNeutrons = finalStars.filter((star) => {
    return star.starClassName === 'Neutrons star'
  })

  // * CHECK IF THE ARRAY HAS ONE OR MORE NEUTRONS STARS. IF SO GET THE FIRST ONE, ASSIGN IT AS MAIN WITH AN ORBITAL OF 0 AND RETURN THE ARRAY *
  if (hasNeutrons.length >= 1) {
    finalStars = [hasNeutrons[0]]
    finalStars[0].isMain = true
    finalStars[0].orbital = 0

    await finalStars[0].storeStar(systemSKU).catch((error: any) => {
      throw new DatabaseOperation('Could not store star in database.')
    })

    return finalStars
  }
  // * CHECK IF THE ARRAY HAS ONE OR MORE BLACK HOLES. IF SO, THROW ANOTHER DICE AND CHECK IF IT'S BIGGER THAN 0.8, IF THAT'S TRUE CREATE A SECOND BLACK HOLE. DELETE THE REST OF STARS CREATED AND RETURN THE ARRAY *
  if (hasBH.length >= 1) {
    const dice = new Dice(1).getThrow(false)
    finalStars = [hasBH[0]]

    if (dice >= 0.8) {
      finalStars.push(new Star(7))
      finalStars[1].isMain = true
      finalStars[1].orbital = 1

      await finalStars[1].storeStar(systemSKU).catch((error: any) => {
        throw new DatabaseOperation('Could not store star in database.')
      })
    }

    finalStars[0].isMain = true
    finalStars[0].orbital = 1

    await finalStars[0].storeStar(systemSKU).catch((error: any) => {
      throw new DatabaseOperation('Could not store star in database.')
    })

    return finalStars
  }

  // * HANDLE THE CASES WHERE BLACK HOLES EITHER NEUTRONS STARS WERE CREATED *
  const sortedByMax = finalStars.sort((a: any, b: any): number => {
    return a.maxPerSystem - b.maxPerSystem
  })
  // * GET THE SORTED ARRAY BY MAX STARS PER SYSTEM, GET THE FIRST ELEMENT (ONE WITH LESS STARS ALLOWED) AND DELETE ELEMENTS STILL ARRAY LENGTH AND MAX PER SYSTEM ARE EQUALS *
  while (sortedByMax.length > sortedByMax[0].maxPerSystem) {
    sortedByMax.pop()
  }

  // * SORT THE RESULTANT ARRAY BY MASS IN ORDER TO SELECT THE MAIN STAR AND ORBITALS *
  const sortedByMass = sortedByMax.sort((a: any, b: any): number => {
    return b.mass - a.mass
  })

  if (sortedByMax.length > 2) {
    // * IN CASE OF THREE OR MORE STARS, MOST MASSIVE IS SELECTED AS MAIN AND ORBITAL 0 AND THE REST AS NON-MAIN AND ORBITAL 1 *
    sortedByMass[0].isMain = true
    sortedByMass[0].orbital = 0
    await sortedByMass[0].storeStar(systemSKU).catch((error: any) => {
      throw new DatabaseOperation('Could not store star in database.')
    })

    for (let s = 1; s <= sortedByMass.length - 1; s++) {
      sortedByMass[s].isMain = false
      sortedByMass[s].orbital = 1

      await sortedByMass[s].storeStar(systemSKU).catch((error: any) => {
        throw new DatabaseOperation('Could not store star in database.')
      })
    }

    return sortedByMass
  } else if (sortedByMax.length === 2) {
    // * IN CASE OF TWO STARS, CHECK IF THE DIFFERENCE OF MASSES ARE LESS OF 0.7 SOLAR MASS UNITS, IN THAT CASE BOTH ARE MAIN AND HAVE ORBITAL 1, FOLLOW THE LOGIC OF PREVIOUS STEP *
    if (sortedByMass[0].mass - sortedByMass[1].mass <= 0.7) {
      sortedByMass[0].isMain = true
      sortedByMass[0].orbital = 1
      sortedByMass[1].isMain = true
      sortedByMass[1].orbital = 1

      await sortedByMass[0].storeStar(systemSKU).catch((error: any) => {
        throw new DatabaseOperation('Could not store star in database.')
      })
      await sortedByMass[1].storeStar(systemSKU).catch((error: any) => {
        throw new DatabaseOperation('Could not store star in database.')
      })

      return sortedByMass
    } else {
      sortedByMass[0].isMain = true
      sortedByMass[0].orbital = 0
      sortedByMass[1].isMain = false
      sortedByMass[1].orbital = 1

      await sortedByMass[0].storeStar(systemSKU).catch((error: any) => {
        throw new DatabaseOperation('Could not store star in database.')
      })
      await sortedByMass[1].storeStar(systemSKU).catch((error: any) => {
        throw new DatabaseOperation('Could not store star in database.')
      })
    }
  } else {
    // * IN CASE OF ONE STAR JUST MARK AS MAIN AND ORBITAL 0 *
    sortedByMax[0].isMain = true
    sortedByMax[0].orbital = 0
  }

  for (let i = 0; i <= sortedByMax.length - 1; i++) {
    await sortedByMax[0].storeStar(systemSKU).catch((error: any) => {
      throw new DatabaseOperation('Could not store system in database.')
    })
  }

  return sortedByMax
}
