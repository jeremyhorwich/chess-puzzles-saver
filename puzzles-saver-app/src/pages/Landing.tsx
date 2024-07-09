import { CSSProperties } from "react";
import ProfileInputter from "../Components/ProfileInputter"
import Toolbar from "../Components/Toolbar"

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
                <ProfileInputter /> 
            </div>
        </div>
    )
}

export default Landing;