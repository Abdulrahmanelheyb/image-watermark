"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
function compositeImages(sourceImageUrl, watermarkImageUrl, outputImageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sourceImageMetadata = yield (0, sharp_1.default)(sourceImageUrl).metadata();
            const watermarkImageMetadata = yield (0, sharp_1.default)(watermarkImageUrl).metadata();
            if (sourceImageMetadata.width && sourceImageMetadata.height && watermarkImageMetadata.height && watermarkImageMetadata.width) {
                console.log('width', sourceImageMetadata.width);
                console.log('height', sourceImageMetadata.height);
                console.log('width wmk', watermarkImageMetadata.width);
                console.log('height wmk', watermarkImageMetadata.height);
                yield (0, sharp_1.default)(sourceImageUrl)
                    .composite([
                    {
                        input: watermarkImageUrl,
                        top: ((sourceImageMetadata.height - watermarkImageMetadata.height) - 20),
                        left: ((sourceImageMetadata.width - watermarkImageMetadata.width) - 20),
                    },
                ])
                    .toFile(outputImageUrl);
            }
            else {
                console.error('Image width or height is undefined!');
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield compositeImages("image.jpg", "m.comce.png", "watermarked.png");
    });
}
main().then();
