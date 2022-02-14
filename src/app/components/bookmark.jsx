import React from 'react';

export default function Bookmark({bookmark, onToggle, userId}){

  return <button className={'bi bi-bookmark' + (bookmark ? '-fill' : '')} onClick={()=>onToggle(userId)} ></button>
}