import React from 'react'
import SignInModal from '../Components/SignInModal.js'
import {Menu, Container} from 'semantic-ui-react'

export default function TopNav (props){
    const { loggedIn, setLoggedIn } = props;

    return(     
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item position='left' header>
              Serverless Demo
            </Menu.Item>
              {!(loggedIn instanceof Promise) && <SignInModal  loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Container>
        </Menu>
    )
}