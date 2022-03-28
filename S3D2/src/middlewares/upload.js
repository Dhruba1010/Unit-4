const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../my_uploads'));
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now();
      cb(null, uniquePrefix + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const options = {
    storage: storage,
    fileFiler: fileFilter,
    limits: {
        filesize: 1024 * 1024* 5,
    },
};

module.exports = multer(options);