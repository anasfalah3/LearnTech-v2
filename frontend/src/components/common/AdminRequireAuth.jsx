import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth'


import { useEffect } from 'react'

function AdminRequireAuth({ children }) {
      const { user } = useContext(AuthContext)
      const navigate = useNavigate()
      useEffect(() => {
            if (!user) {
                  navigate('/account/login', { replace: true })
            } else if (user.role !== 'admin') {
                  navigate('/', { replace: true })
            }
      }, [user, navigate])

      if (!user || user.role !== 'admin') {
            return null
      }
      return children
}

export default AdminRequireAuth
