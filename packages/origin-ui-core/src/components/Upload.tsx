import React, { useEffect, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { CancelTokenSource } from 'axios';
import { makeStyles, createStyles, useTheme, Chip } from '@material-ui/core';
import { getOffChainDataSource } from '../features/general/selectors';
import { FILE_SUPPORTED_MIMETYPES } from '@energyweb/origin-backend-core';
import { Delete, Cancel, Replay } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

interface IProps {
    onChange: (files: IUploadedFile[]) => void;
}

export interface IUploadedFile {
    uploadedName: string;
    uploadProgress: number;
    cancelled: boolean;
    removed: boolean;
    cancelToken: CancelTokenSource;
}

interface IState {
    [key: number]: IUploadedFile;
}

const initialState: IState = {};

function reducer(
    state: {
        [key: number]: IUploadedFile;
    },
    action:
        | { type: 'setFile'; payload: { id: number; file: IUploadedFile } }
        | {
              type: 'setFileProgress';
              payload: {
                  id: number;
                  uploadProgress: number;
              };
          }
        | {
              type: 'deleteFile';
              payload: {
                  id: number;
              };
          }
        | {
              type: 'cancelFileUpload';
              payload: {
                  id: number;
              };
          }
        | {
              type: 'setFileUploadCancelToken';
              payload: {
                  id: number;
                  cancelToken: CancelTokenSource;
              };
          }
): IState {
    switch (action.type) {
        case 'setFile':
            return { ...state, [action.payload.id]: action.payload.file };
        case 'deleteFile':
            return {
                ...state,
                [action.payload.id]: { ...state[action.payload.id], removed: true }
            };
        case 'cancelFileUpload':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    cancelled: true,
                    uploadProgress: 0,
                    uploadedName: null,
                    cancelToken: null
                }
            };
        case 'setFileProgress':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    uploadProgress: action.payload.uploadProgress
                }
            };
        case 'setFileUploadCancelToken':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    cancelToken: action.payload.cancelToken,
                    cancelled: false
                }
            };
    }
}

export function Upload(props: IProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { t } = useTranslation();

    const useStyles = makeStyles(() =>
        createStyles({
            container: {
                padding: '10px'
            },
            thumbsContainer: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 16
            },
            thumb: {
                display: 'inline-flex',
                borderRadius: 2,
                border: '1px solid #eaeaea',
                marginBottom: 8,
                marginRight: 8,
                width: 100,
                height: 100,
                padding: 4,
                boxSizing: 'border-box'
            },
            thumbInner: {
                display: 'flex',
                minWidth: 0,
                overflow: 'hidden'
            },
            img: {
                display: 'block',
                width: 'auto',
                height: '100%'
            },
            dropzone: {
                cursor: 'pointer',
                background: 'rgb(40, 40, 40)',
                minHeight: '60px',
                lineHeight: '60px',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
                marginTop: '20px'
            }
        })
    );

    const classes = useStyles(useTheme());

    const [files, setFiles] = useState<File[]>([]);

    const offChainDataSource = useSelector(getOffChainDataSource);

    const { getRootProps, getInputProps } = useDropzone({
        accept: FILE_SUPPORTED_MIMETYPES,
        onDrop: (acceptedFiles) => {
            setFiles([...files, ...acceptedFiles]);
        }
    });

    async function upload(file: File) {
        const cancelToken = offChainDataSource.requestClient.generateCancelToken();
        const fileIndex = files.indexOf(file);

        dispatch({
            type: 'setFileUploadCancelToken',
            payload: {
                id: fileIndex,
                cancelToken
            }
        });

        const uploadedArray = await offChainDataSource.filesClient.upload(
            [file],
            (progressEvent) => {
                dispatch({
                    type: 'setFileProgress',
                    payload: {
                        id: fileIndex,
                        uploadProgress: (progressEvent.loaded * 90) / progressEvent.total
                    }
                });
            },
            cancelToken
        );

        dispatch({
            type: 'setFile',
            payload: {
                id: fileIndex,
                file: {
                    ...state[fileIndex],
                    uploadedName: uploadedArray[0],
                    cancelToken: null,
                    uploadProgress: 100,
                    cancelled: false
                }
            }
        });
    }

    const thumbs = files.map((file, index) => {
        const uploadedFile = state[index];

        if (!uploadedFile || uploadedFile?.removed) {
            return null;
        }

        return (
            <Chip
                label={`${file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}${
                    uploadedFile.cancelled ? ' (Cancelled, click to retry)' : ''
                }`}
                variant="outlined"
                color="primary"
                icon={uploadedFile.cancelled ? <Replay /> : null}
                deleteIcon={
                    uploadedFile.uploadedName || uploadedFile.cancelled ? (
                        <Delete color="error" />
                    ) : (
                        <Cancel color="error" />
                    )
                }
                clickable={uploadedFile.cancelled}
                onClick={() => {
                    if (!uploadedFile.cancelled) {
                        return;
                    }

                    upload(file);
                }}
                onDelete={() => {
                    if (uploadedFile.uploadedName || uploadedFile.cancelled) {
                        dispatch({
                            type: 'deleteFile',
                            payload: {
                                id: index
                            }
                        });
                    } else {
                        uploadedFile.cancelToken.cancel();

                        dispatch({
                            type: 'cancelFileUpload',
                            payload: {
                                id: index
                            }
                        });
                    }
                }}
                style={{
                    background: `-webkit-linear-gradient(left, ${
                        uploadedFile.cancelled ? '#303030' : '#e0e0e0'
                    } ${
                        uploadedFile.cancelled ? '100' : uploadedFile.uploadProgress
                    }%, rgba(255, 255, 255, 0) 0%)`,
                    cursor: uploadedFile.cancelled ? 'pointer' : 'default'
                }}
                key={index}
            />
        );
    });

    useEffect(() => {
        files.map((f) => {
            const fileIndex = files.indexOf(f);
            const uploadedFile = state && state[fileIndex];

            if (typeof uploadedFile === 'undefined') {
                dispatch({
                    type: 'setFile',
                    payload: {
                        id: fileIndex,
                        file: {
                            uploadProgress: 0,
                            removed: false,
                            cancelled: false,
                            uploadedName: null,
                            cancelToken: null
                        }
                    }
                });

                upload(f);
            }
        });
    }, [files]);

    useEffect(() => {
        props.onChange(Object.entries(state).map(([, value]) => value));
    }, [state]);

    return (
        <section>
            <div {...getRootProps({ className: classes.dropzone })}>
                <input {...getInputProps()} />
                <p>{t('file.info.dropHereOrClickToSelect')}</p>
            </div>
            <aside className={classes.thumbsContainer}>{thumbs}</aside>
        </section>
    );
}
