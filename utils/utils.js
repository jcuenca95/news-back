exports.parseSort = function (sortString) {
  let order = sortString.slice(sortString.indexOf(",") + 1);
  let field = sortString.slice(0, sortString.indexOf(","));
  sort = { [field]: order == "ASC" ? 1 : -1 };
  return sort;
};
