function templateReplace(temp, product) {
  let output = temp.replace(/{%Product_image%}/g, product.image);
  output = output.replace(/{%Product_ID%}/g, product.id);
  output = output.replace(/{%Product_title%}/g, product.productName);
  output = output.replace(/{%Product_price%}/g, product.price);
  output = output.replace(/{%Product_nutrients%}/g, product.nutrients);
  output = output.replace(/{%Product_from%}/g, product.from);
  output = output.replace(/{%Product_description%}/g, product.description);
  output = output.replace(/{%Product_quantity%}/g, product.quantity);
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};


module.exports = templateReplace