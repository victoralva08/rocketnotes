import { Container, Links, Content } from './styles.js'


import { Button } from '../../components/button/index.jsx'
import { Header } from '../../components/header/index.jsx'
import { Section } from '../../components/section/index.jsx'
import { Tag } from '../../components/tag/index.jsx'
import { ButtonText } from '../../components/buttonText/index.jsx'

import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from "../../services/api.js"

export function Details() {

  const [ data, setData ] = useState({})

  const params = useParams() 
  const naviage = useNavigate()

  useEffect( () => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()

  },  )

  function handleReturn() {
    naviage(-1)
  }

  async function handleDeleteNote() {
    const confirm = window.confirm("Delete note?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      handleReturn()
    }
  }

  return(

    <Container>

    <Header />

    {
      data && 
      <main>

        <Content>

        <ButtonText title="Delete note" onClick={handleDeleteNote} />

        <h1>{data.title}</h1>

        <p>
        {data.description}
        </p>

        {

          data.links &&
          <Section title="Useful links">
            <Links>
            {
              data.links.map( link => (
              <li key={String(link.id)}>
                <a href={ link.url } target="_blank">
                  { link.url }
                </a>
                </li>
              ))
            }
            </Links>
          </Section>

        }

        {
          data.tags && 
          <Section title="Markers">
            {
              data.tags.map( tag => (
              <Tag
              key={String(tag.id)} 
              title={tag.name} />
              ))
            }
          </Section>
        }

        <Button title="Return" onClick={ handleReturn } />


        </Content>

      </main>
      }

    </Container>
  )

}

