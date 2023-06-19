import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/header'
import { ButtonText } from '../../components/buttonText/index.jsx'

import { Section } from '../../components/section/index.jsx'
import { Note } from '../../components/note/index.jsx'

import { Input } from '../../components/input/index.jsx'
import { Link } from 'react-router-dom'

export function Home() {
    return (

    <Container>

        <Brand>
            <h1>Pocket Notes</h1>        
        </Brand>

        <Header />

        <Menu>
            <li><ButtonText title='All' isActive /></li>
            <li><ButtonText title='React' /></li>
            <li><ButtonText title='Node' /></li>
        </Menu>

        <Search>
            <Input placeholder="Search title" icon={FiSearch} />
        </Search>

        <Content>

        <Section title="My notes">

            <Note data={{
                title: 'Note one',
                tags: [
                    {id: '1', name: 'react'},
                    {id: '2', name: 'node'}
                ]
            }}
            />


        </Section>

        </Content>

        <NewNote to="/newnote">
            <FiPlus />
            Create note
        </NewNote>

    </Container>



    )
}