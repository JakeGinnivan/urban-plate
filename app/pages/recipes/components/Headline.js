import React from 'react'

const Headline = ({ header, value, separator }) => (
  <div style={{ borderRight: separator ? '1px solid lightgrey' : 'none', display: 'inline-block', padding: '0 15px' }}>
    <div><strong>{header}</strong></div>
    <div>{value}</div>
  </div>
)

export default Headline
