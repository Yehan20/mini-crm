import { TableCell, TableRow } from 'flowbite-react'
import React from 'react'

const TableSkeleton = () => {
    return (
        <React.Fragment>
            {
                Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800 animate-pulse">
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
                        </TableCell>

                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                        </TableCell>
                        <TableCell>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div>
                        </TableCell>
                    </TableRow>
                ))
            }
        </React.Fragment>

    )
}

export default TableSkeleton