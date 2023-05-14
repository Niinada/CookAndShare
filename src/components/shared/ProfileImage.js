import React from 'react'
import md5 from 'js-md5'

export default ({ user, width = '' }) => (
  <div
    alt={user.name}
    width={width}
  />
)
