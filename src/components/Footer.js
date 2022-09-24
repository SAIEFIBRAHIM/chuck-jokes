import seeStats from "../assets/frontend1/path-copy-4@2x.png";
import bg from "../assets/frontend1/bitmap_2@3x.png";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="main">
        <p className="footer-ad">
          GOT JOKES? GET PAID
          <br />
          FOR SUBMITTING!
        </p>
        <div className="submit-joke">
          <span>SUBMIT JOKE</span>
          <img src={seeStats} alt="SEE STATS" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
