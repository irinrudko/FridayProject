import React, { useEffect } from 'react'
import { Box, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import s from '../../PackList/Table/PackListTable.module.scss'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { getPacksTC } from '../../packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { GetPackParams } from '../../../../api/packsAPI'

export const MyPackTable = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector((store) => store.auth.user._id)
    const myCardPacks = useAppSelector((store) => store.packs.cardPacks)

    const [value, setValue] = React.useState<number | null>(5)

    // function createData(question: string, answer: string, lastUpdate: string, grade: any, action: any) {
    //     return { question, answer, lastUpdate, grade, action }
    // }
    //
    // const rows = [
    //     createData('How "This" works in JavaScript? ', 'This is how "This" works in Javascript', '18.03.2022', 1, 1),
    //     createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1, 1),
    //     createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1, 1),
    //     createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1, 1),
    //     createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1, 1),
    //     createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1, 1),
    //     createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1, 1),
    //     createData('How "This" works in JavaScript?', 'This is how "This" works in Javascript', '18.03.2022', 1, 1),
    // ]

    const myPacksSettings: GetPackParams = {
        user_id: userId,
    }

    useEffect(() => {
        dispatch(getPacksTC(myPacksSettings))
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#EFEFEF' }}>
                            <TableCell style={{ fontWeight: '600' }}>Question</TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }}>
                                Answer
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }}>
                                Last Updated
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }}>
                                Grade
                            </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myCardPacks.map((row, index) => {
                            return (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    {/*<TableCell component="th" scope="row">*/}
                                    {/*    {row.question}*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="left">{row.answer}</TableCell>*/}
                                    {/*<TableCell align="left">{row.lastUpdate}</TableCell>*/}
                                    {/*/!*<TableCell align="right">{row.grade}</TableCell>*!/*/}
                                    {/*<TableCell align="left">*/}
                                    {/*    <Box sx={{'& > legend': {mt: 2}}}>*/}
                                    {/*        <Rating*/}
                                    {/*            name="simple-controlled"*/}
                                    {/*            value={value}*/}
                                    {/*            onChange={(event, newValue) => {*/}
                                    {/*                setValue(newValue)*/}
                                    {/*            }}*/}
                                    {/*        />*/}
                                    {/*    </Box>*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="left">
                                        <div className={s.actions}>
                                            <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px' }} />
                                            <DeleteForeverIcon fontSize={'small'} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
