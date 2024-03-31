# GALAXY CREATION CONSTRAINTS

- SYSTEMS AND GALAXY ITSELF
  Must allow up to ten thousand Systems per Galaxy.
  Each Galaxy must have a massive Black Hole as central System.
  Each Galaxy must contain a System that is a replica of the real Solar System.
  Each system must include at least one star.
  Each system but the Solar System and central system, and it's content, must be generated randomly such as the properties of the whole system.
  Consider a Galaxy a 3D grid (or matrix) where each System have a coordinate like {z: 13, y: 150, x: 130} that will define the position of the System on the Galaxy screen view.
  System positions can not be repeated.
  Values for each coordinate goes from -500 to 500, so point 0,0,0 will be the center of the Galaxy.
  Each system must have an owner. It just represents the faction into the game that have under control that system. Owners must be spotted by zones.
  Systems can contain up to ten Asteroid clusters orbiting the star/s of the system.
  The final result will produce a randomly generated Galaxy that can be stored in the database directly, just working with the generated entities separately.

- STARS
  A system just can contain up to one Neutrons star and up to two Black holes (the second one created with a 20% chance).
  The most massive star are considered the main of the system. If the system stars are two Black Holes, both are considered main and have orbital 1,
  If the system contains exactly two stars and have a difference of mass below of 0.7 both are considered main and have orbital 1.
  The maximum stars per system is determined by the main star of the system.
  Stars must be created by type with a given possibility by each type (given list of integers).
  Stars can be mined, so they will have a non-zero value of resources, especifically energy resources.
  Each type of star must be shown with his own texture on the simulation screen view (client side).

- PLANETS
  Can exist up to twelve planets per System.
  A planet must have an orbital level and must be linked to the star/s of the System gravitationally. Bigger levels, means more distance from the star/s of the System.
  Exists three types of temperatures ranges in the game: Warm, Temperate and Cold.
  Planets can be made of two things: gas (33%) or a solid (67%) core. If planet is made of gas, habitability for all types of conditions are 0%, if not, the values of the preview steps indicates the habitability level for each planet.
  Planets can domain up to five Moons.
  Planets can be habitable, that means that users will can make a colony on them and interact with some properties that shows the evolution of the planet in terms of in-game concepts.
  Planets could be one of three sizes: dwarf, regular or giant. In base of his size a planet will have more or less constructable tiles.
  Planets have a biome, it is just an aestethic property but must be generated randomly over a given list of options.

- MOONS
  A moon must have an orbital level and must be linked to a planet gravitationally. Bigger levels, means more distance from the planet.
  Moons can be habitable as well, so it must works as planets in those terms.
  Moons could be one of three sizes: dwarf, regular or giant. In base of his size a moon will have more or less constructable tiles.

- ASTEROIDS
  Asteroid clusters are just for mining purposes and must not allow constructable nor defensive tiles.
  An Asteroid cluster must have an orbital level and must be linked to the star of the System.
  Asteroid clusters orbit in between planets or star to planet relations. So orbitals will be float integers.
