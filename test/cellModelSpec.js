describe("cellModel", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new cell instance", inject(function (CellModel) {
        var cell;

        cell = new CellModel();

        expect(cell instanceof CellModel).toBe(true);
    }));
});

describe("cellModel.hasValue", function () {
    beforeEach(module("infiniteGrid"));

    it("should check if cell has value", inject(function (CellModel) {
        var cell1, cell2, cell3;

        cell1 = new CellModel("Random Cell Value");

        cell2 = new CellModel();

        cell3 = new CellModel(0);

        expect(cell1.hasValue()).toBe(true);

        expect(cell2.hasValue()).toBe(false);

        expect(cell3.hasValue()).toBe(true);
    }));
});

describe("cellModel.setValue", function () {
    beforeEach(module("infiniteGrid"));

    it("should update cell value", inject(function (CellModel) {
        var cell1, cell2;

        cell1 = new CellModel("Random Cell Value");

        cell2 = new CellModel();

        // Update

        cell1.setValue("Cell 1 new value");

        cell2.setValue(0);

        expect(cell1.value).toBe("Cell 1 new value");

        expect(cell2.value).toBe(0);
    }));
});

describe("cellModel.getValue", function () {
    beforeEach(module("infiniteGrid"));

    it("should update cell value", inject(function (CellModel) {
        var cell1, cell2, changed;

        cell1 = new CellModel("Value 1");

        cell2 = new CellModel("Value 2");

        expect(cell1.getValue()).toBe("Value 1");

        expect(cell2.getValue()).toBe("Value 2");

        // Changed

        cell2.setValue("Value Changed");

        expect(cell2.getValue()).toBe("Value Changed");
    }));
});

describe("cellModel.freeze", function () {
    beforeEach(module("infiniteGrid"));

    it("should update `frozen` property", inject(function (CellModel) {
        var cell1, cell2;

        cell1 = new CellModel("Value 1", false);

        cell2 = new CellModel("Value 2", true);

        expect(cell1.frozen).toBe(false);

        expect(cell2.frozen).toBe(true);

        // Changed

        cell1.freeze(true);

        cell2.freeze(false);

        expect(cell1.frozen).toBe(true);

        expect(cell2.frozen).toBe(false);
    }));
});

//describe("cellModel.setTemplate", function () {
//    beforeEach(module("infiniteGrid"));
//
//    it("should update cell template", inject(function (CellModel) {
//        var cell;
//
//        cell = new CellModel();
//
//        cell.setTemplate("<div>{{value}}</div>");
//    }));
//});
//
//describe("cellModel.render", function () {
//    beforeEach(module("infiniteGrid"));
//
//    it("should render the cell", inject(function (CellModel) {
//        var cell;
//
//        cell = new CellModel();
//
//        cell.setValue("");
//    }));
//});