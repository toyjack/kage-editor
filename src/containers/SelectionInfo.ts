import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { editorActions } from '../actions/editor';
import { selectActions } from '../actions/select';
import { AppState } from '../reducers';
import { GlyphLine } from '../kageUtils/glyph';
import { calcStretchScalar, getStretchPositions } from '../kageUtils/stretchparam';

import SelectionInfo from '../components/SelectionInfo';

export enum SelectionInfoType {
  stroke,
  part,
  other,
}

export interface SelectionInfoState {
  infoType: SelectionInfoType;
  selectedGlyphLine?: GlyphLine;
  summary: string;
  entityName?: string;
  stretchCoeff?: number;
  selectIndexString: string;
  swapPrevDisabled: boolean;
  swapNextDisabled: boolean;
  selectPrevDisabled: boolean;
  selectNextDisabled: boolean;
}

export interface SelectionInfoActions {
  selectPrev: () => void;
  selectNext: () => void;
  swapWithPrev: () => void;
  swapWithNext: () => void;
}

const mapStateToProps = createSelector(
  [
    (state: AppState) => state.glyph,
    (state: AppState) => state.buhinMap,
    (state: AppState) => state.stretchParamMap,
    (state: AppState) => state.selection,
  ],
  (glyph, buhinMap, stretchParamMap, selection): SelectionInfoState => {
    if (selection.length === 0) {
      return {
        infoType: SelectionInfoType.other,
        summary: '',
        selectIndexString: `- / ${glyph.length || '-'}`,
        swapPrevDisabled: true,
        swapNextDisabled: true,
        selectPrevDisabled: glyph.length === 0,
        selectNextDisabled: glyph.length === 0,
      };
    }
    if (selection.length > 1) {
      const selectedIndexString = selection
        .map((index) => index + 1)
        .sort((a, b) => a - b).join(',');

      return {
        infoType: SelectionInfoType.other,
        summary: '', // FIXME: '複数選択中' (i18n...)
        selectIndexString: `${selectedIndexString} / ${glyph.length || '-'}`,
        swapPrevDisabled: true,
        swapNextDisabled: true,
        selectPrevDisabled: glyph.length === 0,
        selectNextDisabled: glyph.length === 0,
      };
    }
    const selectIndexString = `${selection[0] + 1} / ${glyph.length || '-'}`;
    const swapPrevDisabled = selection[0] === 0;
    const swapNextDisabled = selection[0] === glyph.length - 1;
    const selectPrevDisabled = false;
    const selectNextDisabled = false;

    const selectedStroke = glyph[selection[0]];
    const generateSummary = () => {
      const points = [];
      for (let i = 3; i + 2 <= selectedStroke.value.length; i += 2) {
        points.push(`(${selectedStroke.value[i]},${selectedStroke.value[i + 1]})`);
      }
      return points.join(' → ');
    };
    switch (selectedStroke.value[0]) {
      case 99: {
        const buhinSource = buhinMap.get(selectedStroke.partName!);
        let entityName: string | undefined = undefined;
        if (buhinSource) {
          const aliasMatch = /^(?:0:1:0:[^$]+\$)?99:0:0:0:0:200:200:([^$]+)$/.exec(buhinSource);
          if (aliasMatch) {
            entityName = aliasMatch[1];
          }
        }
        const stretchParam = stretchParamMap.get(selectedStroke.partName!);
        const stretchCoeff = stretchParam
          ? calcStretchScalar(stretchParam, getStretchPositions(selectedStroke)!)
          : undefined;

        return {
          infoType: SelectionInfoType.part,
          selectedGlyphLine: selectedStroke,
          entityName,
          stretchCoeff,
          summary: `(${selectedStroke.value[3]},${selectedStroke.value[4]}) → (${selectedStroke.value[5]},${selectedStroke.value[6]})`,
          selectIndexString,
          swapPrevDisabled, swapNextDisabled,
          selectPrevDisabled, selectNextDisabled,
        };
      }
      case 1:
      case 2:
      case 3:
      case 4:
      case 6:
      case 7:
        return {
          infoType: SelectionInfoType.stroke,
          selectedGlyphLine: selectedStroke,
          summary: generateSummary(),
          selectIndexString,
          swapPrevDisabled, swapNextDisabled,
          selectPrevDisabled, selectNextDisabled,
        };
      case 0:
      case 9:
        return {
          infoType: SelectionInfoType.other,
          summary: generateSummary(),
          selectIndexString,
          swapPrevDisabled, swapNextDisabled,
          selectPrevDisabled, selectNextDisabled,
        };
      default:
        return {
          infoType: SelectionInfoType.other,
          summary: '',
          selectIndexString,
          swapPrevDisabled, swapNextDisabled,
          selectPrevDisabled, selectNextDisabled,
        };
    }
  }
);

const mapDispatchToProps = (dispatch: Dispatch): SelectionInfoActions => ({
  selectPrev: () => {
    dispatch(selectActions.selectPrev());
  },
  selectNext: () => {
    dispatch(selectActions.selectNext());
  },
  swapWithPrev: () => {
    dispatch(editorActions.swapWithPrev());
  },
  swapWithNext: () => {
    dispatch(editorActions.swapWithNext());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionInfo);
