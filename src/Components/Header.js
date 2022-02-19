import React from 'react'

function Header({title}) {
  return (
    <header>
        <h1>
            {title}
        </h1>

    </header>
  )
}


// Setting Default values for props
Header.defaultProps ={
  title: "Default Title"
}

export default Header