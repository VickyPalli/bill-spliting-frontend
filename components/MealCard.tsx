import React, { useState } from "react";
import { Button } from "@mui/material";
import CreateOrder from "./createOrder";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface mealProps {
  mealCardData: any;
}

const MealCard: React.FC<mealProps> = ({ mealCardData }): JSX.Element => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creating Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrder mealData={mealCardData} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className="meals-card">
        <div className="meals-card-header">{mealCardData?.foodName}</div>
        <div className="meals-card-description">
          FoodType : {mealCardData?.foodType ?? "No type"}
        </div>
        <div className="meals-card-description">
          ProteIn : {mealCardData?.protein ?? "No data"}
        </div>
        <div className="meals-card-description">
          Cost :{mealCardData?.price}
        </div>
        <div className="create-order-btn">
          <Button
            variant={"outlined"}
            color="secondary"
            size={"small"}
            onClick={() => handleShow()}
          >
            create Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default MealCard;
