describe("Utilities Service", function () {
    beforeEach(module("infiniteGrid"));

    it("should create copy of an object", inject(function (utilsService) {
        var obj,
            cloned;

        obj = {
            key: "value"
        };

        cloned = utilsService.cloneObject(obj);

        expect(obj === cloned).toBe(false);

        expect(cloned.key === "value").toBe(true);
    }));

    it("should have the right amount of rows", inject(function (utilsService) {
        var setup, rows;

        setup = utilsService.setupDataSetObj(2, 2);

        rows = Object.keys(setup);

        expect(rows.length).toBe(2);
    }));

    it("should have the right amount of columns in each row", inject(function (utilsService) {
        var setup, columns1, columns2;

        setup = utilsService.setupDataSetObj(4, 2);

        columns1 = Object.keys(setup[0].columns);

        columns2 = Object.keys(setup[1].columns);

        expect(columns1.length).toBe(4);

        expect(columns2.length).toBe(4);
    }));
});