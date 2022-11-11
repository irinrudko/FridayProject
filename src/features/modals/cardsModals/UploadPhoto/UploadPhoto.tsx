import React, { FC } from 'react'
import { Button } from '@mui/material'
import s from './UploadPhoto.module.scss'
import { setErrAC } from '../../../../app/app-reducer'
import { useAppDispatch } from '../../../../app/store'

type UploadPhotoPropsType = {
    setUploadPhoto: (uploadPhoto: string) => void
    uploadPhoto: string
}

const UploadPhoto: FC<UploadPhotoPropsType> = ({ setUploadPhoto, uploadPhoto }) => {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 1048576) {
                convertFileToBase64(file, (image: string) => {
                    setUploadPhoto(image)
                })
            } else {
                dispatch(setErrAC('Sorry! Image size is too big. Max size is 1mb'))
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const image = reader.result as string
            callBack(image)
        }
        reader.readAsDataURL(file)
    }

    return (
        <label className={s.updatePhotoContainer}>
            <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
            {uploadPhoto && (
                <div>
                    <img src={uploadPhoto} alt="your uploaded image" className={s.uploadPhoto} />
                </div>
            )}
            <Button variant="contained" component="span" className={s.button}>
                Upload your image
            </Button>
        </label>
    )
}

export default UploadPhoto
