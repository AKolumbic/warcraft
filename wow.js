// World of Warcraft themed examples of JavaScript



const random = (min, max) => {
  /**
   * returns a random number between minimum and maximum range
   * @param min - minimum allowed value
   * @param max - maximum allowed value
   */
  return Math.floor(Math.random() * (max - min)) + min
}



const getRandom = (inputArr) => {
  /**
   * randomly selects a number to be used as an index position to make a random selection from the array parameter
   * @param inputArr - array that requires a random element selected from it
   */
  const max = inputArr.length - 1
  const rng = random(0, max)
  return inputArr[rng]
}



const teamBuilder = (factionRaces, teamSize, bracket) => {
  /**
   * builds a character and adds them to the roster as many times as the team size
   * @param factionRaces - an array of the faction's races
   * @param teamSize - the amount of characters on a team, determined by battleground
   * @param bracket - the bracket that determines character level
   */
  let teamScore= 0
  const roster = []
  const classes = [
    'Druid',
    'Mage',
    'Paladin',
    'Rogue',
    'Hunter',
    'Warrior',
    'Warlock',
    'Priest',
    'Shaman'
  ]

  for (let index=0; index < teamSize; index++) {
    const lvl = getRandom(bracket)
    const race = getRandom(factionRaces)
    const characterClass = getRandom(classes)
    const teamMember = `Level ${lvl} ${race} ${characterClass}`

    teamScore = teamScore + lvl
    roster.push(teamMember)
  }

  return { teamScore, roster }
}



const tieBreaker = () => {
  /**
   * 50/50 decider between horde and alliance if they have same score
   */
  const rng = random(1, 100)
  const even = rng % 2 === 0
  even ? 'HORDE' : 'ALLIANCE'
}



const getWinner = (hordeScore, allianceScore) => {
  /**
   * accepts faction team scores to determine the winner of battle. Note that order matters for the params.
   * @param hordeScore - all horde team character levels added together
   * @param allianceScore - all alliance team character levels added together
   */
  const tie = hordeScore === allianceScore
  let hordeVictory = hordeScore > allianceScore
  let allianceVictory = allianceScore > hordeScore
  let winner
  let victoryText

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



const dramaticPause = () => {
  /**
   * line break for logBattleText function
   */
  console.log('\n')
}



const chooseBattleGround = () => {
  /**
   * 
   */
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
      lvlBracket: getRandom([bgLvlBracket[0], maxLvlBracket])
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
  const battleground = getRandom(battlegrounds)

  return battleground
}



const battle = () => {
  /**
   * 
   */
  const battleground = chooseBattleGround()
  const teamSize = battleground.size
  const bracket = battleground.lvlBracket


  const hordeRaces = [
    'Orc',
    'Troll',
    'Tauren',
    'Undead',
    'Blood Elf',
    'Goblin'
  ]
  const horde = teamBuilder(hordeRaces, teamSize, bracket)

  const allianceRaces = [
    'Human',
    'Dwarf',
    'Gnome',
    'Night Elf',
    'Daenai',
    'Worgen'
  ]
  const alliance = teamBuilder(allianceRaces, teamSize, bracket)


  const winner = getWinner(horde.teamScore, alliance.teamScore)

  const battleData = {
    Battleground: battleground.name,
    Winner: winner.winner,
    VictoryText: winner.victoryText,
    Bracket: `${bracket[0]} - ${bracket[bracket.length - 1]}`,
    Armies: {
      ['Horde Score']: horde.teamScore,
      ['Horde Team']: horde.roster,
      ['Alliance Score']: alliance.teamScore,
      ['Alliance Team']: alliance.roster,
    }
  }

  return battleData
}

const logBattle = (battleData) => {
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
  console.log('Battle Data')
  console.log(battleData)
  console.log('\n')
}


const wow = () => {
  const battleData = battle()
  logBattle(battleData)
}

wow()
