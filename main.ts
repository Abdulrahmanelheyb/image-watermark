import sharp from 'sharp'

async function compositeImages(sourceImageUrl: string, watermarkImageUrl: string, outputImageUrl: string) {
    try {

        const sourceImageMetadata = await sharp(sourceImageUrl).metadata()
        const watermarkImageMetadata = await sharp(watermarkImageUrl).metadata()

        if(sourceImageMetadata.width && sourceImageMetadata.height && watermarkImageMetadata.height && watermarkImageMetadata.width) {
            console.log('width', sourceImageMetadata.width)
            console.log('height', sourceImageMetadata.height)

            console.log('width wmk', watermarkImageMetadata.width)
            console.log('height wmk', watermarkImageMetadata.height)

            await sharp(sourceImageUrl)
            .composite([
                {
                    input: watermarkImageUrl,
                    top: ((sourceImageMetadata.height - watermarkImageMetadata.height) - 20),
                    left: ((sourceImageMetadata.width - watermarkImageMetadata.width) - 20),
                },
                ])
            .toFile(outputImageUrl);
        }else {
            console.error('Image width or height is undefined!')
        }


    } catch (error) {
        console.log(error);
    }
}

async function main() {
    await compositeImages("image.jpg", "m.comce.png", "watermarked.png")
}

main().then()