import React, { FC } from "react";
import { IDataArr } from "../models/ICurrencies";
import { ISort } from "../pages/currenciesPage";
import CaretDown from "../static/svg/caretDown";
import CaretUp from "../static/svg/caretUp";

interface ICurrenciesTableProps {
  dataArrSorted: IDataArr[];
  currencyValue: string;
  onSort: (item: ISort) => void;
  selectedSort: ISort;
}

const CurrenciesTable: FC<ICurrenciesTableProps> = ({
  dataArrSorted,
  currencyValue,
  onSort,
  selectedSort
}) => {
  const handleSort = (item: string) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  const rendeSortArrow = (selectedSort: ISort, currentPath: string) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === "asc") {
        return <CaretDown />;
      } else {
        return <CaretUp />;
      }
    }
    return null;
  };
  return (
    <table className="table table-striped ">
      <thead>
        <tr>
          <th
            scope="col"
            className="col-8 ps-5"
            onClick={() => handleSort("name")}
            role="button"
          >
            Currency {rendeSortArrow(selectedSort, "name")}
          </th>
          <th
            scope="col"
            className="col-4 ps-4"
            onClick={() => handleSort("value")}
            role="button"
          >
            Rate {rendeSortArrow(selectedSort, "value")}
          </th>
        </tr>
      </thead>
      {dataArrSorted && (
        <tbody>
          {dataArrSorted.map((item) => (
            <tr key={item.name}>
              <td className="ps-5">
                {item.name}/{currencyValue}
              </td>
              <td className="ps-4">{(1 / item.value).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default CurrenciesTable;
