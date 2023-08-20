
module.exports = (temp, product) => {
    // wrapping /.../g will make it global so all elements will be wrapped in these placeholders
    //replaceAll product name with temp because it is not good practice to directly maniumplate arguements hence let 
    let output = temp.replaceAll(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replaceAll(/{%IMAGE%}/g, product.image)
    output = output.replaceAll(/{%PRICE%}/g, product.price)
    output = output.replaceAll(/{%FROM%}/g, product.from)
    output = output.replaceAll(/{%QUANTITY%}/g, product.quantity)
    output = output.replaceAll(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replaceAll(/{%DESCRIPTION%}/g, product.description)
    output = output.replaceAll(/{%ID%}/g, product.id)

    if (!product.organic) output = output.replaceAll(/{%NOT_ORGANIC%}/g, 'not-organic')
    return output
}