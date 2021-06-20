import React, {useContext, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {searchTextAtom, waveWidthAtom} from "../utils/atoms";
import {TranscriptContext} from "../App";
import "../assets/scss/search-input.scss";
import Util from "../utils/util";

const SearchComps: React.FunctionComponent = () => {
  const [searchText, setSearchText] = useAtom(searchTextAtom);
  const [searchValue, setSearchValue] = useState("");
  const transcripts = useContext(TranscriptContext);
  const [result, setResult] = useState(0);
    const [waveWidth] = useAtom(waveWidthAtom);

  useEffect(() => {
    let resultNumber = 0;
    for (let i = 0; i < transcripts.word_timings.length; i++) {
      for (let j = 0; j < transcripts.word_timings[i].length; j++) {
        if (
          transcripts.word_timings[i][j].word
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
            resultNumber = resultNumber + 1;
        }
      }
    }
    setResult(resultNumber);
  }, [searchText, transcripts.transcript_text, transcripts.word_timings]);

  return (
    <div className="search-input">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchValue && searchValue.trim() && searchValue.trim().length > 1) {
              setSearchText(searchValue);
          }
        }}
      >
        <input
          className="input"
          style={{width:waveWidth + 60}}
          placeholder={"Search Call Transcript"}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <img className="search-icon" src={Util.publicUrl("/images/icon-search.png")} />

      </form>
    </div>
  );
};

export default SearchComps;
