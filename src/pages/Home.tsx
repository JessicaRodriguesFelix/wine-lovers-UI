import WineUpcoming from "../img/wine-upcoming.jpg";
export const Home = () => {
  return (
    <div className="home-page">
      <header>
        <h1>Welcome to the Crush Club</h1>
        <p>Discover and explore a world of fine wines.</p>
      </header>

      <section className="featured-wines">
        <h4>Upcoming Events</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non
          quis exercitationem culpa nesciunt nihil aut nostrum explicabo
          reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
          Voluptatum ducimus voluptates voluptas?
        </p>
        <img
          src={WineUpcoming}
          style={{
            width: "320px",
            display: "block",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "30px",
          }}
          alt="Upcoming Wine Event"
          className="event-image"
        />
      </section>
      <section className="subscription-form">
        <h4>Join Our Wine Club</h4>
        <p>Subscribe to our newsletter for updates and exclusive offers:</p>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} Wine Club App</p>
      </footer>
    </div>
  );
};
