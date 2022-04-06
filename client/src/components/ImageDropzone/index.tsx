import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FunctionComponent, useEffect } from 'react';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme, imageName?:string) => {

  return (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      {imageName 
      ?<>
        <Text size="xl" inline>
          Image uploaded!
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          {imageName}
        </Text>
      </>
      :<>
        <Text size="xl" inline>
          Drag your NFT image here or click to select
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          Only PNG/JPG is accepted.
        </Text>
      </>
      }
    </div>
  </Group>
)}

interface ImageDropzoneProps {
    onDrop(files:File[]):void
    disabled?:boolean
    imageName?:string
}
 
const ImageDropzone: FunctionComponent<ImageDropzoneProps> = (props :ImageDropzoneProps) => {
    const theme = useMantineTheme();

    return (
        <Dropzone
        onDrop={props.onDrop}
        onReject={(files) => console.log('rejected files', files)}
        // maxSize={3 * 1024 ** 2}
        accept={["image/jpeg","image/png"]}
        disabled={props.disabled}
      >
        {(status) => dropzoneChildren(status, theme, props.imageName)}
      </Dropzone>  
    );
}
 
export default ImageDropzone; 