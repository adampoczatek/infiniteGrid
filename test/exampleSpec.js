describe("Example Service", function () {
    var exampleService;

    beforeEach(module("infiniteGrid"));

    it("should return \"Hello World!\"", inject(function (exampleService) {
        expect(exampleService.log("Hello World!")).toBe("Hello World!");
    }));
});