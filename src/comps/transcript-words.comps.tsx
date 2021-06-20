import React, { useContext, useState } from "react";
import { TranscriptContext } from "../App";
import Util from "../utils/util";
import { useAtom } from "jotai";
import { decaSecondAtom, secondAtom } from "../utils/atoms";
import "../assets/scss/transcript-words.scss";
import SearchComps from "./search.comps";

const TranscriptWordsComps: React.FunctionComponent = () => {
  const transcripts = useContext(TranscriptContext);
  const [second, setSecond] = useAtom(secondAtom);
  const [decaSecond, setDecaSecond] = useAtom(decaSecondAtom);

  const time = second + decaSecond / 1000;

  const onWordClick = (time: string) => {
    setSecond(Math.floor(Util.getNumericalTime(time)));
    setDecaSecond(
      Math.ceil(
        (Util.getNumericalTime(time) -
          Math.floor(Util.getNumericalTime(time))) *
          10
      ) * 100
    );
  };

  return (
    <div className="search-transcript-container">
      <SearchComps />
      <div className="transcript-words">
        {transcripts.word_timings.map((sentence, index) => {
          const bg =
            time >= Util.getNumericalTime(sentence[0].startTime) &&
            time <= Util.getNumericalTime(sentence[sentence.length - 1].endTime)
              ? " #e6ecff"
              : "";
          return (
            <div
              className="transcript-container"
              style={{
                marginLeft: index % 2 && "20px",
                backgroundColor: bg,
              }}
              key={index}
            >
              <span className={index % 2 ? "second-person" : "first-person"}>
                {Util.getFormatDateTime(
                  0,
                  Math.round(Util.getNumericalTime(sentence[0].startTime))
                )}
              </span>

              <span className="line-divider" />

              <span className="word-container">
                {sentence.map((word: any, i: number) => (
                  <span onClick={() => onWordClick(word.startTime)} key={i}>
                    {time >= Util.getNumericalTime(word.startTime) &&
                    time < Util.getNumericalTime(word.endTime) ? (
                      <a className="word">
                        <span style={{ backgroundColor: "lightblue" }}>
                          {word.word}
                        </span>{" "}
                      </a>
                    ) : (
                      <a className="word">
                        <span>{word.word}</span>{" "}
                      </a>
                    )}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TranscriptWordsComps;
