import { Link } from "react-router-dom";
import {Button} from "react-bootstrap"
function MainUpdateHeader() {
  return (
    <div>
      <Button variant = "info" bsPrefix="super-btn">
        <Link  id = "submitUpdateB" to="/update">Update Profile</Link>
      </Button>
    </div>
  );
}

export default MainUpdateHeader;
