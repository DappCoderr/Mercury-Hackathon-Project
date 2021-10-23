export const readContractFile = file => {
  try {
    const fileReader = new FileReader();
    fileReader.readAsText(
      "../../../cadence/transaction/CreatePartStorage.cdc",
      "UTF-8"
    );
    fileReader.onload(value => {
      console.log("File Value", value);
    });
    fileReader.onerror(e => {
      console.error("File Read error", e);
      throw e;
    });
  } catch (e) {
    console.error("Couldn't read the File!");
  }
};
