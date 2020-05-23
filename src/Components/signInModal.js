import React from 'react'
import { Menu, Form, Button, Modal } from 'semantic-ui-react'

const SignInModal = () => (
    <Modal trigger={<Menu.Item position='right' >Log-in / Sign-up</Menu.Item>}>
        <Modal.Header>Log-in / Sign-up</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form>
                    <Form.Field>
                    <label>E-mail</label>
                    <input placeholder='foo@bar.com' />
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type='password'/>
                    </Form.Field>
                    <Button type='submit'>Log-in</Button>
                    <Button type='submit'>Sign-up</Button>
                </Form>
            </Modal.Description>
        </Modal.Content>
  </Modal>
)

export default SignInModal