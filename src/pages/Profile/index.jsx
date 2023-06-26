import { Container, Form, Avatar } from './styles'
import { Input } from '../../components/input'
import { Button } from '../../components/button'

import { Link } from 'react-router-dom'


import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'

import { useState } from "react"
import { useAuth } from "../../hook/auth"

import placeHolderImg from '../../../assets/avatar_placeholder.svg'
import { api } from "../../services/api.js"

export function Profile(){

    const { user, updateProfile } = useAuth()

    const [ name, setName ] = useState(user.name)
    const [ email, setEmail ] = useState(user.email)
    const [ passwordOld, setPasswordOld ] = useState()
    const [ passwordNew, setPasswordNew ] = useState()


    const avatarURL = user.avatar ? `${ api.defaults.baseURL }/files/${ user.avatar }` : placeHolderImg


    const [ avatar, setAvatar ] = useState(avatarURL)
    const [ avatarFile, setAvatarFile ] = useState(null)

    
    async function handleUpdate() {

        const updatedUser = {
            name,
            email,
            passwordNew,
            passwordOld
        }

        const userUpdated = Object.assign(user, updatedUser)
        
        await updateProfile({ user: userUpdated, avatarFile })
    }

    async function handleChangeAvatar(event) {

        const file = event.target.files[0]
        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)

    }
    
    
    return (
        <Container>
            <header>
            <Link to="/">
                <FiArrowLeft />
            </Link>

            </header> 

            <Form>

                <Avatar>
                    <img src={avatar} 
                    alt="User's picture" />

                    <label htmlFor="avatar">
                        
                    <FiCamera/>

                    <input 
                    type="file"
                    id="avatar"
                    onChange={ handleChangeAvatar }
                     />

                    </label>
                </Avatar>

                <Input 
                    placeholder="Name"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={ (e) => setName(e.target.value) }
                />

                <Input 
                    placeholder="Email"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                />

                <Input 
                    placeholder="Current password"
                    type="password"
                    icon={FiLock}
                    onChange={ (e) => setPasswordOld(e.target.value) }
                />

                <Input 
                    placeholder="New password"
                    type="password"
                    icon={FiLock}
                    onChange={ (e) => setPasswordNew(e.target.value) }
                />

                <Button title="Update" onClick={ handleUpdate } />

            </Form>
            
             
        </Container>
    )
}