import { Container, Form, Background } from './styles'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { FiUser, FiMail, FiLock} from 'react-icons/fi'

import { Link, useNavigate } from 'react-router-dom'

import { useState } from "react"

import { api } from "../../services/api"

export function Signup(){

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate()

    function handleSignUp() {
        
        if (!name || !email || !password) {
            return alert("Please, fill all the inputs.")
        }

        api.post("/users", { name, email, password })
        .then(() => {
            alert("User successfully registered.")
            navigate(-1)
        })
        .catch(error => {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("User not registered.")
            }
        })

    }

    return (
        <Container>

            <Background />

            <Form>

                <h1>Pocket Notes</h1>            
                <h2>Create account</h2>

                <Input 
                    placeholder="Name"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />
                
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

                <Button title="Register" onClick={handleSignUp} />
                <Link to="/">Return to login</Link>


            </Form>


        </Container>
    )
}