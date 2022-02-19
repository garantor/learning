import React from 'react'

function Footer({len}) {
    const today = new Date()
     
  return (
    <footer>
      <p>
        {len} List {len === 1 ? "item": "items"} 
      </p>
    </footer>
  )
}

export default Footer