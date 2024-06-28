import { useRef } from "react";
import { useNavigate } from "react-router-dom"


function ProfileInputter() {
    const inputValue = useRef<string>("")

    const navigate = useNavigate();
    
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        inputValue.current = e.target.value;
    }

    function handleSubmission() {
        navigate("/sets", { state: { display: inputValue.current } });
    }

    return (
        <div>
            <p>Get started</p>
            <input 
                type="text" 
                placeholder="http://chess.com/members/yourprofile"
                onChange={handleInputChange}
                required
            />
            <button onClick={handleSubmission}>Go!</button>
            
        </div>
    )
}

export default ProfileInputter