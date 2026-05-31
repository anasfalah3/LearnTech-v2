import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

function AdminRequireAuth({ children }) {
      const { user } = useContext(AuthContext)
      const navigate = useNavigate()

      if (!user) {
            navigate('/account/login')
            console.log("No user, redirecting to login")
            return null
      }

      if (user.role != 'admin') {
            navigate('/')
            console.log("User is not admin, redirecting to home")
            return null
      }

      return children
}

export default AdminRequireAuth
