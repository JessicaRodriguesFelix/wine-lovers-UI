import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

export function Store() {
  interface Wine {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }
  interface WineData {
    drinks: Wine[];
    // Add any other properties you expect to receive from the API
  }
  const [wines, setWines] = useState<WineData>({ drinks: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
        );
        const data = await response.json();
        setWines(data);
      } catch (error) {
        console.log("Error fetching wine data from API:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {wines.drinks.map((wine) => (
          <Col key={wine.idDrink}>
            <StoreItem
              // key={wine.idDrink}
              id={parseInt(wine.idDrink)}
              name={wine.strDrink}
              image={wine.strDrinkThumb}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
