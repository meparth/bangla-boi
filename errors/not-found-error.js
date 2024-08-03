import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

class NotFoundError extends CustomError {
    constructor(err) {
        super(err)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError