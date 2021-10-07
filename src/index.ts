import { map, chain } from 'fp-ts/lib/State'
import { pipe } from 'fp-ts/function'
import { sequenceT, sequenceS } from 'fp-ts/lib/Apply';
import { Monad } from 'fp-ts/lib/State';

import { Random, randomIn, randomInRange, randomBoolean } from './PRNG'

const FirstNames = ['Paul', 'Nicole', 'Zane', 'Ellie'];
const LastNames = ['Gray', 'Smith', 'Jones', 'Williams'];
const HockeyTeams = ['Maple Leafs', 'Canadiens', 'Flyers', 'Bruins'];
const FootballTeams = ['Steelers', 'Eagles', 'Jaguars'];

const randomFirstNames = randomIn(FirstNames);
const randomLastNames = randomIn(LastNames);
const randomHockeyTeam = randomIn(HockeyTeams);
const randomFootbalTeam = randomIn(FootballTeams);

const randomFullname =
    pipe(
        sequenceT(Monad)(randomFirstNames, randomLastNames),
        map(([first, last]) => `${first} ${last}`)
    )

const randomTeam: Random<string> =
    pipe(
        randomBoolean,
        chain(bool => bool
            ? randomHockeyTeam
            : randomFootbalTeam)
    )

const generateRandomUser = sequenceS(Monad)({
  name: randomFullname,
  age: randomInRange(18, 100),
  favoriteTeam: randomTeam
})

const seed = 2;
const [randomUser, seedUser] = generateRandomUser(seed);

console.log(randomUser);