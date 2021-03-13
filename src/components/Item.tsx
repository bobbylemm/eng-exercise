import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { useMeasurePosition } from '../hooks/use-measure-position'

const Item = ({
    i,
    updatePosition,
    updateOrder,
    number,
}: {
    i: any
    updatePosition: any
    updateOrder: any
    number: any
}) => {
    const [isDragging, setDragging] = useState(false)

    const ref = useMeasurePosition((pos) => updatePosition(i, pos))

    return (
        <li
            style={{
                padding: 0,
                height: '2rem',
                zIndex: isDragging ? 3 : 1,
            }}
        >
            <motion.div
                ref={ref}
                layout
                initial={false}
                style={{
                    background: 'white',
                    height: '2rem',
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                whileHover={{
                    scale: 1.03,
                    boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
                }}
                whileTap={{
                    scale: 1.12,
                    boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
                }}
                drag="y"
                onDragStart={() => setDragging(true)}
                onDragEnd={() => setDragging(false)}
                onViewportBoxUpdate={(_viewportBox, delta) => {
                    isDragging && updateOrder(i, delta.y.translate)
                }}
            >
                {number}
            </motion.div>
        </li>
    )
}

export default Item
