import { Container } from "./styles"
import Table from "../../components/Table";

import { useFormView } from "../../store/formView";
import { useCallback, useEffect, useState } from "react";
import { ColumnShape } from "react-base-table";

interface ColumnProps {
    title: string
    dataKey: string
    key: string
    width: number
 }

 interface DataProps {
    [key: string]: string
 }

const FormViewPage = () => {
    const { getFormResponses, getForm } = useFormView()
    const [columns, setColumns] = useState<ColumnProps[]>()
    const [data, setData] = useState<DataProps[]>()

    
    const getData = useCallback(async () => {
        if(columns?.length) {
            const responses = await getFormResponses("4d822f21-836e-4fdf-8632-4b92ff728b0a")
            setData(
                responses.map(response => {
                    const tableData = {} as DataProps
                    
                    columns.forEach(column => tableData[column.dataKey] = response[column.dataKey].value as string)

                    return tableData
                })
            )

        }
    }, [columns, getFormResponses])

    const getColumns = useCallback(async () => {
        const col = await getForm("4d822f21-836e-4fdf-8632-4b92ff728b0a")
        setColumns(col.fields.map(column => ({
            title: column.label,
            dataKey: column.id,
            key: column.id,
            width: 300
        })))

        getData()        
    }, [getData, getForm])

    useEffect(() => {
        getColumns()
    }, [getColumns])

    return (
        <Container>
            <Table columns={columns as ColumnShape[]} data={data}/>
        </Container>
    )
}

export default FormViewPage