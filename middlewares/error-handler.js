import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, sowwy"
    }

    // catch outwordly errors here and process them before spitting out

    return res.status(customError.statusCode).json({ error: customError.msg })
}

export default errorHandlerMiddleware