import React from 'react';
import Container from "./home.styles";
import Header from "../../components/header/header";
import Calculator from "../../components/calculator/calculator";

const Home = () => {

    return (
        <Container>
            <Header/>
            <Calculator/>
        </Container>
    );
};

export default Home;