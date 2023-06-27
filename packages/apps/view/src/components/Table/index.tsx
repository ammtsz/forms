import BaseTable, { ColumnShape } from 'react-base-table'
import 'react-base-table/styles.css'

interface TableProps {
    columns: ColumnShape[];
    data?: DataProps[];
}

interface DataProps {
    [key: string]: string;
 }

const Table: React.FC<TableProps> = ({columns, data}) => {
    return (
        <BaseTable columns={columns} data={data} width={600} height={400} />
    )
}

export default Table