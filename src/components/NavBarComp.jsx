import { useNavigate } from "react-router-dom/dist";

const NavBarComp = () => {

    const navigate = useNavigate();

    const goToAtt = () => {
        navigate('/');
    }

    const goToScan = () => {
        navigate('/qr');
    }

    return (
        <>
            <button onClick={goToAtt}>Attendance</button>
            <br />
            <button onClick={goToScan}>Scan</button>
        </>
    );
};

export default NavBarComp;