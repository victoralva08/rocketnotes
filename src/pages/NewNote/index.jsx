import { Container, Form } from './styles'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { Textarea } from '../../components/textarea'
import { NoteItem } from '../../components/noteitem'
import { Section } from '../../components/section'
import { Button } from '../../components/button'

import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { api } from "../../services/api"


export function NewNote() {

    const [ links, setLinks ] = useState([])
    const [ newLink, setNewLink] = useState("")

    const [ tags, setTags ] = useState([])
    const [ newTag, setNewTag ] = useState("")

    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")

    const navigate = useNavigate()

    function handleAddLink() {

        if (!newLink){
            alert("Please, inform a link to add it to your note!")
            return
        }

        setLinks( prevState => [...prevState, newLink] )
        setNewLink("")
    }

    function handleRemoveLink(deleteLink) {
        setLinks(prevState => prevState.filter(link => link !== deleteLink) )
    }

    function handleAddTag() {

        if (!newTag){
            alert("Please, inform a tag to add it to your note!")
            return
        } 

        setTags([ ...tags, newTag ])
        setNewTag("")
    }

    function handleRemoveTag(deleteTag) {
        setTags(prevState => prevState.filter(tag => tag !== deleteTag) )
    }
    
    async function handleRegisterNote() {

        await api.post("/notes", { title, description, tags, links })
        .then( () => 
        navigate('/')
        ) .catch(error => {
            if (error.response) {
                alert(error.response.data.message)
            }
        })
    }    

    return (
        <Container>
            <Header />

            <main>
                
                <Form>

                   <header>
                        <h1>Create note</h1>
                        <Link to="/">Cancel</Link>
                    </header> 

                    <Input
                    placeholder="Note title"
                    onChange={ e => setTitle(e.target.value)}
                    />

                    <Textarea
                    placeholder="Observations"
                    onChange={ e => setDescription(e.target.value)}
                    />
                
                    <Section title="Useful links">


                        {
                            links.map( (link, index) => (

                                <NoteItem
                                    key={index}
                                    value={link}
                                    onClick={ () => handleRemoveLink(link) }                   
                                />

                            ))
                        }

                        <NoteItem
                            isNew
                            placeholder="New link"
                            value={newLink}
                            onChange={ e => setNewLink(e.target.value) }
                            onClick={ handleAddLink }                   
                        />
                       
                    </Section>

                    <Section title="Markers">

                        <div className="tags">

                            {
                                tags.map( (tag, index) => (
                                <NoteItem 
                                    kay={index}
                                    value={tag}
                                    onClick={ () => handleRemoveTag(tag) }
                                />


                                ) )
                            }

                            <NoteItem
                                isNew
                                placeholder="New tag"
                                value={newTag}
                                onChange={ e => setNewTag(e.target.value) }
                                onClick={ handleAddTag }
                            />
                            
                        </div>

                    </Section>
                
                    <Button title="Create" onClick={ handleRegisterNote } />

                </Form>

            </main>


        </Container>

    )
}