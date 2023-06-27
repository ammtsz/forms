import { useCallback, useEffect, useRef } from "react";
import { ColumnShape } from "react-base-table";

import Table from "../../components/Table";
import { useFormView } from "../../store/formView";

import { Container } from "./styles"

import { TextFormProps } from "../../types";

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

    const columns = useRef<ColumnProps[]>()
    const data = useRef<DataProps[]>()
    
    const getData = useCallback(async () => {
        if(columns.current) {
            const responses = await getFormResponses("4d822f21-836e-4fdf-8632-4b92ff728b0a")
            data.current = responses.map(response => {
                    const tableData = {} as DataProps
                    
                    columns.current?.forEach(column => tableData[column.dataKey] = response[column.dataKey].value as string)

                    return tableData
                }
            )

        }
    }, [columns, getFormResponses])

    const getColumns = useCallback(async () => {
        const col = await getForm("4d822f21-836e-4fdf-8632-4b92ff728b0a")
        columns.current = col.fields.map((column: TextFormProps) => ({
            title: column.label,
            dataKey: column.id,
            key: column.id,
            width: 300
        }))

        getData()
    }, [getData, getForm])

    useEffect(() => {
        getColumns()
    }, [getColumns])

    return (
        <Container>
            <Table columns={columns.current as ColumnShape[]} data={data.current}/>
        </Container>
    )
}

export default FormViewPage