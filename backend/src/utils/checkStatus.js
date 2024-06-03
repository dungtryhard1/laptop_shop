const checkStatus = {
    remove: (item) => {
        return !item || item?.isDeleted;
    },
    hidden: (item) => {
        return !item || item?.isHidden || item?.isDeleted;
    },
};
export default checkStatus;
