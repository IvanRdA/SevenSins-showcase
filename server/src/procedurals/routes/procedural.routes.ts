import { Router } from 'express'

import mainProceduralProcess from '../controllers/mainProcess.controller'
import GALAXY from '../models/galaxy.model'
import SYSTEM from '../models/system.model'
import PLANET from '../models/planet.model'
import STAR from '../models/star.model'
import MOON from '../models/moon.model'
import ASTEROID from '../models/asteroid.model'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { verifyToken } from '../../globals/assets/middlewares'
import { handleError } from '../../globals/assets/libs'

const router = Router()

// TESTING PURPOSES: CHECK ALL RAW DATA ABOUT PROCEDURALS RESULTS STORED IN DATABASE
export const proceduralRoute = router.get('/procedural', async (_req, res) => {
  const storedPlanets = await PLANET.find()
  const storedStars = await STAR.find()
  const storedAsteroids = await ASTEROID.find()
  const storedGalaxy = await GALAXY.find()
  const storedSystems = await SYSTEM.find()
  const storedMoons = await MOON.find()

  const response = {
    galaxy: storedGalaxy, 
    systems: storedSystems,
    stars: storedStars,
    planets: storedPlanets,
    moons: storedMoons,
    asteroids: storedAsteroids
  }
  
  res.json(response)
})

// TESTING PURPOSES: STORE PROCEDURAL DATA INTO DATABASE
export const saveProceduralToDatabase = router.get(
  '/storeProcedural',
  async (_req, res) => {
    const newGalaxy = await mainProceduralProcess('Milky Way', 6000)

    try{
        await newGalaxy.storeGalaxy().catch((error: any) => {
          throw new DatabaseOperation('Could not store galaxy in database.')
          
        })
    }catch(error: any) {
      res.status(304).json(handleError(error))
    }

    res.status(200).json(newGalaxy)
    
  }
)

 // TESTING PURPOSES: CHECK RESULTANT DATA OF PROCEDURAL GALAXY PROCESS
export const checkDataResults = router.get('/dataCheck', async (_req, res) => {
  const storedPlanets = await PLANET.find()
  const storedStars = await STAR.find()
  const storedAsteroids = await ASTEROID.find()
  const storedSystems = await SYSTEM.find()
  const storedMoons = await MOON.find()

  res.status(200).json({
    Systems: storedSystems,
    Stars: storedStars,
    Planets: storedPlanets,
    Moons: storedMoons,
    Asteroids: storedAsteroids
  })
})

// TESTING PURPOSES: GET A SINGLE SYSTEM INFORMATION AND ALL THAT IT INCLUDES
export const getSingleSystem = router.get(`/getProcedural/:system`, async (req, res) => {
  const { system } = req.params
  try{
    const storedSystem = await SYSTEM.findOne({ _id: system }).catch((e: any) => {
      throw new DatabaseOperation('Could not get system from database.')
    })

    if(storedSystem !== null){
      const storedStars = await STAR.find({ system: storedSystem.sku }).catch((e: any) => {
        throw new DatabaseOperation('Could not get stars from database.')
      })
      const storedPlanets = await PLANET.find({ system: storedSystem.sku }).catch((e: any) => {
        throw new DatabaseOperation('Could not get planet from database.')
      })
      for(let i = 0; i <= storedPlanets.length - 1; i++){
        const currPlanetMoons = await MOON.find({ planet: storedPlanets[i].sku }).catch((e: any) => {
          throw new DatabaseOperation('Could not get planet from database.')
        })
        storedPlanets[i].moons = currPlanetMoons
      }
      const storedAsteroids = await ASTEROID.find({ system: storedSystem.sku }).catch((e: any) => {
        throw new DatabaseOperation('Could not get planet from database.')
      })
      storedSystem.stars = storedStars ?? []
      storedSystem.planets = storedPlanets ?? []
      storedSystem.asteroids = storedAsteroids ?? []
    }

    res.status(200).json({error: {name: null, message: null}, message: 'System obtained correctly', data: storedSystem})
    

  }catch(error: any){
    res.status(500).json(handleError(error))
  }
})
