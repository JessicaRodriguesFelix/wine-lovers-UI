import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import CustomModal from "../components/CustomModal";

export function Store() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function showCustomModal(message: string) {
    setModalMessage(message);
    setShowModal(true);
  }

  function hideCustomModal() {
    setShowModal(false);
  }
  // Define the Wine interface for type
  interface Wine {
    id: number;
    wine: string;
    image: string;
  }

  // State to hold the list of wines fetched from the API
  const [wines, setWines] = useState<Wine[]>([]);

  // State to handle the search query
  const [search, setSearch] = useState<string>("");
  const [filteredWine, setFilteredWine] = useState<Wine[]>([]);

  // Function to handle changes in the search input field
  function handleChange(e: any) {
    const searchValue = e.target.value;

    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(searchValue)) {
      showCustomModal(
        "Special characters are not allowed. Please enter only letters and numbers."
      );
      e.target.value = "";
      return;
    }
    setSearch(searchValue);
    const filteredWineTemp = wines.filter((wine) => {
      return wine.wine.match(regex);
    });
    // console.log(filteredWine);
    setFilteredWine(filteredWineTemp);
  }
  // Fetch data from the API and update the wines state
  useEffect(() => {
    const fetchData = async (wine: Wine[]) => {
      try {
        const response = await fetch(
          `https://api.sampleapis.com/wines/reds/${wine}`
        );
        const data = await response.json();

        const winesWithModifiedImage = data.map((wine: Wine) => ({
          ...wine,
          image: `${wine.image}?size=small`,
        }));
        setWines(winesWithModifiedImage);
      } catch (error) {
        console.log("Error retrieving wine data from API:", error);
      }
    };
    fetchData(wines); // Call the fetchData function to initiate the API call
  }, []);

  // Update the filteredWine state when the search query or the list of wines changes
  useEffect(() => {
    setFilteredWine(
      wines.filter((wine) =>
        wine.wine.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, wines]);

  return (
    <>
      <InputGroup>
        <InputGroup.Text id="search">Search Wine</InputGroup.Text>
        <FormControl
          aria-label="search"
          aria-describedby="search"
          placeholder="Looking for a particular wine? Start typing..."
          onChange={handleChange}
        />
      </InputGroup>
      <CustomModal
        show={showModal}
        handleClose={hideCustomModal}
        message={modalMessage}
      />
      <h1>Store</h1>
      {!filteredWine ? (
        <Row md={3} xs={2} lg={4} className="g-3">
          {wines.map((wine) => (
            <Col key={wine.id}>
              <StoreItem id={wine.id} wine={wine.wine} image={wine.image} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row md={3} xs={2} lg={4} className="g-3">
          {filteredWine.map((wine) => (
            <Col key={wine.id}>
              <StoreItem id={wine.id} wine={wine.wine} image={wine.image} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
