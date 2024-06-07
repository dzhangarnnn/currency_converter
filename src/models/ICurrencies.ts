export interface ICurrenciesList {
  data: Record<string, number>;
}

export interface IDataArr {
  name: string;
  value: number;
}

export interface IConvertationResult {
  amount: number;
  from: string;
  to: string;
  resultValue: number;
}
