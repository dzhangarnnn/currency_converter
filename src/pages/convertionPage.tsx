import React, { useState } from "react";
import httpService from "../services/currenciesService";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConvertationForm from "../components/convertationForm";
import { IConvertationResult } from "../models/ICurrencies";
import ConvertationResult from "../components/convertationResult";

const ConvertionPage = () => {
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = useState(false);
  const [convertationResult, setConvertationResult] = useState(
    {} as IConvertationResult
  );

  const handleSubmit = async (amount: number, from: string, to: string) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ["2 currencies"],
        queryFn: () => httpService.getLatest(from, to),
        staleTime: 10000
      });
      const convObj = {
        amount,
        from,
        to,
        resultValue: amount * data[to]
      };
      setConvertationResult(convObj);
      setIsActive(true);
    } catch (err) {
      if (err instanceof Error) {
        toast("Произошла ошибка, повторите позже.");
      }
    }
  };

  return (
    <div className="container mt-3">
      <ConvertationForm onSubmit={handleSubmit} setIsActive={setIsActive} />
      {isActive && <ConvertationResult resultData={convertationResult} />}
    </div>
  );
};

export default ConvertionPage;
