const path = require('path');
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (_, file, cb) => {

        // const uploadPath = 'public/uploads'
        const uploadPath = path.join(__dirname,'..', '..', 'public', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, 'public/uploads')
    },
    filename: (_, file, cb) => {
        const extension = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, extension);
        const safeName = nameWithoutExt.replace(/\s+/g, "_");
        cb(null, `Buddy_Bite_${safeName}_${Date.now()}${extension}`)
    }
})

const uploadFile = multer({
    storage,
    // limits: { fileSize: 20 * 1024 * 1024 },
    // fileFilter: function (_, file, cb) {
    //     if (!file.originalname.match(/\.(xls|xlsx)$/)) {
    //         return cb(new Error('Only Excel files are allowed!'), false);
    //         // creates a new err object and reject the file
    //     }
        // cb(null, true);
    // }
})

module.exports = uploadFile;