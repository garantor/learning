import React from 'react'

function Footer({len}) {
     
  return (
    <footer>
      <p>
        {len} List {len === 1 ? "item": "items"} 
      </p>
    </footer>
  )
}

export default Footer