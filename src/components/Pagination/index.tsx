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
    if (data) {
      if (data?.total_page <= limit) {
        return setPaginationNumber(
          Array.from(Array(data.total_page).keys()).map((v) => v + 1)
        );
      }
      return setPaginationNumber([
        data.current_page - 2 === -1 || data.current_page - 2 === 0
          ? 1
          : data.current_page === data.total_page - 1 ||
            data.current_page === data.total_page
          ? data.total_page - 4
          : data.current_page - 2,
        data.current_page - 1 === 0 || data.current_page - 1 === 1
          ? 2
          : data.current_page === data.total_page - 1 ||
            data.current_page === data.total_page
          ? data.total_page - 3
          : data.current_page - 1,
        data.current_page === 1 || data.current_page === 2
          ? 3
          : data.current_page === data.total_page - 1 ||
            data.current_page === data.total_page
          ? data.total_page - 2
          : data.current_page,
        data.current_page + 1 == 2 || data.current_page + 1 == 3
          ? 4
          : data.current_page === data.total_page - 1 ||
            data.current_page === data.total_page
          ? data.total_page - 1
          : data.current_page + 1,
        data.current_page + 2 == 3 || data.current_page + 2 == 4
          ? 5
          : data.current_page === data.total_page - 1 ||
            data.current_page === data.total_page
          ? data.total_page
          : data.current_page + 2,
      ]);
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
                  return onNavigate(1);
                }}
              />
            )}
          <Button
            text="Prev"
            styling="px-2 py-1 border text-sm"
            onClick={() => {
              return onNavigate(data?.current_page! - 1);
            }}
          />
        </>
      )}
      {paginationNumber.map((v, i) => {
        return (
          <Button
            key={i}
            text={v.toString()}
            styling={`px-3 py-1 border ${
              data?.current_page === v && "bg-slate-200 "
            }`}
            onClick={() => onNavigate(v)}
          />
        );
      })}
      {data?.current_page !== data?.total_page && (
        <>
          <Button
            text="Next"
            styling="px-2 py-1 border text-sm"
            onClick={() => {
              return onNavigate(data?.current_page! + 1);
            }}
          />
          {paginationNumber.includes(data?.total_page!) === false && (
            <Button
              text="&gt;&gt;"
              styling="px-2 py-1 border text-sm rounded-br-md rounded-tr-md"
              onClick={() => {
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
