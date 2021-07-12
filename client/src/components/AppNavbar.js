import { useState, useEffect} from "react";
// import { post } from "../scripts/basics";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Input, Button
} from 'reactstrap';

const AppNavbar = ({title}) => {
    const getUserData = (username, pwd=false) => {
        fetch(`${window.location.protocol}//${window.location.hostname}:5000/api/users/${username}`)
            .then(res => {
                if(res.ok) return res.json()
                throw res;
            })
            .then(data => {
                user.username = username;
                user.userID = data.id;
                if(pwd && pwd === data.pwd){
                    user.loggedIn = true
                };
                console.log(user)
            })
            .catch(err => {console.log(err);})
    }

    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({username:undefined, userID:undefined, loggedIn:false});
    const [login, setLogin] = useState(false);

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {
    //         setUser(JSON.parse(loggedInUser));
    //     //   setUser(user);
    //     }
    //   }, []);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">{title}</NavbarBrand>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {(login && !user.loggedIn) || <NavLink className="login" onClick={() => setLogin(true)}>{user.username || "Logga In"}</NavLink>}
                                {login && !user.loggedIn && <><Button className="login" style={{float:"right", marginTop:".5rem"}} onClick={() => {
                                    getUserData(user.username, document.getElementById("pass").value);
                                    console.log(user);
                                    localStorage.setItem('user', user);
                                    window.location.reload();
                                    // setLogin(!login); // TA bort "logga in"
                                }}>Logga In</Button><br/><br/></>}
                            </NavItem>
                            {login && !user.loggedIn && <>
                            <NavItem className="login">
                                <Input placeholder="Användarnamn" onChange={(e) => {getUserData(e.target.value);}}/>
                            </NavItem>
                            <NavItem className="login">
                                <Input id="pass" type="password" placeholder="Lösenord" on/>
                            </NavItem>
                            </>
                            }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavbar
