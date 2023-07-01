import BaseTable, { ColumnShape } from "react-base-table";
import "react-base-table/styles.css";

interface DataProps {
  [key: string]: string;
}

interface TableProps {
  columns: ColumnShape[];
  data?: DataProps[];
}

const Table: React.FC<TableProps> = ({ columns, data }: TableProps) => {
  return <BaseTable columns={columns} data={data} width={600} height={400} />;
};

export default Table;
