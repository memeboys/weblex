import { FC, useEffect, useState } from "react";
import { fetchData } from "./api/fetch-data";
import { Table } from "./components/Table/Table";
import { TableData } from "./types";

export const App: FC = () => {
  const [data, setData] = useState<TableData | null>(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  if (!data) return <span>"Loading..."</span>;
  return <Table data={data} />
}