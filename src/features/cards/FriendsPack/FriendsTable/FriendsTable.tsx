import React from 'react'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Box, Typography, Rating } from '@mui/material'

export const FriendsTable = () => {
    const [value, setValue] = React.useState<number | null>(0)

    function createData(question: string, answer: string, lastUpdate: string, grade: any) {
        return { question, answer, lastUpdate, grade }
    }

    const rows = [
        createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1),
        createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1),
        createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1),
        createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1),
        createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1),
        createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1),
        createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1),
        createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1),
    ]

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#EFEFEF' }}>
                            <TableCell style={{ fontWeight: '600' }}>Question</TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Answer
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Last Updated
                            </TableCell>

                            <TableCell align="right" style={{ fontWeight: '600' }}>
                                Greade
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.question} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="right">{row.answer}</TableCell>
                                <TableCell align="right">{row.lastUpdate}</TableCell>
                                {/*<TableCell align="right">{row.grade}</TableCell>*/}
                                <TableCell align="right">
                                    <Box sx={{ '& > legend': { mt: 2 } }}>
                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue)
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
