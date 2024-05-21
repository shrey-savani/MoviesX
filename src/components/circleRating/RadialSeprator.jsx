import React from "react";
import _ from "lodash";

function Separator(props) {
  const { turns, style } = props;
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${turns}turn)`,
      }}
    >
      <div style={style} />
    </div>
  );
}

function RadialSeparators(props) {
  const turns = 1.5 / props?.count;
  return _.range(props?.count).map((index, i) => (
    <Separator turns={index * turns} style={props?.style} key={i}/>
  ));
}

export default RadialSeparators;
