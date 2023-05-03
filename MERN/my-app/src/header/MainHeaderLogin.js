import { Link } from "react-router-dom";

function MainHeader() {
  return (
    <div>
    <Link to="/login" className="text-decoration-none text-light">
      Have an account already? Login now!
    </Link>
  </div>
  );
}

export default MainHeader;
