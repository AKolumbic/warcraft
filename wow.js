// World of Warcraft themed examples of JavaScript


// gets a random number between minimum and maximum input parameters
const random = (min, max) => {
  // I needed to google this to figure out how to do it. Learn to love google.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_number_between_two_values
  return Math.floor(Math.random() * (max - min)) + min
}


// line break in the console. Not actually a pause in any way
const dramaticPause = () => {
  // note that it's just logging, and not returning anything. Returning would terminate the program the way its used in logBattleText
  console.log('\n')
}


// takes an array as input parameter, and selects a random element from it
const randomArraySelection = (inputArr) => {
  // since arrays are zero-indexed, the length of the array minus 1 gives you the last index
  const max = inputArr.length - 1
  // random number no bigger than the length of the array, to be used as index
  const rng = random(0, max)
  // rng is now the index position in the input array, causing the 'selection'
  return inputArr[rng]
}


// Someone's gotta win, right?
getWinner = (hordeScore, allianceScore) => { // note if alliance score gets passed first, the parameters are incorrect as written, but for this demo its fine
  let winner // good usages of let
  let victoryText

  // if horde wins then make stuff horde related
  if (hordeScore > allianceScore) { 
    winner = 'HORDE'
    victoryText = 'FOR THE HORDE, LOKTAR OGAR!'
  // if alliance wins, do the opposite
  } else if (allianceScore > hordeScore) {
    winner = 'ALLIANCE'
    victoryText = 'FOR THE ALLIANCE'
  }

  // return the winner data
  return { winner, victoryText }
}


// 2D array for battleground level brackets
const bgLvlBracket = [
  [15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
  [71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
]


// Can you explain what this is?
const maxLvlBracket = bgLvlBracket[bgLvlBracket.length - 1]


// the kind of more complex array you'd see in real life
// an array of objects, with a nested array (lvlBracket)
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




// builds a team of characters
const teamBuilder = (factionRaces, teamSize, bracket) => {
  // init score as 0, use let because the number mutates
  let teamScore= 0
  // init as an empty array, doesn't need to be let because the array exists as a constant, it's content is what changes. 
  const roster = []
  // Character class array
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


  // loops the same amount as the size of the team, building a character each iteration
  for (let index=0; index < teamSize; index++) {
    // randomly pick level in range of the level bracket
    const lvl = randomArraySelection(bracket)
    // randomly pick a race from the correct faction
    const race = randomArraySelection(factionRaces)
    // randomly select 
    const characterClass = randomArraySelection(classes)

    // the character is a string, oppossed to an object, because its simpler
    const teamMember = `Level ${lvl} ${race} ${characterClass}`

    // add character to roster
    roster.push(teamMember)

    // update team score with players level
    teamScore= teamScore + lvl
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
    console.log('Battle Data')
    console.log(battleData)
    await dramaticPause()
  }
  logBattleText()

  return battleData
}

wow()
