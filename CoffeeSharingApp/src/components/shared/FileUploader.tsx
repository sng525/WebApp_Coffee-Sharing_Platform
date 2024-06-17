import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
    changeType: 'Profile' | 'Post' | 'Brand'
}

const FileUploader = ({ fieldChange, mediaUrl, changeType }: FileUploaderProps) => {

    const [fileUrl, setFileUrl] = useState(mediaUrl);
    const [file, setFile] = useState<File[]>([]);


    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]));
        }, [file])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    })


    return (
        <>
            {changeType === 'Post' || 'Brand' ? (
                <div {...getRootProps()} className="flex flex-center flex-col bg-white rounded-xl cursor-pointer">
                    <input {...getInputProps()} className="cursor-pointer" />
                    {
                        fileUrl ? (
                            <>
                                <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                                    <img
                                        src={fileUrl}
                                        alt="image"
                                        className="file_uploader-img"
                                    />
                                </div>
                                <p className="file_uploader-label">Click or drag photo to replace</p>
                            </>
                        ) : (
                            <div className="file_uploader-box">
                                <img
                                    src="/assets/icons/file-upload.svg"
                                    alt="file-upload"
                                />

                                <h3 className="base-medium text-amber-900 mb-2 mt-6">Drag photo here</h3>

                                <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG, JPEG</p>
                                <Button className="shad-button_dark_4">Select from computer</Button>
                            </div>
                        )
                    }
                </div >
            )
                : (<div {...getRootProps()} className="flex flex-center flex-col rounded-xl cursor-pointer">
                    <input {...getInputProps()} className="cursor-pointer" />
                    {
                        <p className="text-blue-500 hover:text-blue-700">Change profile photo</p>
                    }
                </div>
                )}
        </>
    );
};
export default FileUploader