import React, { useCallback, useEffect } from 'react';

import GlyphArea from './components/GlyphArea';
import EditorControls from './components/EditorControls';
import PartsSearch from './components/PartsSearch'
import SubmitForm from './components/SubmitForm';
import OptionModal from './components/OptionModal';

import { useShortcuts } from './shortcuts';

import styles from './App.module.css';
import { useTranslation } from 'react-i18next';
import { AppProps } from './types';
import { AppState } from './reducers';
import {  useDispatch, useSelector } from 'react-redux';
import { editorActions } from './actions/editor';

function App(props: AppProps) {
  const dispatch = useDispatch();
  const args = useSelector((state: AppState) => state.args);
  const updateArgs = useCallback(
    () => {
      dispatch(editorActions.updateArgs({ ...args,...props }));
    },
    [dispatch]
  );

  useEffect(()=>{
    updateArgs();

    if(props.name){
      localStorage.setItem('kage-editor-name',props.name);
    }
    if(props.related){
      localStorage.setItem('kage-editor-related',props.related);
    }
    if(props.data){
      localStorage.setItem('kage-editor-data',props.data);
    }
    if (props.host){
      localStorage.setItem('kage-editor-host',props.host);
    }
    if(props.lang){
      localStorage.setItem('kage-editor-lang',props.lang);
    }
  },[])
  
  const { i18n } = useTranslation();
  useShortcuts();
  return (
    <div className={styles.app} lang={i18n.language}>
      {/* <pre className='text-4xl text-red-700'>{JSON.stringify(args,null,2)}</pre> */}
      <GlyphArea className={styles.glyphArea} />
      <EditorControls className={styles.editorControls} />
      <PartsSearch className={styles.partsSearchArea} />
      <SubmitForm />
      <OptionModal />
    </div>
  );
}

export default App;
