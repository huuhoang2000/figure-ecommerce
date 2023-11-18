import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Nav, NavItem, Navbar, NavbarBrand, Row, Table } from "reactstrap"
import { getAllProducts, getProductsByCategory } from "../../store/selector/product.selector";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "../../store/slices/product.slice";
import { NavLink, useNavigate } from "react-router-dom";
import '../../assets/CSS/mainpage.css';


const ProductList = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const products = useAppSelector(state => category ? getProductsByCategory(state, category) : getAllProducts(state));
  // const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 4;
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const products = useAppSelector(state => 
  //   selectedCategories.length > 0 ? getProductsByCategory(state, selectedCategories) : getAllProducts(state));

  const [showFullDescription, setShowFullDescription] = useState(Array(products.length).fill(false));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);


  // const handleCheckboxChange = (event) => {
  //   const { value, checked } = event.target;
  //   setSelectedCategories(prevState => 
  //     checked ? [...prevState, value] : prevState.filter(category => category !== value)
  //   );
  // }
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <div>
        <Navbar color="light" light expand="md">
          <Container fluid className=" d-flex justify-content-between">
            <NavbarBrand href="#">HCMax</NavbarBrand>
            <Nav navbar className="navbar d-flex flex-row">
              <NavItem className="pe-2 ps-2 navItem">
                <NavLink href="#" className="navbarlink">Home</NavLink>
              </NavItem>
              <NavItem className="pe-2 ps-2 navItem">
                <NavLink href="#" className="navbarlink">Shop</NavLink>
              </NavItem>
              <NavItem className="pe-2 ps-2 navItem">
                <NavLink href="#" className="navbarlink">Cart</NavLink>
              </NavItem>
              <Dropdown className="navItem" nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                  Menu
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#">Contact</DropdownItem>
                  <DropdownItem href="#">Login</DropdownItem>
                  <DropdownItem href="#">Sign Up</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    <div>

        <div className="background-img">
        <Container className="d-flex justify-content-center align-items-center h-100">
          <div>
            <h1 className="mb-3 hero">Welcome to HCMax</h1>
            <h4 className="mb-3 hero">specializes in Manga, Anime, Vocaloid, Japanese Game toy models</h4>
          </div>
        </Container>
      </div>
      <Container>
        <section>
          <h2>All Products</h2>

          <div>
            <Input type="select" name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </Input>       
          </div>

          <Row className="d-flex justify-content-center align-items-center">

            {products.map( (product, index) => {
              return (
                <Col sm="6" md="4" lg="3">
                  <Card className="productCard">
                    <CardImg top width="100%" src={product.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle tag="h5">{product.title}</CardTitle>
                      <CardText>
                      {showFullDescription[index] ? product.description : `${product.description.substring(0, 100)}...`}
                        <button onClick={() => {
                          const newShowFullDescription = [...showFullDescription];
                          newShowFullDescription[index] = !newShowFullDescription[index];
                          setShowFullDescription(newShowFullDescription);
                        }}>
                          {showFullDescription[index] ? 'Show less' : 'Show more'}
                        </button>
                        </CardText>
                      <div>Price: {product.price}$</div>
                      <Button className="product-button" href="#">Add to Cart</Button>
                      <Button className="product-button" href="#">Product Detail</Button>
                    </CardBody>
                  </Card>
                </Col>
              )})}

          </Row>
        </section>
      </Container>
      <footer>
        <Container>
          <Row>
            <Col>
              <h3>About</h3>
              <p>A paradise for Manga Anime fans, the shop gathers most typical products of Japanese comics and animation.</p>
            </Col>
            <Col>
              <h3>Contact Us</h3>
              <div>Address: </div>
              <div>Phone Number: </div>
              <div>Email: </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>© 2023 My E-commerce Site</p>
            </Col>
            <Col>
              <div className="payment-block">
                {/* Add payment icons here */}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      </div>
    </>
  )
}

export default ProductList;
