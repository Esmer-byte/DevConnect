import { Link } from "react-router-dom";
import {Button} from "react-bootstrap"
function MainHomeHeader() {
  return (
    <div>
      <Button  variant = "info" bsPrefix="super-btn">
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
}

export default MainHomeHeader;
