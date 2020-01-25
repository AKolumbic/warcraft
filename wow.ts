// World of Warcraft themed examples of JavaScript



/**
 * Returns a random number between minimum and maximum range.
 * @param min - minimum value
 * @param max - maximum value
 */
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}



/**
 * Makes a random selection from inputed array.
 * @param inputArr - any type of array
 */
const getRandom = (inputArr: any[]) => {
  const max = inputArr.length - 1
  const rng = random(0, max)
  return inputArr[rng]
}



/**
 * Builds a character and adds them to the roster.
 * Each character's lvl is added together to get the team score.
 * @param factionRaces - an array of the faction's races
 * @param teamSize - the amount of characters on a team, determined by battleground
 * @param bracket - array of character levels
 */
const teamBuilder = (
  factionRaces: string[],
  teamSize: number,
  bracket: number[]
) => {
  let teamScore= 0
  const roster: string[] = []
  const classes = [
    'Druid',
    'Mage',
    'Paladin',
    'Rogue',
    'Hunter',
    'Warrior',
    'Warlock',
    'Priest',
    'Shaman',
    'Death Knight'
  ]

  for (let index=0; index < teamSize; index++) {
    const lvl: number = getRandom(bracket)
    const race: string = getRandom(factionRaces)
    const characterClass: string = getRandom(classes)
    const teamMember = `Level ${lvl} ${race} ${characterClass}`

    teamScore = teamScore + lvl
    roster.push(teamMember)
  }

  return { teamScore, roster }
}



/**
 * 50/50 between horde and alliance in case of a tie.
 */
const tieBreaker = () => {
  const rng = random(1, 100)
  const even = rng % 2 === 0
  return even ? 'HORDE' : 'ALLIANCE'
}



/**
 * Compares faction team scores to determine the winner of battle. 
 * Note that order matters for the params.
 * @param hordeScore - Horde team character levels added together
 * @param allianceScore - Alliance team character levels added together
 */
const getWinner = (hordeScore: number, allianceScore: number) => {
  const tie = hordeScore === allianceScore
  let hordeVictory = hordeScore > allianceScore
  let allianceVictory = allianceScore > hordeScore
  let winner: string
  let victoryText: string

  if (tie) {
    const coinFlip = tieBreaker()

    if(coinFlip === 'HORDE') {
      hordeVictory = true
    } else if (coinFlip === 'ALLIANCE') {
      allianceVictory = true
    }
  } 
  
  if (hordeVictory) { 
    winner = 'HORDE'
    victoryText = 'FOR THE HORDE! LOKTAR OGAR!'
  } else if (allianceVictory) {
    winner = 'ALLIANCE'
    victoryText = 'FOR THE ALLIANCE!'
  }

  return { winner, victoryText }
}



/**
 * Randomly selects battleground, team size, and level bracket
 */
const chooseBattleground = () => {
  interface BattlegroundTypes {
    name: string;
    size: number;
    lvlBracket: number[];
  }

  const bgLvlBracket = [
    [15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    [71, 72, 73, 74, 75, 76, 77, 78, 79],
    [80]
  ]
  const maxLvlBracket = bgLvlBracket[bgLvlBracket.length - 1] // [80]

  const battlegrounds = [
    {
      name: 'Warsong Gulch',
      size: 10,
      lvlBracket: getRandom(bgLvlBracket)
    },
    {
      name: 'Arathi Basin',
      size: 12,
      lvlBracket: getRandom([bgLvlBracket[1], maxLvlBracket])
    },
    {
      name: 'Alterac Valley',
      size: 40,
      lvlBracket: getRandom([bgLvlBracket[2], maxLvlBracket])
    },
    {
      name: 'The Eye of the Storm',
      size: 15,
      lvlBracket: getRandom([bgLvlBracket[5], maxLvlBracket])
    },
    {
      name: 'The Strand of the Ancients',
      size: 15,
      lvlBracket: getRandom([bgLvlBracket[6], maxLvlBracket])
    }
  ]
  const battleground: BattlegroundTypes = getRandom(battlegrounds)

  return battleground
}



/**
 * Wrath of the Lich King era battleground simulator
 */
const battle = () => {
  const battleground = chooseBattleground()
  const teamSize = battleground.size
  const bracket = battleground.lvlBracket

  const hordeRaces = [
    'Orc',
    'Troll',
    'Tauren',
    'Undead',
    'Blood Elf'
  ]
  const horde = teamBuilder(hordeRaces, teamSize, bracket)

  const allianceRaces = [
    'Human',
    'Dwarf',
    'Gnome',
    'Night Elf',
    'Daenai'
  ]
  const alliance = teamBuilder(allianceRaces, teamSize, bracket)


  const winner = getWinner(horde.teamScore, alliance.teamScore)

  const battleData = {
    Battleground: battleground.name,
    Winner: winner.winner,
    VictoryText: winner.victoryText,
    Bracket: `${bracket[0]} - ${bracket[bracket.length - 1]}`,
    Teams: {
      ['Horde Score']: horde.teamScore,
      ['Horde Team']: horde.roster,
      ['Alliance Score']: alliance.teamScore,
      ['Alliance Team']: alliance.roster,
    }
  }

  return battleData
}



/**
 * - Battleground Name
 * - Winner
 * - Victory Text
 * - Bracket
 * - Teams
 */
interface BattleDataTypes {
  Battleground: string;
  Winner: string;
  VictoryText: string;
  Bracket: string;
  Teams: {
      ['Horde Score']: number;
      ['Horde Team']: string[];
      ['Alliance Score']: number;
      ['Alliance Team']: string[];
  };
}



/**
 * logs the battle with flavor text
 * @param battleData data from the battleground simulator
 */
const logBattle = (battleData: BattleDataTypes) => {
  console.log('\n')
  console.log(' < - WARCRAFT - >')
  console.log('\n')

  console.log(`At dawn, the Horde and Alliance met at ${battleData.Battleground} to do battle...`)
  console.log('\n')

  console.log(`${battleData.Winner} wins the battle!`)
  console.log('\n')

  console.log(battleData.VictoryText)
  console.log('\n')

  console.log('\n')
  console.log(' < - Battle Data - > ')
  console.log(battleData)
  console.log('\n')
}




const wow = () => {
  const battleData = battle()
  logBattle(battleData)
}
