// TODO: Add tests that you find necessary.

const { isValidXML } = require("../src");

describe("advanced validator test", () => {
  describe("given valid xml", () => {
    it("<a><b><b></a>", () => {
      expect(isValidXML("<a><b><b></a>")).toBeFalsy();
    });
  });
});
