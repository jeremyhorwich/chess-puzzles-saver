import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import postOrGetUser from "../fetches/postOrGetUser";


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
        <div>
            <p>Get started</p>
            <input 
                type="text" 
                placeholder="http://chess.com/member/yourprofile"
                onChange={handleInputChange}
                required
            />
            <button onClick={handleSubmission}>Go!</button>
            
        </div>
    )
}

export default ProfileInputter;