import React from 'react';

export default function Qualities({ qualities }) {
  console.log(qualities);
  return (
    <>
      {qualities.map(quality => { return <span className={'badge m-1 bg-' + quality.color}>{quality.name}</span> })}
    </>
  )
}