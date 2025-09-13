import { TableCell, TableRow } from 'flowbite-react'
import React from 'react'

const TableSkeleton = () => {
    return (
        <React.Fragment>
            {
                Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="bg-white animate-pulse overflow-hidden">
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full w-40"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full w-36"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full w-12"></div>
                        </TableCell>

                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
                        </TableCell>
                    </TableRow>
                ))
            }
        </React.Fragment>

    )
}

export default TableSkeleton