import { useEffect, useState } from "react";

export function Store() {
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
      <h1>Store</h1>
      {wines.drinks && wines.drinks.length > 0 ? (
        <ul>
          {wines.drinks.map((wine) => (
            <li key={wine.idDrink}>
              {wine.strDrink} -
              <img src={wine.strDrinkThumb} alt={wine.strDrink} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading wines</p>
      )}
    </div>
  );

  // });
}
