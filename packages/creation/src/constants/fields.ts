const Fields = {
    text: "text",
    textarea: "textarea",
    select: "select",
    radio: "radio",
    checkbox: "checkbox",
    switch: "switch",
}

export type FieldsType = ConstantValues<typeof Fields>

type ConstantValues<T> = T[keyof T]
