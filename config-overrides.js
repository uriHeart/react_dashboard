const {
  addDecoratorsLegacy,
  disableEsLint,
  override
} = require("customize-cra");
//build-test
module.exports = {
  webpack: override(
    disableEsLint(),
    addDecoratorsLegacy()
  )
};
