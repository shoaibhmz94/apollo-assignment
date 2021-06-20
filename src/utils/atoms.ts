import {atom} from "jotai";

const timerIdAtom = atom(0);
const secondAtom = atom(0);
const decaSecondAtom = atom(0);
const searchTextAtom = atom('');
const speedAtom = atom(40);
const waveWidthAtom = atom(890)

export {
    timerIdAtom,
    searchTextAtom,
    secondAtom,
    decaSecondAtom,
    speedAtom,
    waveWidthAtom
};
