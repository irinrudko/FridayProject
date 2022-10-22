import React from 'react'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from '@mui/material'

export const PackListTable = () => {
    function createData(name: string, cards: number, lastUpdate: string, createdBy: string, actions: any) {
        return { name, cards, lastUpdate, createdBy, actions }
    }

    const rows = [
        createData('Pack Name', 4, '18.03.2022', 'Ivan Ivanov', 1),
        createData('Name Pack', 37, '18.06.2022', 'Petr Petrov', 2),
        createData('Pack Name', 4, '18.03.2022', 'Ivan Ivanov', 1),
        createData('Name Pack', 37, '18.06.2022', 'Petr Petrov', 2),
        createData('Pack Name', 4, '18.03.2022', 'Ivan Ivanov', 1),
        createData('Name Pack', 37, '18.06.2022', 'Petr Petrov', 2),
        createData('Pack Name', 4, '18.03.2022', 'Ivan Ivanov', 1),
        createData('Name Pack', 37, '18.06.2022', 'Petr Petrov', 2),
    ]

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#EFEFEF' }}>
                            <TableCell style={{ fontWeight: '600' }}>Name</TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Cards
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Last Updated
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Created by
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.cards}</TableCell>
                                <TableCell align="right">{row.lastUpdate}</TableCell>
                                <TableCell align="right">{row.createdBy}</TableCell>
                                <TableCell align="right">{row.actions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
