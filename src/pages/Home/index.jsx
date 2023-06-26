import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/header'
import { ButtonText } from '../../components/buttonText/index.jsx'

import { Section } from '../../components/section/index.jsx'
import { Note } from '../../components/note/index.jsx'

import { Input } from '../../components/input/index.jsx'
import { useNavigate } from 'react-router-dom'

import { useState, useEffect } from "react"
import { api } from "../../services/api.js"

export function Home() {

    const [ tags, setTags ] = useState([])
    const [ tagSelected, setTagSelected ] = useState([])
    const [ search, setSearch ] = useState("")
    const [ notes, setNotes ] = useState([])

    const navigate = useNavigate()

    function handleSelectedTag (tagName) {
        const alreadySelected = tagSelected.includes(tagName)

        if(alreadySelected) {
            setTagSelected(tagSelected.filter( tag => tag !== tagName))
        } else {
            setTagSelected( [ ...tagSelected, tagName ] )
        }

    }

    function handleResetTags () {
        setTagSelected([])
    }

    function handleDetails (id) {
        navigate(`/details/${id}`)
    }

    useEffect( () => {

        async function fetchTags() {
            const response = await api.get("/tags")
            setTags(response.data)
        }

        fetchTags()

    }, [])

    useEffect( () => {

        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagSelected}`)
            setNotes(response.data)
            console.log(notes)
        }

        fetchNotes()

    }, [ tagSelected, search ])

    return (

    <Container>

        <Brand>
            <h1>Pocket Notes</h1>        
        </Brand>

        <Header />

        <Menu>

            <li>
                
                <ButtonText
                title='All'
                onClick={ handleResetTags }
                isActive={tagSelected.length === 0} />

            </li>
            
            {

            tags && tags.map( tag => (
            <li>
                <ButtonText
                 key={String(tag.id)} 
                 title={tag.name}
                 onClick={ () => handleSelectedTag(tag.name) }
                 isActive={tagSelected.includes(tag.name)}
                 />
            </li>
            ))

            }   

        </Menu>

        <Search>
            <Input
             placeholder="Search for note title" 
             icon={FiSearch}
             onChange={ (e) => setSearch(e.target.value) } />
        </Search>

        <Content>

        <Section title="My notes">

            {
                notes.map( note => (
                    <Note 
                        key={String(note.id)}
                        data={note}
                        onClick={ () => handleDetails(note.id) }
                    />
                 ) )

            }

        </Section>

        </Content>

        <NewNote to="/newnote">
            <FiPlus />
            Create note
        </NewNote>

    </Container>



    )
}