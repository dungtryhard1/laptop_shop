const getObjectShortened = (data) => {
    delete data._doc.createdAt;
    delete data._doc.updatedAt;
    delete data._doc.__v;
    return data._doc;
};
export default getObjectShortened;
