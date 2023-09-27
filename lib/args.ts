import {atom, useAtomValue } from 'jotai';

export const hostAtom = atom('glyphwiki.org');
export const sslAtom = atom(true);
export const nameAtom = atom('');
export const relatedAtom = atom('u3013');
export const edittimeAtom = atom('');
export const dataAtom = atom('');
export const summaryAtom = atom('');

const host = hostAtom.toString();
const ssl = atom((get) => get(sslAtom));
const name = atom((get) => get(nameAtom));
const related = atom((get) => get(relatedAtom));
const edittime = atom((get) => get(edittimeAtom));
const data = atom((get) => get(dataAtom));
const summary = atom((get) => get(summaryAtom));

const sanitizedArgs = {
  host,
  ssl,
  name,
  related,
  edittime,
  data,
  summary,
};

export default sanitizedArgs;