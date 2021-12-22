import { Link } from "react-router-dom";

function MainHeader() {
  return (
    <div>
      <button>
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
}

export default MainHeader;
