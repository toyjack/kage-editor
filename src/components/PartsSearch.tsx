import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { Button, ButtonGroup, Input } from "@nextui-org/react";

import { editorActions } from "../actions/editor";
import { search } from "../callapi";

import PartsList from "./PartsList";

import styles from "./PartsSearch.module.css";

const searchSuggestions = [
  "エディタ部品1",
  "エディタ部品2",
  "エディタ部品3",
  "エディタ部品4",
];

class QueryTooShortError extends Error {}

interface SearchState {
  query: string;
  result: string[] | null;
  err: any;
}

const initialSearchState: SearchState = {
  query: "",
  result: [],
  err: null,
};

const PartsSearch = ({ className }: { className?: string }) => {
  const queryInputRef = useRef<HTMLInputElement>(null);
  const [searchState, setSearchState] =
    useState<SearchState>(initialSearchState);

  const startSearch = (query: string) => {
    setSearchState({
      query,
      result: null,
      err: null,
    });
    search(query)
      .then((result) => {
        if (result === "tooshort") {
          throw new QueryTooShortError("query too short");
        }
        if (result === "nodata") {
          return [];
        }
        return result.split("\t");
      })
      .then(
        (names): SearchState => ({
          query,
          result: names,
          err: null,
        })
      )
      .catch(
        (reason): SearchState => ({
          query,
          result: null,
          err: reason,
        })
      )
      .then((newSearchState) => {
        setSearchState((currentSearchState) =>
          currentSearchState.query === query
            ? newSearchState
            : currentSearchState // query has changed, discard result
        );
      });
  };

  const args = JSON.parse(localStorage.getItem("kage-editor-args") || "{}");
  const initialQuery = args.name || "";

  useEffect(() => {
    if (initialQuery) {
      console.log("initialQuery", initialQuery)
      startSearch(initialQuery);
    }
  }, []);
  const handleSearch = useCallback(() => {
    if (!queryInputRef.current) {
      return;
    }
    const query = queryInputRef.current.value;
    if (!query) {
      setSearchState({
        query,
        result: [],
        err: null,
      });
      return;
    }
    startSearch(query);
  }, []);
  const handleFormSubmit = useCallback(
    (evt: React.FormEvent) => {
      evt.preventDefault();
      handleSearch();
    },
    [handleSearch]
  );

  const hoverNameRef = useRef<HTMLDivElement>(null);
  const handleItemMouseEnter = useCallback((partName: string) => {
    if (!hoverNameRef.current) {
      return;
    }
    hoverNameRef.current.textContent = partName;
  }, []);
  const dispatch = useDispatch();
  const handleItemClick = useCallback(
    (partName: string, evt: React.MouseEvent) => {
      if (evt.shiftKey) {
        if (!queryInputRef.current) {
          return;
        }
        queryInputRef.current.value = partName;
        startSearch(partName);
      } else {
        dispatch(editorActions.insertPart(partName));
      }
    },
    [dispatch]
  );

  const { t } = useTranslation();
  return (
    <div className={className}>
      <form className={styles.partsSearchBox} onSubmit={handleFormSubmit}>
        <ButtonGroup radius="none">
          <Input
            variant="flat"
            color="primary"
            radius="none"
            defaultValue={initialQuery}
            list="searchList"
            ref={queryInputRef}
          />
          <Button color="primary" variant="ghost" radius="none">{t("search")}</Button>
        </ButtonGroup>
        <datalist id="searchList">
          {searchSuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
      </form>
      <div className={styles.partsListArea}>
        {searchState.err ? (
          searchState.err instanceof QueryTooShortError ? (
            <div className={styles.partsListAreaMessage}>
              {t("search query too short")}
            </div>
          ) : (
            <div className={styles.partsListAreaMessage}>
              {t("search error", { message: searchState.err })}
            </div>
          )
        ) : !searchState.result ? (
          <div className={styles.partsListAreaMessage}>{t("searching")}</div>
        ) : searchState.result.length === 0 ? (
          <div className={styles.partsListAreaMessage}>
            {t("no search result")}
          </div>
        ) : (
          <PartsList
            names={searchState.result}
            handleItemClick={handleItemClick}
            handleItemMouseEnter={handleItemMouseEnter}
          />
        )}
      </div>
      <div className={styles.partsHoverName} ref={hoverNameRef}>
        &nbsp;
      </div>
    </div>
  );
};

export default PartsSearch;
