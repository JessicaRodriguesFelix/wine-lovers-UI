import { useEffect, useState } from "react";
import { CardImg, Row, Card, Button } from "react-bootstrap";

export function Store() {
  const quantityCart = 2;
  // Add properties expected to receive from the API
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
    <div>
      <h1>Drinks Lovers</h1>
      {wines.drinks && wines.drinks.length > 0 ? (
        <Card>
          <Row md={2} xs={1}>
            {wines.drinks.map((wine) => (
              <div>
                <CardImg
                  key={wine.idDrink}
                  variant="top "
                  src={wine.strDrinkThumb}
                  alt={wine.strDrink}
                  height="450px"
                  style={{ objectFit: "cover" }}
                ></CardImg>
                <Card.Body>
                  <Card.Title>
                    <span>{wine.strDrink}</span>
                  </Card.Title>
                  <div>
                    {quantityCart === 0 ? (
                      <Button className="w-100">+ Add To Cart</Button>
                    ) : (
                      <div
                        className="d-flex align-items-center flex-column"
                        style={{ gap: "0.5rem" }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ gap: "0.5rem" }}
                        >
                          <Button>-</Button>
                          <div>
                            <span className="fs-4">{quantityCart}</span> in cart
                          </div>
                          <Button>+</Button>
                        </div>
                        <Button variant="danger" size="sm">
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </div>
            ))}
          </Row>
        </Card>
      ) : (
        <p>Loading wines</p>
      )}
    </div>
  );

  // });
}
