import React from 'react'

function GenericField(props) {
  const {input, placeholder, type, meta: {asyncValidating, error, touched}} = props
  const errorText = touched && error && <div style={{color: 'red'}}>{error}</div>
  return (
    <div>
      <input {...input} type={type} placeholder={placeholder}/>
      {errorText}
    </div>
  )
}

export default GenericField