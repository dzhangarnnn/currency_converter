import axios from "axios";
import { ICurrenciesList } from "../models/ICurrencies";

const http = axios.create({
  baseURL: "https://api.freecurrencyapi.com/v1",
  params: {
    apikey: "fca_live_neT1xGjGOXFQ5uvrHHNXeWSFy0kbLnf4dZe3Fy6N"
  }
});

const httpService = {
  getLatest: async (
    base_currency: string,
    currencies: string | Array<string> = ""
  ) => {
    const { data } = await http.get<ICurrenciesList>("/latest", {
      params: {
        base_currency,
        currencies
      }
    });
    const currenciesList = data.data;
    return currenciesList;
  }
};
export default httpService;
