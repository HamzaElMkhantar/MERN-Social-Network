import React from 'react'

function InputOption({Icon , title , color}) {
  return (
    <div style={{justifyContent:'center' ,alignItems:'center'}} className='inputOption d-flex'>
        <div className="icon mx-2" style={ {color} } >
                {Icon}
        </div>
        <h4>{title}</h4>
    </div>
  )
}

export default InputOption ;