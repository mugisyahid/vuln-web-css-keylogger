const cssFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(css|CSS)$/)) {
        req.fileValidationError = 'Only css files are allowed!';
        return cb(new Error('Only css files are allowed!'), false);
    }
    cb(null, true);
};
exports.cssFilter = cssFilter;