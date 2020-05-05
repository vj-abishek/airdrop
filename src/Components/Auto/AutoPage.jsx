import { useReducer, useState, useEffect } from 'react'
import Info from '../../Tools/Getdevice'
// import { Redirect } from 'react-router-dom'
import { setUser } from '../../State/action'

export default function AutoPage() {
  // eslint-disable-next-line
  const [socket, dispatch] = useReducer(setUser, '')
  const [name, setName] = useState()

  useEffect(() => {
    let info = Info()
    let final = info[0] === 'x64' ? `x64${Math.random()}` : info[0]
    setName(final)
    if (name) dispatch({ type: 'SET_NAME', name })
  }, [name])

  return null
}
