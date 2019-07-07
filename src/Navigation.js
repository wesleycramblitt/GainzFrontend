import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


class Navigation extends React.Component {
    render() {
        return (<Navbar style={{backgroundColor:"#333",padding:"0.5em"}} variant="dark">
                    <Navbar.Brand >      
                        <img
                            alt=""
                            height="40"
                            src="/logo.png"
                            className="d-inline-block align-top"
                        />            
                    </Navbar.Brand>
                    <Nav className="mr-auto"></Nav>
                </Navbar>)
    }
}


export default Navigation;