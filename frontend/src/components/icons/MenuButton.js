import React from 'react'

function MenuButton({ onClick }) {
  return (
    <button className='menu_btn' onClick={onClick}>
        <svg width="28px" height="28px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">

            <g fill="#333333ff">
                <path d="M1 3.75A.75.75 0 011.75 3h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 3.75zM1 7.75A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 11a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"/>
            </g>

        </svg>
    </button>
  )
}

export default MenuButton