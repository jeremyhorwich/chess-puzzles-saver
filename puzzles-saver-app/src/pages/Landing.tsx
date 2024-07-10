import { CSSProperties } from "react";
import ProfileInput from "../components/ProfileInput"
import Toolbar from "../components/Toolbar"

const centeringStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(90vh - 50px)"
};

function Landing() {
    return (
        <div>
            <Toolbar />
            <div style={centeringStyles}>
                <ProfileInput /> 
            </div>
        </div>
    )
}

export default Landing;