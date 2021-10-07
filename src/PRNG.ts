
import { State, map } from 'fp-ts/lib/State'
import { pipe } from 'fp-ts/function'

export type Random<A> = State<number, A>

export const random: State<number, number> = seed => {
    const a = 1839567234;
    const m = 8239451023;
    const c = 972348567;

    const nextSeed = (a * seed + c) % m
    return [nextSeed, nextSeed];
}

export const randomInRange: (min: number, max: number) => Random<number> =
    (min, max) => {
        const m = 8239451023;

        const inRange = (num: number) => {
            return min + Math.floor((num / m) * (max - min));
        }
        return pipe(
            random,
            map(num => inRange(num))
        );
    }

export const randomIn = <T>(arr: T[]) =>
    pipe(
        randomInRange(0, arr.length - 1),
        map(index => arr[index])
    )

export const randomBoolean: Random<boolean> =
    pipe(
        randomInRange(0, 1),
        map(n => n === 1)
    )