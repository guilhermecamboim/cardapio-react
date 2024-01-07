import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";
import "./modal.css";

interface InputProps {
  label: string;
  value: string | number;
  updateValue: (value: any) => void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={(e) => updateValue(e)}></input>
    </>
  );
};

export function CreateModal({ closeModal }: () => void) {
  const { mutate, isSuccess } = useFoodDataMutate();
  const [formState, setFormState] = useState({
    title: "",
    price: 0,
    image: "",
  });

  const onSubmit = () => {
    const payload: FoodData = {
      title: formState.title,
      price: formState.price,
      image: formState.image,
    };

    mutate(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal(true);
    }
  }, [closeModal, isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastre um novo item no cardápio</h2>
        <form className="input-container" onSubmit={onSubmit}>
          <Input
            label="title"
            value={formState.title}
            updateValue={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
          />
          <Input
            label="price"
            value={formState.price}
            updateValue={(e) =>
              setFormState({ ...formState, price: e.target.value })
            }
          />
          <Input
            label="image"
            value={formState.image}
            updateValue={(e) =>
              setFormState({ ...formState, image: e.target.value })
            }
          />
          <button type="submit" className="btn-secondary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
