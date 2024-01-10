import { useState } from "react";
import "./Home.css";
import { useFoodData } from "../../hooks/useFoodData";
import Cards from "../../components/cards";
import { CreateModal } from "../../components/modal/modal";

export default function Home() {
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
            key={foodData.id}
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
