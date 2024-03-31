import { useEffect, useState } from "react";

// This is just a component for plain text data view. It filters the whole data in the database with some criteria and displays in the screen on the client side.
const DataView: React.FC = () => {
  const sys: any[] = [];
  const [systems, setSystems] = useState(sys);
  const [moons, setMoons] = useState(sys);
  const [planets, setPlanets] = useState(sys);
  const [asteroids, setAsteroids] = useState(sys);
  const [stars, setStars] = useState(sys);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch("http://localhost:8080/dataCheck");
        const data = await response.json();
        setSystems(data.Systems);
        setStars(data.Stars);
        setPlanets(data.Planets);
        setMoons(data.Moons);
        setAsteroids(data.Asteroids);
      } catch (error) {
        console.error("Error al obtener los sistemas:", error);
      }
    };

    fetchSystems();
  }, []);

  const filterDataByStarType = (): Record<string, number> => {
    const result: any = {};
    stars.map((star) => {
      if (!result[star.starClass]) {
        result[star.starClass] = 1;
      } else {
        result[star.starClass] += 1;
      }
    });

    return result;
  };

  const showGravityPerStarType = (): Array<Array<number | string>> => {
    const result: any = {};
    stars.map((star) => {
      if (!result[star.starClass]) {
        result[star.starClass] = {
          starCounter: 1,
          gravityCounter: star.gravity,
        };
      } else {
        result[star.starClass] = {
          starCounter: result[star.starClass].starCounter + 1,
          gravityCounter: result[star.starClass].gravityCounter + star.gravity,
        };
      }
    });

    return [Object.keys(result), Object.values(result)];
  };

  const showStarsPerSystem = (): Record<number, number> => {
    const result: any = {};
    systems.map((system) => {
      if (!result[system.stars.length]) {
        result[system.stars.length] = 1;
      } else {
        result[system.stars.length] += 1;
      }
    });

    return result;
  };

  const showPlanetsPerSystem = (): Array<Array<string | number>> => {
    const result: any = {};
    systems.map((system) => {
      if (!result[system.planets.length]) {
        result[system.planets.length] = 1;
      } else {
        result[system.planets.length] += 1;
      }
    });

    return [Object.keys(result), Object.values(result)];
  };

  const showPlanetsPerSize = (): Record<string, number> => {
    const result: any = {};
    planets.map((planet) => {
      if (!result[planet.size]) {
        result[planet.size] = 1;
      } else {
        result[planet.size] += 1;
      }
    });

    return result;
  };

  const showPlanetsPerBiome = (): Array<Array<string | number>> => {
    const result: any = {};
    planets.map((planet) => {
      if (!result[planet.biome]) {
        result[planet.biome] = 1;
      } else {
        result[planet.biome] += 1;
      }
    });

    const resKeys: any[] = Object.keys(result);
    const resValues: any[] = Object.values(result);

    return [resKeys, resValues];
  };

  const showMoonsPerPlanet = (): Array<Array<string | number>> => {
    const result: any = {};
    planets.map((planet) => {
      if (!result[planet.moons.length]) {
        result[planet.moons.length] = 1;
      } else {
        result[planet.moons.length] += 1;
      }
    });

    return [Object.keys(result), Object.values(result)];
  };

  const showMoonsPerSize = (): Record<string, number> => {
    const result: any = {};
    moons.map((moon) => {
      if (!result[moon.size]) {
        result[moon.size] = 1;
      } else {
        result[moon.size] += 1;
      }
    });

    return result;
  };

  const showMoonsPerBiome = (): Array<Array<string | number>> => {
    const result: any = {};
    moons.map((moon) => {
      if (!result[moon.biome]) {
        result[moon.biome] = 1;
      } else {
        result[moon.biome] += 1;
      }
    });

    const resKeys: any[] = Object.keys(result);
    const resValues: any[] = Object.values(result);

    return [resKeys, resValues];
  };

  const resultByStarType = filterDataByStarType();
  const starsPerSystem = showStarsPerSystem();
  const planetsPerSize = showPlanetsPerSize();
  const planetsPerBiome = showPlanetsPerBiome();
  const moonsPerPlanet = showMoonsPerPlanet();
  const moonsPerSize = showMoonsPerSize();
  const moonsPerBiome = showMoonsPerBiome();
  const planetsPerSystem = showPlanetsPerSystem();
  const gravityPerStarType = showGravityPerStarType();

  const totalStars =
    resultByStarType.BH +
    resultByStarType.N +
    resultByStarType.O +
    resultByStarType.B +
    resultByStarType.A +
    resultByStarType.F +
    resultByStarType.G +
    resultByStarType.K +
    resultByStarType.M;

  const totalPlanets =
    planetsPerSize["Dwarf"] +
    planetsPerSize["Regular"] +
    planetsPerSize["Giant"] +
    planetsPerSize["SuperGiant"];

  const totalMoons =
    moonsPerSize["Dwarf"] + moonsPerSize["Regular"] + moonsPerSize["Giant"];

  return (
    <div className="w-[100%] h-[100%]">
      <h1>¡Data Results!</h1>
      <div className="w-[100%] h-[100%] flex flex-row gap-2 justify-center p-2">
        <div>
          <h2 className="text-xl text-[#34C44D]">Stars per category:</h2>
          <ul>
            <li>
              Black Holes: {resultByStarType.BH} -{" "}
              {(resultByStarType.BH / totalStars) * 100}%
            </li>
            <li>
              Neutrons Stars: {resultByStarType.N} -{" "}
              {(resultByStarType.N / totalStars) * 100}%
            </li>
            <li>
              Blue Supergiants: {resultByStarType.O} -{" "}
              {(resultByStarType.O / totalStars) * 100}%
            </li>
            <li>
              Blue Giants: {resultByStarType.B} -{" "}
              {(resultByStarType.B / totalStars) * 100}%
            </li>
            <li>
              White Dwarfs: {resultByStarType.A} -{" "}
              {(resultByStarType.A / totalStars) * 100}%
            </li>
            <li>
              Brown Dwarfs: {resultByStarType.F} -{" "}
              {(resultByStarType.F / totalStars) * 100}%
            </li>
            <li>
              Yellow Dwarfs: {resultByStarType.G}-{" "}
              {(resultByStarType.G / totalStars) * 100}%
            </li>
            <li>
              Subdwarfs: {resultByStarType.K} -{" "}
              {(resultByStarType.K / totalStars) * 100}%
            </li>
            <li>
              Red Dwarfs: {resultByStarType.M}-{" "}
              {(resultByStarType.M / totalStars) * 100}%
            </li>

            <br />
            <li>TOTAL: {totalStars}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-[#34C44D]">
            Number of stars per System:
          </h2>
          <ul>
            <li>
              1 Star: {starsPerSystem[1]} -{" "}
              {(starsPerSystem[1] / systems.length) * 100}%
            </li>
            <li>
              2 Stars: {starsPerSystem[2]} -{" "}
              {(starsPerSystem[2] / systems.length) * 100}%
            </li>
            <li>
              3 Stars: {starsPerSystem[3]} -{" "}
              {(starsPerSystem[3] / systems.length) * 100}%
            </li>
            <li>
              4 Stars: {starsPerSystem[4]} -{" "}
              {(starsPerSystem[4] / systems.length) * 100}%
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-[#34C44D]">
            Average gravity per Star type:
          </h2>
          <ul>
            {gravityPerStarType[0].map((key, idx) => {
              return (
                <>
                  <li key={idx}>
                    {key}:{" "}
                    {(
                      gravityPerStarType[1][idx].gravityCounter /
                      gravityPerStarType[1][idx].starCounter
                    ).toExponential(3)}
                  </li>
                </>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-[#34C44D]">
            Number of Planets per System:
          </h2>
          <ul>
            {planetsPerSystem[0].map((key, idx) => {
              return (
                <>
                  <li key={idx}>
                    {key}: {planetsPerSystem[1][idx]} -{" "}
                    {(planetsPerSystem[1][idx] / systems.length) * 100}%
                  </li>
                </>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-[#34C44D]">
            Number of Planets per size:
          </h2>
          <ul>
            <li>
              Dwarfs: {planetsPerSize["Dwarf"]} -{" "}
              {(planetsPerSize["Dwarf"] / planets.length) * 100}%
            </li>
            <li>
              Regulars: {planetsPerSize["Regular"]} -{" "}
              {(planetsPerSize["Regular"] / planets.length) * 100}%
            </li>
            <li>
              Giants: {planetsPerSize["Giant"]} -{" "}
              {(planetsPerSize["Giant"] / planets.length) * 100}%
            </li>
            <li>
              SuperGiants: {planetsPerSize["SuperGiant"]} -{" "}
              {(planetsPerSize["SuperGiant"] / planets.length) * 100}%
            </li>
            <br />
            <li>TOTAL: {totalPlanets}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-[#34C44D]">
            Number of Planets per biome:
          </h2>
          <ul>
            {planetsPerBiome[0].map((key, idx) => {
              return (
                <li key={idx}>
                  {key}: {planetsPerBiome[1][idx]} -{" "}
                  {(planetsPerBiome[1][idx] / planets.length) * 100}%
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-[#34C44D]">
            Number of Moons per Planet:
          </h2>
          <ul>
            {moonsPerPlanet[0].map((key, idx) => {
              return (
                <>
                  <li key={idx}>
                    {key}: {moonsPerPlanet[1][idx]} -{" "}
                    {(moonsPerPlanet[1][idx] / moons.length) * 100}%
                  </li>
                </>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-[#34C44D]">Number of Moons per size:</h2>
          <ul>
            <li>
              Dwarfs: {moonsPerSize["Dwarf"]} -{" "}
              {(moonsPerSize["Dwarf"] / moons.length) * 100}%
            </li>
            <li>
              Regulars: {moonsPerSize["Regular"]} -{" "}
              {(moonsPerSize["Regular"] / moons.length) * 100}%
            </li>
            <li>
              Giants: {moonsPerSize["Giant"]} -{" "}
              {(moonsPerSize["Giant"] / moons.length) * 100}%
            </li>

            <br />
            <li>TOTAL: {totalMoons}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-[#34C44D]">Number of Moons per biome:</h2>
          <ul>
            {moonsPerBiome[0].map((key, idx) => {
              return (
                <li key={idx}>
                  {key}: {moonsPerBiome[1][idx]} -{" "}
                  {(moonsPerBiome[1][idx] / moons.length) * 100}%
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataView;
