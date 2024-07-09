import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import postOrGetUser from "../fetches/postOrGetUser";
import "../styles/profileInputterStyles.css";


function ProfileInputter() {
    const inputValue = useRef<string>("")

    const navigate = useNavigate();
    
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        inputValue.current = e.target.value;
    }

    function handleSubmission() {
        postOrGetUser(inputValue.current)
            .then((username) => navigate("/sets", { state: { user: username } }))
    }

    return (
        <div className="container">
            <div>
                <span className="display-text">Get started</span>
                <div className="input-wrapper">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="http://chess.com/member/yourprofile"
                        onChange={handleInputChange}
                        required
                    />
                    <button className="submit-button" onClick={handleSubmission}>
                        Go!
                    </button>
                </div>            
            </div>
        </div>
    )
}

export default ProfileInputter;