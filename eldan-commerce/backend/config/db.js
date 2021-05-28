import mongoose from "mongoose";

const konektajDB = async () => {
  try {
    const konekcija = await mongoose.connect(
      "mongodb+srv://eldan:eldan@eldancommerce.jq3ut.mongodb.net/eldancommerce?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

    console.log(
      `Baza konektirana na: ${konekcija.connection.host}`.cyan.bold.underline
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

export default konektajDB;
