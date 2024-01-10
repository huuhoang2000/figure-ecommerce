import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from "reactstrap"
import { getAllProducts } from "../../store/selector/product.selector";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import {  fetchProducts } from "../../store/slices/product.slice";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import '../../assets/CSS/mainpage.css';
import ShortenDescription from "../../components/ShortenDescription";
import HeaderLayout from "../../layout/HeaderLayout";
import FooterLayout from "../../layout/FooterLayout";

const MainPage = () => {
  const dispatch = useDispatch();
  const products = useAppSelector(getAllProducts);
  const navigate = useNavigate();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <div>
        <HeaderLayout></HeaderLayout>
      </div>
      <div>
        <div className="background-img">
          <Container className="d-flex justify-content-center align-items-center h-100">
            <div>
              <h1 className="mb-3 hero">Welcome to HCMax</h1>
            </div>
          </Container>
        </div>
        <Container>
          <section>
            <h2>Featured Products</h2>
            <Row className="d-flex justify-content-center align-items-center">
              {/* Repeat this Card for each product */}
              {currentProducts.map( (product, index) => {
                return (
                  <Col sm="6" md="4" lg="3" key={product.id || index}>
                    <Card className="productCard">
                      <CardImg top width="100%" src={product.image} alt="Card image cap" />
                      <CardBody>
                        <CardTitle tag="h5">{product.title}</CardTitle>
                        <CardText>
                          <ShortenDescription description={product.description}/>
                        </CardText>
                        <div>Price: {product.price}$</div>
                        <Button className="product-button" href="#">Add to Cart</Button>
                        <Link to={`/admin/products/product-detail/${product.id}`} className="btn btn-primary">Product Detail</Link>
                      </CardBody>
                    </Card>
                  </Col>
                )})}
              {/* End repeat */}
            </Row>
            <div className="naviButton">
            <Pagination currentPage={currentPage} productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate}
            />
            </div>
            <div className="linkToProductList" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <Button onClick={() => navigate(`./products/product-list`)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        cursor: 'pointer'
                      }}>
                  Search</Button>
            </div>
          </section>
        </Container>
      </div>
      <div>
        <FooterLayout></FooterLayout>
      </div>
     </>
  )
}

export default MainPage;
