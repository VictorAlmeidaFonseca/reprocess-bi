const { isEmpty, isObjectLike } = require('lodash')

function setData(date) {
    return date ? new Date(date) : date
}

module.exports = async (body) => {

    const fields = ["creationDate", "lastChange", "preSaleDate", "shippingEstimateDate", "issuanceDate", "birthDate",
        "deliveredDate", "authorizedDate", "invoicedDate", "cancellationData", "ReleaseDate", "createdIn", "updatedIn", "lastInteractionIn"]

    try {
        const convertDate = (async obj => {
            for (const prop in obj) {
                if (isEmpty(obj[prop])) continue;
                
                if (isObjectLike(obj[prop])) await convertDate(obj[prop]);

                if (fields.includes(prop)) obj[prop] = setData(obj[prop])
            }

            return obj;
        });

        const converted = await convertDate(JSON.parse(JSON.stringify(body)));

        return converted;

    } catch (err) {
        throw err
    }

}