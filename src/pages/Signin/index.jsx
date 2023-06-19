import { Container, Form, Background } from './styles'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi'

import { Link } from 'react-router-dom'


import { useAuth } from "../../hook/auth"

import { useState } from "react"

export function Signin(){

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    
    const { signIn } = useAuth()

    function handleSignIn() {
        signIn({ email, password })
    }

    return (
        
        <Container>

            <Form>

                <h1>Pocket Notes</h1>
                <p>This application saves and manages your favorite links.</p>
            
                <h2>Access your notes</h2>

                <Input 
                    placeholder="Email"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Password"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title="Log in" onClick={handleSignIn} />
                <Link to="/register">
                    Create a new account
                </Link>

            
            </Form>

            <Background />

        </Container>
    )
}