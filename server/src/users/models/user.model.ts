import { Schema, model } from 'mongoose'
import { REGEX } from '../../globals/assets/regex'

// User model for the database.
const userModel = new Schema({
  account: {
    fullName: {type: String, required: true, validate: REGEX.fullnameString},
    email: {type: String, required: true, unique: true, validate: REGEX.emailString},
    password: {type: String, required: true, validate: REGEX.hashedPassword},
    createdAt: {type: Date, default: Date.now()},
    galaxy: {type: Number, required: true, min: 1, max: 100},
    role: {type: String, required: true, default: 'Player', validate: REGEX.userRoleString}
  },
  preferences: {
    theme: {type: String, default: 'dark', validate: REGEX.themeString}
  },
  inGame: {
    firstPlay: {type: Boolean, default: true},
    capital: {type: String, unique: true, validate: REGEX.SKUString},
    planets: {type: Array},
    moons: {type: Array},
    systemsVisited: {type: Array},
    faction: {type: String, validate: REGEX.SKUString},
    ships: {type: Array},
    tripulation: {type: Array},
    fleetPower: {type: Number, min: 0},
    resources: {
      primary: {
        money: {
          credits: {type: Number, min: 0, default: 0},
          lingots: {type: Number, min: 0, default: 0},
          blood: {type: Number, min: 0, default: 0},
        },
        food: {
          sugars: {type: Number, min: 0, default: 800},
          fats: {type: Number, min: 0, default: 800},
          vitamins: {type: Number, min: 0, default: 800}
        },
        minerals: {
          steel: {type: Number, min: 0, default: 400},
          sand: {type: Number, min: 0, default: 0},
          iron: {type: Number, min: 0, default: 0},
          wood: {type: Number, min: 0, default: 800},
          gold: {type: Number, min: 0, default: 0},
          crystals: {type: Number, min: 0, default: 1600},
          silicon: {type: Number, min: 0, default: 0},
          cobalt: {type: Number, min: 0, default: 0},
          uranium: {type: Number, min: 0, default: 0},
          plutonium: {type: Number, min: 0, default: 0},
          aluminium: {type: Number, min: 0, default: 0},
          oil: {type: Number, min: 0, default: 200}
        },
        gases: {
          oxygen: {type: Number, min: 0, default: 800},
          helium: {type: Number, min: 0, default: 800},
          neon: {type: Number, min: 0, default: 0},
          nitrogen: {type: Number, min: 0, default: 0},
          argon: {type: Number, min: 0, default: 0}
        },
        combustion: {
          deuterium: {type: Number, min: 0, default: 5000},
          tritium: {type: Number, min: 0, default: 0},
          carbon: {type: Number, min: 0, default: 0}
        },
        energy: {
          electromagnetism: {type: Number, min: 0, default: 200},
          gas: {type: Number, min: 0, default: 0},
          darkMatter: {type: Number, min: 0, default: 0},
          antiMatter: {type: Number, min: 0, default: 0},
          exoticMatter: {type: Number, min: 0, default: 0}
        }
      },
      secondary: {
        food: {
          conservedFood: {type: Number, min: 0, default: 0},
          dailyDoseBag: {type: Number, min: 0, default: 0},
          dehidratedFats: {type: Number, min: 0, default: 0},
          boosterPack: {type: Number, min: 0, default: 0},
          proteins: {type: Number, min: 0, default: 0},
          estimulators: {type: Number, min: 0, default: 0}
        },
        minerals: {
          plastics: {type: Number, min: 0, default: 0},
          aleations: {type: Number, min: 0, default: 0},
          enrichedUranium: {type: Number, min: 0, default: 0},
          structures: {type: Number, min: 0, default: 0},
          glass: {type: Number, min: 0, default: 0}
        },
        technology: {
          chips: {type: Number, min: 0, default: 0},
          magnets: {type: Number, min: 0, default: 0}
        }
      }
    },
    genoma: {
        clime: {
          cold: {type: Number, min: 0, max: 1},
          temperate: {type: Number, min: 0, max: 1},
          warm: {type: Number, min: 0, max: 1}
        },
        flag: {
          mainShape: {type: String, default: 'None', validate: REGEX.flagShapesString},
          secondaryShape: {type: String, default: 'None', validate: REGEX.flagShapesString},
          mainColor: {type: String, default: '#000000', validate: REGEX.hexadecimalColor},
          secondaryColor: {type: String, default: '#000000', validate: REGEX.hexadecimalColor},
        },
        traits: {
          main: {type: String, validate: REGEX.SKUString},
          secondary: {type: String, validate: REGEX.SKUString},
          tertiary: {type: String, validate: REGEX.SKUString},
        }
    }
  },
  cookies: {}
})

const USER = model('User', userModel)

export default USER