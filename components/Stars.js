import React from 'react';

export default function Stars({checked, unchecked}) {

  let items = []

  for(let i = 0; i<checked; ++i) {
    items.push('★')
  }
  for(let i = 0; i<unchecked; ++i) {
    items.push('☆')
  }
  return (
    <div>
      {items.map((item,index)=> {
        return <span key={index}>{item}</span>;
      })}
    </div>
  )
}
