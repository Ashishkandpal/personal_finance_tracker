import React from "react";
import classes from "./Cards.module.css";
import { Card, Row } from "antd";
import Button from "../Button/Button";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expense,
  totalBalance,
}) => {
  return (
    <div>
      <Row className={classes["my-row"]}>
        <Card className={classes["my-card"]} title="Current Balance">
          <p>₹{totalBalance}</p>
          <Button text={"Reset Balance"} outlined={true} />
        </Card>
        <Card className={classes["my-card"]} title="Total Income">
          <p>₹{income}</p>
          <Button
            text={"Add Income"}
            outlined={true}
            onClick={showIncomeModal}
          />
        </Card>
        <Card className={classes["my-card"]} title="Total Expenses">
          <p>₹{expense}</p>
          <Button
            text={"Add Expense"}
            outlined={true}
            onClick={showExpenseModal}
          />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
