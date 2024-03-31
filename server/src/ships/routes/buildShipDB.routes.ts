import { Router } from 'express'
import {
  generateEquipmentsOnDB,
  generateShipsOnDB,
  generateTripulationsOnDB,
  generateWeaponsOnDB
} from '../assets/libs'
import { handleError } from '../../globals/assets/libs'

const router = Router()

// TESTING PURPOSES: STORE THE SHIPS MOCK INTO THE DATABASE. IT WILL INCLUDE THE EQUIPMENTS, WEAPONS AND TRIPULATIONS AS WELL.
const generateShipDatabase = router.get(
  `/private-api-001/buildup-ships`,
  async (_req, res) => {
    try {
      const storedEquips = await generateEquipmentsOnDB()
      const storedWeapons = await generateWeaponsOnDB()
      const storedTripulations = await generateTripulationsOnDB()
      const stored = await generateShipsOnDB()

      if (
        stored.error.name === null &&
        storedEquips.error.name === null &&
        storedWeapons.error.name === null &&
        storedTripulations.error.name === null
      ) {
        res.status(200).json(stored)
      } else {
        res.status(500).json(stored ?? storedEquips)
      }
    } catch (error: any) {
      handleError(error)
    }
  }
)

export default generateShipDatabase
