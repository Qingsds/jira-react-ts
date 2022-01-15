import { useAuth } from './context/auth-context'
import ProjectListScreen from './screen/project-list'

export default function AuthenticatedApp(){
  const {logout} = useAuth()
  return <div>
    <button onClick={logout}>登出</button>
    <ProjectListScreen />
  </div>
}