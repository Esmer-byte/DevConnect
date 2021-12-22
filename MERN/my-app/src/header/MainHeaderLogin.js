import { Link } from "react-router-dom";

function MainHeader() {
  return (
    <div>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
}

export default MainHeader;
