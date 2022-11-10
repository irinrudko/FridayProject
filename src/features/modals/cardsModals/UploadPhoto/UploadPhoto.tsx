import React, { FC } from 'react'
import { Button } from '@mui/material'
import s from './UploadPhoto.module.scss'

type UploadPhotoPropsType = {
    setUploadPhoto: (uploadPhoto: string) => void
    uploadPhoto: string
}

const UploadPhoto: FC<UploadPhotoPropsType> = ({ setUploadPhoto, uploadPhoto }) => {
    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 1000000) {
                convertFileToBase64(file, (file64: string) => {
                    setUploadPhoto(file64)
                    // addNewCard(file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <label className={s.updatePhotoContainer}>
            <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
            {uploadPhoto && (
                <div>
                    <img src={uploadPhoto} alt="img" className={s.uploadPhoto} />
                </div>
            )}
            <Button variant="contained" component="span" className={s.button}>
                Upload your photo
            </Button>
        </label>
    )
}

export default UploadPhoto
