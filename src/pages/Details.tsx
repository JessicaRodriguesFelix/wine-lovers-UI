import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface Wine {
  winery: string;
  wine: string;
  rating: {
    average: string;
    reviews: string;
  };
  location: string;
  image: string;
  id: number;
}

export const Details = () => {
  const params = useParams();
  const [selectedWine, setSelectedWine] = useState<Wine>();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.sampleapis.com/wines/reds/?wine=${params.wine}`
      );
      //console.log(params.wine);
      const data = await response.json();
      setSelectedWine(data[0]);
      //console.log(selectedWine);
    } catch (error) {
      console.log("Error fetching wine data from API:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {selectedWine && (
        <Card>
          <div
            className="image-container"
            style={{ height: "350px", width: "200px" }}
          >
            <Card.Img
              variant="top"
              src={selectedWine.image}
              height="350px"
              width="200px"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
          <Card.Body className="d-flex flex-column">
            <span className="fs-2">Wine: {selectedWine.wine}</span>
            <span className="fs-2">Location: {selectedWine.location}</span>
            <span className="fs-2">Winery: {selectedWine.winery}</span>
            <span className="fs-2">Reviews: {selectedWine.rating.reviews}</span>
            <span className="fs-2">Average: {selectedWine.rating.average}</span>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
