import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.join(__dirname, '../../.env') });

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  logDir: 'logs', 
  storagePath: {
    csv: {
      cake : "src/data/cake orders.csv",
    },
    xml: {
      toy : "src/data/toy orders.xml",
    },
    json: {
      book : "src/data/book orders.json",
    }
  }
};