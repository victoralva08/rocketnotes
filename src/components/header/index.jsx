import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'

import { useAuth } from "../../hook/auth"

import { useNavigate } from 'react-router-dom'

import placeHolderImg from '../../../assets/avatar_placeholder.svg'
import { api } from "../../services/api.js"

export function Header(){

    const { signOut, user } = useAuth()

    const avatarURL = user.avatar ? `${ api.defaults.baseURL }/files/${ user.avatar }` : placeHolderImg

    const navigate = useNavigate()

    function handleSignOut() {
        const confirm = window.confirm("Do you wish to sign out? ")
        if (confirm) {
            navigate("/")
            signOut()
        }
    }

    return(

    <Container>

        <Profile to="/profile">

            <img src={avatarURL} alt={user.name} />

            <div>
                <span>Welcome,</span>
                <strong>{user.name}</strong>
            </div>

       </Profile>

        <Logout>
            <RiShutDownLine onClick={ handleSignOut }/>
        </Logout>

    </Container>

    )
}