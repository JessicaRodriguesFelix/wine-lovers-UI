import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

export function Store() {
  interface Wine {
    id: number;
    wine: string;
    image: string;
  }

  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    const fetchData = async (wine: Wine[]) => {
      try {
        const response = await fetch(
          `https://api.sampleapis.com/wines/reds/${wine}`
        );
        const data = await response.json();

        const winesWithModifiedImage = data.map((wine: Wine) => ({
          ...wine,
          image: `${wine.image}?size=small`, // Replace "medium" with the desired image size parameter
        }));
        setWines(winesWithModifiedImage);
      } catch (error) {
        console.log("Error fetching wine data from API:", error);
      }
    };
    fetchData(wines);
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row md={3} xs={2} lg={4} className="g-3">
        {wines.map((wine) => (
          <Col key={wine.id}>
            <StoreItem id={wine.id} wine={wine.wine} image={wine.image} />
          </Col>
        ))}
      </Row>
    </>
  );
}
