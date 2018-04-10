/* eslint-disable max-len */
import json2csv from 'json2csv';
import _ from 'lodash';
import moment from 'moment-timezone';

const filterRefundData = (refundItem, itemId) => {
  const result = {};
  for (const data of refundItem) { // eslint-disable-line
    const refundId = _.find(data.refund_line_items, { line_item_id: itemId });
    if (!_.isEmpty(refundId)) {
      return data;
    }
  }
  return result;
};

const mappingOrderData = (order, storeCode) => {
  const mappingItems = [];

  const commonMapData = {
    Store_Code: storeCode,
    Transaction_Number: _.toString(order.id),
    Transaction_DateTime: moment(order.created_at).format('YYYY/MM/DD HH:mm:ss'),
    Transaction_Amount: _.toString(order.total_price),
    Transaction_Discount: _.toString(order.total_discounts),
  };

  for (const item of order.line_items) { // eslint-disable-line
    let itemData = {};
    itemData = _.clone(commonMapData);

    const refundDetail = filterRefundData(order.refunds, item.id);

    itemData.Return_Transaction_Reference_Number = _.toString(refundDetail.id) || null;
    itemData.Return_Transaction_Purchase_DateTime = refundDetail.created_at || null;

    itemData.Customer_Id = (order.customer) ? order.customer.id : null;
    itemData.Customer_Mobile = (order.customer && order.customer.phone) ? order.customer.phone : ((order.shipping_address) ? order.shipping_address.phone : null);  // eslint-disable-line
    itemData.Customer_Email = order.email;

    itemData.Item_Code = _.toString(item.sku) || null;
    itemData.Item_Description = _.trim(item.title) || null;
    itemData.Item_Qty = _.toString(item.quantity);
    itemData.Item_Rate = _.toString(item.price);
    itemData.Item_Value = _.toString(item.quantity * item.price);
    itemData.Item_Discount = _.toString(item.total_discount);
    itemData.Item_Amount = _.toString((item.quantity * item.price) - item.total_discount);

    mappingItems.push(itemData);
  }

  return mappingItems;
};

const isNewsLetterSubscribed = (tags) => {
  if (!tags || (typeof tags === 'string' && tags.indexOf('newsletter') === -1)) {
    return 'N';
  }
  return 'Y';
};

const getGender = (note) => {
  try {
    const noteByField = note.split('\n');
    const gender = noteByField.filter(val => val.indexOf('gender') >= 0);
    return gender.length > 0 ? gender[0].split(':')[1].trim().charAt(0) : '';
  } catch (err) {
    return null;
  }
};

const shopifyToMemberson = (customers) => {
  if (!Array.isArray(customers)) {
    return false;
  }

  return customers.map((customer) => {
    const mappedCustomer = {
      'First Name': customer.first_name ? customer.first_name.substr(0, 50) : null,
      'Last Name': customer.last_name ? customer.last_name.substr(0, 50) : null,
      Email: customer.email,
      Gender: getGender(customer.note),
      'Member Since': customer.created_at,
    };
    mappedCustomer['Accepts Marketing'] = customer.accepts_marketing ? 'Y' : 'N';
    mappedCustomer.Newsletter = isNewsLetterSubscribed(customer.tags);

    const defaultAddress = customer.addresses.filter(address => address.default);
    if (defaultAddress.length > 0) {
      mappedCustomer['Address 1'] = defaultAddress[0].address1 ? defaultAddress[0].address1.substr(0, 100) : null;
      mappedCustomer['Address 2'] = defaultAddress[0].address2 ? defaultAddress[0].address2.substr(0, 100) : null;
      mappedCustomer['Address 3'] = null;
      mappedCustomer['Address 4'] = null;
      mappedCustomer.City = defaultAddress[0].city ? defaultAddress[0].city.substr(0, 50) : null;
      mappedCustomer.State = defaultAddress[0].province ? defaultAddress[0].province.substr(0, 50) : null;
      mappedCustomer['Country Code'] = defaultAddress[0].country_code;
      mappedCustomer['Postal Code'] = defaultAddress[0].zip ? defaultAddress[0].zip.substr(0, 10) : null;
      mappedCustomer.Mobile = defaultAddress[0].phone ? defaultAddress[0].phone.replace(/\D/g, '') : null;
    }
    return mappedCustomer;
  });
};
const getCustomerFields = () => [
  'First Name',
  'Last Name',
  'Gender',
  'Email',
  'Mobile',
  'Address 1',
  'Address 2',
  'Address 3',
  'Address 4',
  'City',
  'State',
  'Country Code',
  'Postal Code',
  'Accepts Marketing',
  'Newsletter',
  'Member Since'];


const jsonToCsvParser = (jsonObject, fields, withTitle = true) =>
  json2csv({ data: jsonObject, fields, hasCSVColumnTitle: withTitle });

const removeHtmlTags = html => html.replace(/<(?:.|\n)*?>/gm, '');

module.exports = {
  customer: {
    shopifyToMemberson,
    getCustomerFields,
    getGender,
  },
  jsonToCsvParser,
  mappingOrderData,
  removeHtmlTags,
};

