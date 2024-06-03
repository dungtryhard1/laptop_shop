class NotFoundError extends Error {
    constructor(message) {
        super();
        this.status = 400;
        this.messageObject = message;
    }
}
export default NotFoundError;
