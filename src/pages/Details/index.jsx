import { Container, Links, Content } from './styles.js'


import { Button } from '../../components/button/index.jsx'
import { Header } from '../../components/header/index.jsx'
import { Section } from '../../components/section/index.jsx'
import { Tag } from '../../components/tag/index.jsx'
import { ButtonText } from '../../components/buttonText/index.jsx'

export function Details() {

  return(

    <Container>

    <Header />

    <main>
    <Content>

    <ButtonText title="Delete note" />

    <h1>Introduction to React</h1>

    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Autem quod suscipit cum, laboriosam,
    quis numquam et mollitia dolorum soluta consequatur aperiam perspiciatis ea corporis rerum,
    voluptate excepturi incidunt? Distinctio, hic?
    </p>

    <Section title="Useful links">
      <Links>
        <li><a href="#">https://www.google.com.br</a></li>
        <li><a href="#">https://www.google.com.br</a></li>
      </Links>
    </Section>

    <Section title="Markers">
      
    <Tag title='express' />
    <Tag title='node' />

    </Section>

    <Button title="Return"/>


    </Content>
    </main>
    
    </Container>
  )

}

