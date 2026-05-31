import { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { Navigate } from 'react-router-dom'

function GuestOnly({ children }) {
      const { user } = useContext(AuthContext);
      if (user) {
            return <Navigate to="/account/profile" />
      }
      return children
}

export default GuestOnly
