import Container from "../components/Container";
import "../App.css";
import "../assets/css/layout.scss";

export default function ErrorPage() {
  return (
    <Container id="error-page">
      <div className="sub-container">
        <h1>Oops!</h1>
        <section className="part">
          <p>Sorry, an unexpected error has occurred.</p>
        </section>
      </div>
    </Container>
  );
}
