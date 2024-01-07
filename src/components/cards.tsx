import { FoodData } from "../interface/FoodData";
import "./card.css";

export const Cards = ({ price, image, title }: FoodData) => {
  return (
    <div className="card">
      <img src={image} />
      <h2>{title}</h2>
      <p>
        <b>Valor:</b>
        {price}
      </p>
    </div>
  );
};

export default Cards;
