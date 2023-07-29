import React from 'react'
import Helemt from "react-Helmet"

const Data = ({title}) => {
  return (
   <Helemt>
    <title>{title}</title>  
    {/* this will make title of each page same and one jo yaha pass hoga  */}
   </Helemt>
  )
}

export default Data