import { Radio, Select, Table } from "antd";
import { parse } from "papaparse";
import { unparse } from "papaparse";
import React, { useState } from "react";
import toast from "react-hot-toast";
import searchImg from "../../assets/searchImg.svg";
import classes from "./TransactionsTable.module.css";

const TransactionsTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
}) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  console.log("transactions", transactions);

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );
  console.log(transactions);

  console.log("sortKey", sortKey);

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const exportCSV = () => {
    const csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <>
      <div style={{ padding: "0rem 2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div className={classes["input-flex"]}>
            <img src={searchImg} alt="search" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Search by name"}
            />
          </div>
          <Select
            className={classes["select-input"]}
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter"
            allowClear
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>
        <div className="my-table">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <h2>My Transactions</h2>
            <Radio.Group
              className="input-radio"
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
            >
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                width: "400px",
              }}
            >
              <button className={classes["btn"]} onClick={exportCSV}>
                Export to CSV
              </button>
              <label
                htmlFor="file-csv"
                className={`${classes.btn} ${classes["btn-outlined"]}`}
              >
                Import from CSV
              </label>
              <input
                id="file-csv"
                type={"file"}
                accept=".csv"
                required
                onChange={importFromCsv}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <Table dataSource={sortedTransactions} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
