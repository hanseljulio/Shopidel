import { IAPIPagination } from "@/interfaces/api_interface";
import { useEffect, useState } from "react";
import Button from "../Button";

interface IPagination {
  data?: IAPIPagination;
  onNavigate: (page: number) => void;
  limit?: number;
}

const Pagination = ({ data, onNavigate, limit = 5 }: IPagination) => {
  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);

  const setPaginationLimit = () => {
    if (data?.total_page! <= limit) {
      return setPaginationNumber(Array.from(Array(data?.total_page).keys()));
    }

    if (paginationNumber.length === 0) {
      return setPaginationNumber(Array.from(Array(limit).keys()));
    }
  };

  useEffect(() => {
    setPaginationLimit();
  }, [data]);

  return (
    <>
      {data?.current_page !== 1 && (
        <>
          {data?.total_page! > limit &&
            paginationNumber.findIndex((page) => page + 1 === 1) === -1 && (
              <Button
                text="&lt;&lt;"
                styling="px-2 py-1 border text-sm rounded-bl-md rounded-tl-md"
                onClick={() => {
                  const temp = [];
                  for (let i = 0; i > limit; i--) {
                    temp.push(i);
                  }
                  setPaginationNumber(temp.reverse());
                  onNavigate(data?.total_page!);
                  return onNavigate(1);
                }}
              />
            )}
          <Button
            text="Prev"
            styling="px-2 py-1 border text-sm"
            onClick={() => {
              if (data?.current_page === paginationNumber[0] + 1) {
                setPaginationNumber(Array.from(paginationNumber, (x) => x - 1));
              }
              onNavigate(data?.current_page! - 1);
            }}
          />
        </>
      )}
      {paginationNumber.map((i, _) => {
        return (
          <Button
            key={i}
            text={(i + 1).toString()}
            styling={`px-3 py-1 border ${
              data?.current_page === i + 1 && "bg-slate-200 "
            }`}
            onClick={() => onNavigate(i + 1)}
          />
        );
      })}
      {data?.current_page !== data?.total_page && (
        <>
          <Button
            text="Next"
            styling="px-2 py-1 border text-sm"
            onClick={() => {
              if (
                paginationNumber[paginationNumber.length - 1] <
                data?.current_page!
              ) {
                paginationNumber.shift();
                paginationNumber.push(
                  paginationNumber[paginationNumber.length - 1] + 1
                );
                setPaginationNumber(paginationNumber);
              }
              onNavigate(data?.current_page! + 1);
            }}
          />

          {data?.total_page! > limit &&
            paginationNumber.findIndex(
              (page) => page + 1 === data?.total_page!
            ) === -1 && (
              <Button
                text="&gt;&gt;"
                styling="px-2 py-1 border text-sm rounded-br-md rounded-tr-md"
                onClick={() => {
                  const temp = [];
                  for (
                    let i = data?.total_page!;
                    i > data?.total_page! - limit;
                    i--
                  ) {
                    temp.push(i - 1);
                  }
                  setPaginationNumber(temp.reverse());
                  return onNavigate(data?.total_page!);
                }}
              />
            )}
        </>
      )}
    </>
  );
};

export default Pagination;
