module.exports = (err, req, res, next) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    console.log(err);
    
    res.status(err.statusCode).json({
        status:err.statusCode,
        data:{
            error:err,
            status: err.status,
            statusCode: err.statusCode,
            message : err.errorMessage
        }
    })

}