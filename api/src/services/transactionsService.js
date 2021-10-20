import { Transactions } from "../models/transactions";

class TransactionsService {
  findOrCreateNewTransaction = async (userID, transactionID) => {
    if (userID && transactionID) {
      let transaction = await Transactions.query().findOne({
        user_id: userID,
        transaction_id: transactionID
      });
      if (!transaction) {
        transaction = await Users.query().insertAndFetch({
          user_id: userID,
          transaction_id: transactionID,
          transaction_status: 0
        });
      }
      return transaction;
    }
    throw "Can't create Transaction Entry without UserId and Transacton ID";
  };

  updateTransactionStatus = async (
    userID,
    transactionID,
    transactionStatus
  ) => {
    if (userID && transactionID) {
      let transaction = await Transactions.query().findOne({
        user_id: userID,
        transaction_id: transactionID
      });
      if (transaction) {
        const updatedTransaction = await transaction.$query().patchAndFetch({
          transaction_status: transactionStatus
        });
        return updatedTransaction;
      }
      throw "Can't Find the transaction";
    }
    throw "Can't create Transaction Entry without UserId and Transacton ID";
  };

  deleteTheTransaction = async transactionID => {
    if (transactionID) {
      try {
        let transactionNumDeleted = await Transactions.query()
          .delete()
          .where("transaction_id", "=", transactionID);
        return {
          numberOfEntriesDeleted: transactionNumDeleted,
          transactionId: transactionID
        };
      } catch (e) {
        throw "Couldn't Find the Transaction!";
      }
    }
    throw "Can't delete Transaction with no id";
  };
}

export default TransactionsService;
