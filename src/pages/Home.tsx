import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Item from '../components/Item'
import { usePositionReorder } from '../hooks/use-position-reorder'
import '../style.css'

const PhoneListSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .required('Required')
        .max(10, 'phone number cannot be more than 10 numbers'),
})

export default function App() {
    const [order, updatePosition, updateOrder, setOrder] = usePositionReorder(
        []
    )

    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
        },
        validationSchema: PhoneListSchema,
        onSubmit: async (values: { phoneNumber: string }, { resetForm }) => {
            const formattedNumber = values.phoneNumber.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '($1) $2-$3'
            )
            setOrder([formattedNumber, ...order])
            resetForm()
        },
    })

    return (
        <main>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    placeholder="enter phone number"
                />
                <span>{formik.errors.phoneNumber}</span>
                <input type="submit" value="Add Phone Number" />
            </form>
            <ul>
                {order.map((num, i) => (
                    <Item
                        key={num}
                        i={i}
                        number={num}
                        updatePosition={updatePosition}
                        updateOrder={updateOrder}
                    />
                ))}
            </ul>
            {!order.length && <p>No phone numbers added yet!</p>}
        </main>
    )
}
