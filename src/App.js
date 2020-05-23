import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import style from './Style.js'
import {Container, Menu} from 'semantic-ui-react'
import SignInModal from './Components/signInModal.js'

function App() {
  return (
    <div style={style.container}>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item position='left' header>
            Serverless Demo
          </Menu.Item>
        </Container>
        <SignInModal />
      </Menu>
    </div>
  );
}

export default App;
