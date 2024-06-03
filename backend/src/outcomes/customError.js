class CustomError extends Error {
    constructor(message, status) {
        super();
        this.status = status;
        this.messageObject = message;
    }
}
export default CustomError;
