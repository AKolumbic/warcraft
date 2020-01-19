// World of Warcraft themed examples of JavaScript




const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}


const dramaticPause = () => {
  console.log('\n')
}


const randomArraySelection = (inputArr: Array<any>) => {
  const max = inputArr.length - 1
  const rng = random(0, max)
  return inputArr[rng]
}


const getWinner = (hordeScore: number, allianceScore: number) => {
  let winner
  let victoryText

  if (hordeScore > allianceScore) { 
    winner = 'HORDE'
    victoryText = 'FOR THE HORDE, LOKTAR OGAR!'
  } else if (allianceScore > hordeScore) {
    winner = 'ALLIANCE'
    victoryText = 'FOR THE ALLIANCE'
  }

  return { winner, victoryText }
}



const bgLvlBracket = [
  [15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
  [71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
]

const maxLvlBracket = bgLvlBracket[bgLvlBracket.length - 1]

const battlegrounds = [
  {
    name: 'Warsong Gulch',
    size: 10,
    lvlBracket: randomArraySelection([bgLvlBracket[0], maxLvlBracket])
  },
  {
    name: 'Arathi Basin',
    size: 12,
    lvlBracket: randomArraySelection([bgLvlBracket[1], maxLvlBracket])
  },
  {
    name: 'Alterac Valley',
    size: 40,
    lvlBracket: randomArraySelection([bgLvlBracket[2], maxLvlBracket])
  },
  {
    name: 'The Eye of the Storm',
    size: 15,
    lvlBracket: randomArraySelection([bgLvlBracket[5], maxLvlBracket])
  },
  {
    name: 'The Strand of the Ancients',
    size: 15,
    lvlBracket: maxLvlBracket
  }
]




const teamBuilder = (
  factionRaces: string[],
  teamSize: number,
  bracket: number[]
) => {
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
    const lvl = randomArraySelection(bracket)
    const race = randomArraySelection(factionRaces)
    const characterClass = randomArraySelection(classes)
    const teamMember = `Level ${lvl} ${race} ${characterClass}`

    teamScore= teamScore + lvl
    roster.push(teamMember)
  }

  return { teamScore, roster }
}



const wow = () => {
  const battleground = randomArraySelection(battlegrounds)
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
    Bracket: `${bracket[0]} - ${bracket[bracket.length - 1]}`,
    Armies: {
      ['Horde Score']: horde.teamScore,
      ['Horde Team']: horde.roster,
      ['Alliance Score']: alliance.teamScore,
      ['Alliance Team']: alliance.roster,
    }
  }

  const logBattleText = async () => {
    await dramaticPause()
    console.log(' < - WARCRAFT - >')
    await dramaticPause()
    console.log(`At dawn, the Horde and Alliance met at ${battleground.name} to do battle...`)
    await dramaticPause()
    console.log(`${winner.winner} wins the battle!`)
    await dramaticPause()
    console.log(winner.victoryText)
    await dramaticPause()
    await dramaticPause()
    await dramaticPause()
    await dramaticPause()
    console.log('Battle Data')
    console.log(battleData)
    await dramaticPause()
  }
  logBattleText()

  return battleData
}

wow()
