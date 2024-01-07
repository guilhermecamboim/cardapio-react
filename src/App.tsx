import { useState } from "react";
import "./App.css";
import Cards from "./components/cards";
import { useFoodData } from "./hooks/useFoodData";
import { CreateModal } from "./components/modal/modal";

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map((foodData) => (
          <Cards
            title={foodData.title}
            image={foodData.image}
            price={foodData.price}
          />
        ))}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button onClick={handleOpenModal}>Novo</button>
    </div>
  );
}

export default App;
