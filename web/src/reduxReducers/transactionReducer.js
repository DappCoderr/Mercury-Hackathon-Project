import { tx } from "@onflow/fcl";
export const addTransaction = (userID, transactionID) => {
  return async () => {
    try {
      const newTransactionRes = await fetch(`/v1/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID, transactionID })
      });
      await tx(transactionID).onceSealed();
      console.log("New transactions", newTransactionRes);
      return await newTransactionRes.json();
    } catch (e) {
      throw e;
    }
  };
};

export const updateTransactionStatus = (userID, transactionID, status) => {
  return async dispatch => {
    try {
      if (status === 4) {
        dispatch(deleteTransaction(transactionID));
      }
      const updatedTransactionRes = await fetch(`/v1/transactions`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID,
          transactionID,
          transactionStatus: status
        })
      });
      return await updatedTransactionRes.json();
    } catch (e) {}
  };
};

export const deleteTransaction = transactionID => {
  return async () => {
    try {
      const deletedTransactionRes = await fetch(`/v1/transactions`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ transactionID })
      });
      return await deletedTransactionRes.json();
    } catch (e) {
      throw e;
    }
  };
};
