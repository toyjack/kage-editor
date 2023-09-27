import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import { Button } from "@nextui-org/react";

import { AppState } from "../reducers";
import { editorActions } from "../actions/editor";
import { selectActions } from "../actions/select";
import { undoActions } from "../actions/undo";
import { displayActions } from "../actions/display";

import SelectionInfo from "./SelectionInfo";
import SubmitPreview from "./SubmitPreview";

import "./EditorControls.css";

const EditorControls = ({ className }: { className?: string }) => {
  const glyph = useSelector((state: AppState) => state.glyph);
  const selection = useSelector((state: AppState) => state.selection);
  const clipboard = useSelector((state: AppState) => state.clipboard);
  const freehandMode = useSelector((state: AppState) => state.freehandMode);
  const undoLength = useSelector(
    (state: AppState) => state.undoStacks.undo.length
  );
  const redoLength = useSelector(
    (state: AppState) => state.undoStacks.redo.length
  );

  const undoDisabled = undoLength === 0;
  const redoDisabled = redoLength === 0;
  const pasteDisabled = clipboard.length === 0;
  const decomposeDisabled = !selection.some(
    (index) => glyph[index].value[0] === 99
  );

  const dispatch = useDispatch();
  const undo = useCallback(() => {
    dispatch(undoActions.undo());
  }, [dispatch]);
  const redo = useCallback(() => {
    dispatch(undoActions.redo());
  }, [dispatch]);
  const selectAll = useCallback(() => {
    dispatch(selectActions.selectAll());
  }, [dispatch]);
  const selectDeselected = useCallback(() => {
    dispatch(selectActions.selectDeselected());
  }, [dispatch]);
  const copy = useCallback(() => {
    dispatch(editorActions.copy());
  }, [dispatch]);
  const paste = useCallback(() => {
    dispatch(editorActions.paste());
  }, [dispatch]);
  const cut = useCallback(() => {
    dispatch(editorActions.cut());
  }, [dispatch]);
  const toggleFreehand = useCallback(() => {
    dispatch(editorActions.toggleFreehand());
  }, [dispatch]);
  const decompose = useCallback(() => {
    dispatch(editorActions.decomposeSelected());
  }, [dispatch]);
  const options = useCallback(() => {
    dispatch(displayActions.openOptionModal());
  }, [dispatch]);
  const finishEdit = useCallback(
    (evt: React.MouseEvent) => {
      dispatch(editorActions.finishEdit(evt.nativeEvent));
    },
    [dispatch]
  );

  const { t } = useTranslation();
  return (
    <div className={className}>
      <SelectionInfo />
      <div className="control-buttons">
        <Button
          variant="ghost"
          color="primary"
          disabled={undoDisabled}
          onClick={undo}
        >
          {t("undo")}
        </Button>
        <Button
          variant="ghost"
          color="primary"
          disabled={redoDisabled}
          onClick={redo}
        >
          {t("redo")}
        </Button>
        <Button
          variant="ghost"
          color="primary"
          disabled={glyph.length === 0}
          onClick={selectAll}
        >
          {t("select all")}
        </Button>
        <Button
          variant="ghost"
          color="primary"
          disabled={glyph.length === 0}
          onClick={selectDeselected}
        >
          {t("invert selection")}
        </Button>
        <Button
          variant="ghost"
          color="primary"
          disabled={selection.length === 0}
          onClick={copy}
        >
          {t("copy")}
        </Button>
        <Button
          variant="ghost"
          color="primary"
          disabled={pasteDisabled}
          onClick={paste}
        >
          {t("paste")}
        </Button>
        <Button
          variant="ghost"
          color="primary"
          disabled={selection.length === 0}
          onClick={cut}
        >
          {t("cut")}
        </Button>
        <Button variant="ghost" color="primary" onClick={toggleFreehand}>
          {freehandMode ? t("end freehand") : t("start freehand")}
        </Button>
        <Button
          variant="ghost"
          color="danger"
          disabled={decomposeDisabled}
          onClick={decompose}
        >
          {t("decompose")}
        </Button>
        <Button variant="ghost" color="secondary" onClick={options}>
          {t("options")}
        </Button>
      </div>
      <div className="preview">
        <SubmitPreview />
        <Button variant="ghost" color="success" onClick={finishEdit}>
          {t("finish edit")}
        </Button>
      </div>
    </div>
  );
};

export default EditorControls;
