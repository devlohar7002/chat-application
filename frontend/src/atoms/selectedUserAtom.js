import { atom } from "recoil"

const selectedUserAtom = atom({
    key: 'selectedUserAtom',
    default: null
});

export default selectedUserAtom;