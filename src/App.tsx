import React from 'react';

import GlyphArea from './components/GlyphArea';
import EditorControls from './components/EditorControls';
import PartsSearch from './components/PartsSearch'
import SubmitForm from './components/SubmitForm';
import OptionModal from './components/OptionModal';

import { useShortcuts } from './shortcuts';

import styles from './App.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import sanitizedArgs, { hostAtom } from '../lib/args';

function App() {
  const { i18n } = useTranslation();
  useShortcuts();
  const host = sanitizedArgs.host
  return (
    <div className={styles.app} lang={i18n.language}>
      <div className='text-4xl text-red-700'>{host}</div>
      <GlyphArea className={styles.glyphArea} />
      <EditorControls className={styles.editorControls} />
      <PartsSearch className={styles.partsSearchArea} />
      <SubmitForm />
      <OptionModal />
    </div>
  );
}

export default App;
