import { VStack, Button, Text, Box, Spacer, Image, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const ImageSaver = () => 
{
    // React UseState
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState('');

    const handleUploadPhoto = () => 
    {
        console.log("Hola");
    }

    const handleUploadImage = async (e) =>
    {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append('upload_preset', "synergyPhoto");

        setLoading(true);

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/saver-community/image/upload",
            {
                method: "POST",
                body: data
            }
        );

        const file = await res.json();
        
        console.log(file.secure_url);
        setImage(file.secure_url);

        setLoading(false);

    }

    return (
        <>
            <Head>
                <title>Subir Imagen</title>
                <meta name="description" content="Aplicacion oficial de Saver Fast." />
                <meta name="image" content="https://i.ibb.co/qChFmVn/saver-fast.png" />
            </Head>

            <VStack>
                <Text>SUBIR UNA IMAGEN</Text>
                <input 
                type='file'
                name='file'
                placeholder="Upload your image"
                onChange={handleUploadImage}
                />
                
                {
                    loading 
                    ? <Spinner /> 
                    : <Image w='300px' src={image} alt='img' />
                }

                {/* <Button
                variant='callToAction'
                onClick={handleUploadPhoto}
                >
                    SUBIR IMAGEN
                </Button> */}

            </VStack>
        </>
    );
}

export default ImageSaver
