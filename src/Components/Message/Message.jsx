import React from 'react'

export default function Message({ data, forwardedRef }) {
  return (
    <div className={data.self ? 'home_message self' : 'home_message parent'}>
      <div
        ref={forwardedRef}
        className={data.self ? 'child_home selfCont' : 'child_home parentCont'}
      >
        <div style={{ margin: '12px', fontSize: '14px' }}>{data.message}</div>
      </div>
    </div>
  )
}
