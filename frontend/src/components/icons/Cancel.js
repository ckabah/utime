import React from 'react'

function CancelButton({ onClick }) {
  return (
    <button className='cancel_btn' onClick={onClick}>
        <svg width="28px" height="28px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">

            <g id="cancel">
              <path className="cls-1" d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z"/>

              <path className="cls-1" d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z"/>
            </g>

</svg>
    </button>
  )
}

export default CancelButton