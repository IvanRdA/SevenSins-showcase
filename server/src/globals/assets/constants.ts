// This is a model for the database, but instead of being instanciated as a regular model, it is used as submodel on other subjects that needs resource handleling data.
export const resourceModel = {
  primary: {
      time: { type: Number, min: 0, default: 0 },
      money: {
        credits: { type: Number, min: 0, default: 0 },
        lingots: { type: Number, min: 0, default: 0 },
        blood: { type: Number, min: 0, default: 0 },
      },
      food: {
        sugars: { type: Number, min: 0, default: 0 },
        fats: { type: Number, min: 0, default: 0 },
        vitamins: { type: Number, min: 0, default: 0 },
      },
      minerals: {
        steel: { type: Number, min: 0, default: 0 },
        sand: { type: Number, min: 0, default: 0 },
        iron: { type: Number, min: 0, default: 0 },
        wood: { type: Number, min: 0, default: 0 },
        gold: { type: Number, min: 0, default: 0 },
        crystals: { type: Number, min: 0, default: 0 },
        silicon: { type: Number, min: 0, default: 0 },
        cobalt: { type: Number, min: 0, default: 0 },
        uranium: { type: Number, min: 0, default: 0 },
        plutonium: { type: Number, min: 0, default: 0 },
        aluminium: { type: Number, min: 0, default: 0 },
        oil: { type: Number, min: 0, default: 0 },
      },
      gases: {
        oxygen: { type: Number, min: 0, default: 0 },
        helium: { type: Number, min: 0, default: 0 },
        neon: { type: Number, min: 0, default: 0 },
        nitrogen: { type: Number, min: 0, default: 0 },
        argon: { type: Number, min: 0, default: 0 },
      },
      combustion: {
        deuterium: { type: Number, min: 0, default: 0 },
        tritium: { type: Number, min: 0, default: 0 },
        carbon: { type: Number, min: 0, default: 0 },
      },
      energy: {
        electromagnetism: { type: Number, min: 0, default: 0 },
        gas: { type: Number, min: 0, default: 0 },
        darkMatter: { type: Number, min: 0, default: 0 },
        antiMatter: { type: Number, min: 0, default: 0 },
        exoticMatter: { type: Number, min: 0, default: 0 },
      }
    },
    secondary: {
      food: {
        conservedFood: { type: Number, min: 0, default: 0 },
        dailyDoseBag: { type: Number, min: 0, default: 0 },
        dehidratedFats: { type: Number, min: 0, default: 0 },
        boosterPack: { type: Number, min: 0, default: 0 },
        proteins: { type: Number, min: 0, default: 0 },
        estimulators: { type: Number, min: 0, default: 0 },
      },
      minerals: {
        plastics: { type: Number, min: 0, default: 0 },
        aleations: { type: Number, min: 0, default: 0 },
        enrichedUranium: { type: Number, min: 0, default: 0 },
        structures: { type: Number, min: 0, default: 0 },
        glass: { type: Number, min: 0, default: 0 },
      },
      technology: {
        chips: { type: Number, min: 0, default: 0 },
        magnets: { type: Number, min: 0, default: 0 },
      }
    }
}