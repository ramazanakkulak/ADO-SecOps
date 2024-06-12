import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import Navbars from "./Navbars";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Cards() {
  const navigate = useNavigate();
  const [cinemaData, setcinemaData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/account/status`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`, // Authorization başlığını ve Bearer JWT'yi ekle
            },
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/movies`);
        setcinemaData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const handleClick = async (movieTitle) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/movies/buy-ticket`,
        { title: movieTitle },
        {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`, // Authorization başlığını ve Bearer JWT'yi ekle
          },
        }
      );

      alert(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderCard = (card, index) => {
    return (
      <Col sm={6} lg={6}>
        <Card key={index} className="shadow">
          <Card.Body>
            <h3>{card.title}</h3>
            <p style={{ fontSize: "15px", margin: 0 }}>{card.info}</p>

            <Row className="mt-0 gy-4">
              <img
                className="col-12 col-xl-5"
                variant="top"
                src={card.image}
                style={{ height: "fit-content" }}
              />
              <div className="col-12 col-xl-7">
                <h5>Storyline</h5>
                <p style={{ fontSize: "13px", textAlign: "justify" }}>
                  {card.text}
                </p>
                <p style={{ fontSize: "13px", margin: 0 }}>
                  <strong>Director: </strong>
                  {card.director}
                </p>
                <p style={{ fontSize: "13px", margin: 0 }}>
                  <strong>Actors: </strong>
                  {card.actors}
                </p>
              </div>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <a href={card.fragman} className="btn btn-warning">
                Fragman
              </a>
              <Button
                className="btn btn-success"
                onClick={() => handleClick(card.title)}
              >
                Buy Ticket
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Navbars />
      <Row className="mx-auto p-3 mt-1 g-5">{cinemaData.map(renderCard)}</Row>
    </>
  );
}
