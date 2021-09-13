import React from 'react'
import {Button, Container, Segment, List, Header} from 'semantic-ui-react'
import { app } from '../index.js'

export default function ContentButtons (props){

    const [textFill, settextFill] = React.useState("Foo Bar"); 

    async function contentHandler(type){
        const resp = await app.callFunction("get"+type);
        
        console.log(resp);
        switch(type){
            case "Joke":
                settextFill(<Header>{resp.Joke.joke}</Header>);
                break;
            case "Drink":
                settextFill(
                    <>
                        <Header>
                            { resp.name }
                        </Header>
                        <Segment>
                            {resp.instructions}
                        </Segment>
                        <Segment>
                            <List bulleted>
                            {resp.ingredients.map((ingredient, index) => (
                                <List.Item>{ingredient.measure + " of " + ingredient.ingredient} </List.Item>
                            ))}
                            </List>
                        </Segment>
                    </>
                );
                break;
            case "News":
                console.log(resp)
                settextFill(
                    <>
                    {resp.map((story, index) => (
                        <Segment>
                            <Header>
                            { story.title }
                            </Header>
                            { story.description }
                            <a href={story.url} target="_blank" rel="noopener noreferrer">Link</a>
                        </Segment>
                    ))}
                    </>
                );
                break;
            default:
                console.log("Encountered an unexpected type")
        }
    }

    return(  
        <Container style={{ marginTop: '7em' }} textAlign='center'>
            <Button size='massive' onClick={() => contentHandler("Joke")}>Get a Joke</Button>
            <Button size='massive' onClick={() => contentHandler("Drink")}>Get a Drink</Button>
            <Button size='massive' onClick={() => contentHandler("News")}>Check the News</Button>

            <Segment.Group raised style={{ margin: '1em 5em 5em', padding: '5em 0em' }}>
                {textFill}
            </Segment.Group>
        </Container>
    )
}
