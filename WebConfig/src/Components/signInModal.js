import React from 'react'
import { app } from "../index";
import {
  AnonymousCredential,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";
import {Menu, Form, Button, Modal } from 'semantic-ui-react'

export default function SignInModal (props){
    // Set-up state for Username/Password
    const { loggedIn, setLoggedIn } = props;
    const [username, setUsername] = React.useState("foo@bar.com");
    const [password, setPassword] = React.useState("Password");

    // Handle Login
    async function handleLogin(event) {
    try {
        event.preventDefault();
        await app.auth.loginWithCredential(
        new UserPasswordCredential(username, password)
        );
        setLoggedIn(
        app.auth.user.loggedInProviderType === "anon-user" ? false : true
        );
    } catch (error) {
        console.log("Issue with user Login:", error);
        }
    }

    // Handle Logout
    async function handleLogout() {
    try {
        await app.auth.loginWithCredential(new AnonymousCredential());
        setLoggedIn(
        app.auth.user.loggedInProviderType === "anon-user" ? false : true
        );
        setUsername("foo@bar.com");
        setPassword("Password");
    } catch (error) {
        console.log("Issue with user Logout:", error);
    }
    }

    // Handle Sign-up
    async function handleSignup() {
        try {
            await app.auth.loginWithCredential(new AnonymousCredential());
            setLoggedIn(
            app.auth.user.loggedInProviderType === "anon-user" ? false : true
            );
            setUsername("foo@bar.com");
            setPassword("Password");
        } catch (error) {
            console.log("Issue with user Logout:", error);
        }
    }

    console.log(loggedIn);

   return loggedIn ? (<Menu.Item position='right' onClick={handleLogout} header>Log Out</Menu.Item>):(
        <Modal trigger={<Menu.Item position='right' header>Log-in / Sign-up</Menu.Item>}>
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
                        <Button type='submit' onClick={handleLogin}>Log-in</Button>
                        <Button type='submit' onClick={handleSignup}>Sign-up</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
   )
}
