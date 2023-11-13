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
    if (data?.total_page! <= 5) {
      return setPaginationNumber(Array.from(Array(data?.total_page).keys()));
    }

    if (paginationNumber.length === 0) {
      return setPaginationNumber(Array.from(Array(limit).keys()));
    }
  };

  useEffect(() => {
    setPaginationLimit();
  }, []);

  return (
    <>
      {data?.current_page !== 1 && (
        <button
          onClick={() => {
            if (data?.current_page === paginationNumber[0] + 1) {
              setPaginationNumber(Array.from(paginationNumber, (x) => x - 1));
            }
            onNavigate(data?.current_page! - 1);
          }}
          className="px-2 py-1 border text-sm rounded-bl-md rounded-tl-md "
        >
          Prev
        </button>
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
        <button
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
          className="px-2 py-1 border text-sm rounded-br-md rounded-tr-md "
        >
          Next
        </button>
      )}
    </>
  );
};

export default Pagination;
