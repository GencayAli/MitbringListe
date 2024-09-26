import { useNavigate } from 'react-router-dom';


export default function HomePageRoute() {
  const navigate = useNavigate();  
  const handleButtonClick = () => {
    navigate('/create'); 
  };

  return (
    <div className="home">
      <div className="titel">
        <h1>Klassentreffen</h1>
        <h2>MITBRING LISTE</h2>
        <p>Erstellen die Liste , was Sie mitbringen wollen</p>
        <button onClick={handleButtonClick}>
          START
        </button>
      </div>
    </div>
  );
};
