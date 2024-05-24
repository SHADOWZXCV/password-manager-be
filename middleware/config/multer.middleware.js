const multer = require('multer');

const multerLocalPublicStorage = (rootFolderName, innerPath) => multer.diskStorage({
    destination: (_req, _file, done) => done(null, rootFolderName),
    filename: (_req, file, done) => {
        const ext = file.mimetype.split('/')[1];
        done(null, `${innerPath}/${file.fieldname}-${Date.now()}.${ext}`)
    }
})

const multerImageFilter = (_req, file, done) => {
    if (file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpeg") {
        done(null, true);
    } else {
        done(new Error("Not an image File!!"), false);
    }
}
const uploadImages = multer({ storage: multerLocalPublicStorage("public", "images"), fileFilter: multerImageFilter });

const uploadSingleImageMiddleware = (imageName) => uploadImages.single(imageName)(req, res, err => {
    if(err)
        return res.status(400).send({ error: `${err.message} : ${err.field}` });

    return next();
})

module.exports = {
    uploadImages,
    uploadSingleImageMiddleware
}