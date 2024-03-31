import { handleError } from '../../globals/assets/libs'
import SHIP from '../models/ship.model'
import shipsList from '../mocks/ships'
import { DatabaseOperation } from '../../globals/classes/Errors'
import { APIResponse } from '../../types'
import equipmentsList from '../mocks/equipments'
import EQUIPMENT from '../models/equipment.model'
import weaponsList from '../mocks/weapons'
import WEAPON from '../models/weapons.model'
import tripulationsList from '../mocks/tripulations'
import TRIPULATION from '../models/tripulation.model'

// Method that stores the ships mock to database
export const generateShipsOnDB = async (): Promise<APIResponse> => {
  let ship: any
  const final: any[] = []
  for (ship in shipsList) {
    try {
      const current = new SHIP({
        sku: shipsList[ship].sku,
        name: shipsList[ship].name,
        className: shipsList[ship].className,
        tier: shipsList[ship].tier,
        stats: shipsList[ship].stats,
        tripulation: shipsList[ship].tripulation,
        equipment: shipsList[ship].equipment,
        weapons: shipsList[ship].weapons,
        cost: shipsList[ship].cost,
        maintance: shipsList[ship].maintance,
        power: shipsList[ship].power,
        fleet: shipsList[ship].fleet,
        owner: shipsList[ship].owner
      })

      await current.save().catch((e: any) => {
        console.error(e)
        throw new DatabaseOperation('Can not store ship in database.')
      })

      console.log(`New ship created. Properties was: ${current}`)
      final.push(current)
    } catch (error: any) {
      handleError(error)
    }
  }

  return {
    error: {
      name: null,
      message: null
    },
    message: 'Ships created',
    data: final
  }
}
// Method that stores the ship equipments mock to database
export const generateEquipmentsOnDB = async (): Promise<APIResponse> => {
  let equip: any
  const final: any[] = []
  for (equip in equipmentsList) {
    try {
      const current = new EQUIPMENT({
        name: equipmentsList[equip].name,
        idx: equipmentsList[equip].idx,
        type: equipmentsList[equip].type,
        tier: equipmentsList[equip].tier,
        stats: equipmentsList[equip].stats,
        cost: equipmentsList[equip].cost,
        maintance: equipmentsList[equip].maintance,
        power: equipmentsList[equip].power,
        owner: equipmentsList[equip].owner
      })

      await current.save().catch((e: any) => {
        console.error(e)
        throw new DatabaseOperation('Can not store equipment in database.')
      })

      console.log(`New equipment created. Properties was: ${current}`)
      final.push(current)
    } catch (error: any) {
      handleError(error)
    }
  }

  return {
    error: {
      name: null,
      message: null
    },
    message: 'Equipments created',
    data: final
  }
}
// Method that stores the ship weapons mock to database
export const generateWeaponsOnDB = async (): Promise<APIResponse> => {
  let weapon: any
  const final: any[] = []
  for (weapon in weaponsList) {
    try {
      const current = new WEAPON({
        name: equipmentsList[weapon].name,
        idx: equipmentsList[weapon].idx,
        type: equipmentsList[weapon].type,
        tier: equipmentsList[weapon].tier,
        stats: equipmentsList[weapon].stats,
        cost: equipmentsList[weapon].cost,
        maintance: equipmentsList[weapon].maintance,
        power: equipmentsList[weapon].power,
        owner: equipmentsList[weapon].owner
      })

      await current.save().catch((e: any) => {
        console.error(e)
        throw new DatabaseOperation('Can not store weapon in database.')
      })

      console.log(`New weapon created. Properties was: ${current}`)
      final.push(current)
    } catch (error: any) {
      handleError(error)
    }
  }

  return {
    error: {
      name: null,
      message: null
    },
    message: 'Equipments created',
    data: final
  }
}
// Method that stores the ship tripulation mock to database
export const generateTripulationsOnDB = async (): Promise<APIResponse> => {
    let tripulation: any
    const final: any[] = []
    for (tripulation in tripulationsList) {
      try {
        const current = new TRIPULATION({
          name: tripulationsList[tripulation].name,
          type: tripulationsList[tripulation].type,
          tier: tripulationsList[tripulation].tier,
          bonus: tripulationsList[tripulation].bonus,
          assignedTo: tripulationsList[tripulation].assignedTo,
          userName: tripulationsList[tripulation].userName,
          cost: tripulationsList[tripulation].cost,
          maintance: tripulationsList[tripulation].maintance,
        })
  
        await current.save().catch((e: any) => {
          console.error(e)
          throw new DatabaseOperation('Can not store tripulation in database.')
        })
  
        console.log(`New tripulation created. Properties was: ${current}`)
        final.push(current)
      } catch (error: any) {
        handleError(error)
      }
    }
  
    return {
      error: {
        name: null,
        message: null
      },
      message: 'Tripulations created',
      data: final
    }
  }
