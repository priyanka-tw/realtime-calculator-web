import React from 'react';
import Container from "./home.styles";
import Header from "../../components/header/header";
import Calculator from "../../components/calculator/calculator";
import HistoryPanel from "../../components/history-panel/history-panel";

const Home = () => {

    return (
        <Container>
            <Header/>
            <div style={{display: "flex"}}>
                <Calculator/>
                <HistoryPanel/>
            </div>
        </Container>
    );
};

export default Home;