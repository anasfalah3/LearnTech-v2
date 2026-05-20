import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
      return (
            <Navbar expand="md" className="bg-white shadow-lg header py-3 navbar navbar-expand-lg sticky-top">
                  <Container className="container">
                        <Navbar.Brand href="/" className="navbar-brand fw-bold" style={{ fontFamily: "'Sora',sans-serif", fontSize: "1.3rem", color: "var(--primary)" }}>
                              <i className="bi bi-mortarboard-fill me-2"></i>LearnTech
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll" className="collapse navbar-collapse">
                              <Nav className="me-auto my-2 my-lg-0 navbar-nav mx-auto gap-1" navbarScroll>
                                    <Nav.Link href="/courses" className="nav-item nav-link fw-medium">All Courses</Nav.Link>
                                    <Nav.Link href="#" className="nav-item nav-link fw-medium">About</Nav.Link>
                                    <Nav.Link href="#" className="nav-item nav-link fw-medium">Contact</Nav.Link>
                              </Nav>
                              <div className="d-flex gap-2">
                                    <Link to='/account/dashboard' className="btn btn-primary btn-sm px-3" style={{ borderRadius: 100 }}>My Account</Link>
                              </div>
                        </Navbar.Collapse>
                  </Container>
            </Navbar>
      )
}

export default Header