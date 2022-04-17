import { FunctionComponent, useState } from "react";
import { MintNFT, uploadToIPFS } from "../../helpers/api";
import { Form, Field } from 'react-final-form'
import validate from "./validate";
import { TextInput,Textarea } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import ImageDropzone from "../ImageDropzone";
import Text from "../Text/Text";
import Button from "../Button/Button";

interface MintFormProps {
    onSubmit(mintNFT:MintNFT):void
}

const MintForm: FunctionComponent<MintFormProps> = (props:MintFormProps) => {
    const [imgFile, setImgFile] = useState<File>()

    const [disabled, setDisabled] = useState(false)
    const onDrop = (files:File[]) => {
        setImgFile(files[0])
        setDisabled(true)
    }

    const onSubmit = async (nft: MintNFT) => {
        const onComplete = (ipfsPath:string, imageHash:string) => {
            let nftCopy = JSON.parse(JSON.stringify(nft));
            nftCopy.imgUrl = ipfsPath
            nftCopy.imgHash = imageHash
            props.onSubmit(nftCopy)
        }
        await uploadToIPFS(imgFile as File, onComplete)
    }
    return (
        <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({handleSubmit})=>(
            <form onSubmit={handleSubmit}>
                <div>
                    <Text variant="p">NFT upload</Text>
                    <ImageDropzone onDrop={onDrop} disabled={disabled} imageName={imgFile?.name || ""} />
                    {imgFile && <Text variant="p">{imgFile.name}</Text>}
                </div>
                <div className="w-full">
                    <Field 
                    name="name" 
                    //@ts-ignore
                    render={({input})=><TextInput {...input} 
                    label="Name" 
                    required
                    placeholder="Name of NFT" 
                    styles={{label: { color: 'white' }}} />}
                    />
                    <Field
                    name='description'
                    render= {({input})=>(<Textarea
                    {...input}
                    placeholder="Description of this NFT"
                    label="Description"
                    required
                    styles={{label: { color: 'white' }}}/>
                    )}
                    />
                    <Button style={{width:'100%'}} className="mt-5">Submit</Button>
                </div>
            </form>
        )}
        />
    );
}
 
export default MintForm;