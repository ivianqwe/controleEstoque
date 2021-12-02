import { Link } from "react-router-dom";

import "./styles.css";

function Modules({text, to = "/"}){
    return(
        <div className="modules">
            <Link to={to}>{text}</Link>
        </div>
    )
}

export default Modules;