// RegEx dictionary used to validate fields received in the requests.
export const REGEX = {
  basicString: /^[a-zA-ZÀ-ÿ' ]+$/,
  symbolsString: /^[-_!?0-9a-zA-ZÀ-ÿ' ]+$/,
  rawPassword: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*/])(?=.{6,20}).*$/,
  fullnameString: /^[a-zA-ZÀ-ÿ']+(\s[a-zA-ZÀ-ÿ']+)*$/,
  hashedPassword: /^\$2[ayb]\$\d+\$[./A-Za-z0-9]{53}$/,
  emailString: /^[a-zA-Z0-9À-ÿ'._-]+@[a-zA-Z0-9À-ÿ'.-]+\.[a-zA-Z]{2,4}$/,
  SKUString:
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  SKUStringWithNone:
    /^(?:None|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/,
  flagShapesString:
    /^(None|diamond|square|oval|rectangle|star|square|triangle|circle|pentagon|hexagon)$/,
  hexadecimalColor: /^#[0-9A-Fa-f]{6}$/,
  themeString: /^(dark|light)$/,
  tierString: /^(C|B|A|S|SS|SSS)$/,
  userRoleString: /^(Player|Admin)$/,
  equipmentTypeString: /^(Shield|Motor|Cargo|Radars|Energy|Base module|Fuel)$/,
  weaponTypeString: /^(Energy|Atomic|Explosive)$/,
  tripulationTypeString: /^(Scientist|General|Miner|Navigator|Assaulter|Mechanics)$/,
  idMongoString: /^[0-9a-fA-F]{24}$|^None$/,
  buildingTypeString: /^(Base|Module|Ampliation)$/,
  factionString: /^(Neutral|Humans|Banished|Xenomorphs)$/,
  climeString: /^(Cold|Temperate|Warm)$/,
  treeString: /^(Physics|Engineering|Colonization|Devastation)$/,





}

//4297
