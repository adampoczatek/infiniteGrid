describe("rowModel", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new row instance", inject(function (RowModel) {
        var row;

        row = new RowModel();

        expect(row instanceof RowModel).toBe(true);
    }));
});

describe("rowModel.insertCell", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new cell instance", inject(function (RowModel, CellModel) {
        var row, cell1, cell2, cell3;

        row = new RowModel();

        cell1 = new CellModel("Cell 1");

        cell2 = new CellModel("Cell 2");

        cell3 = new CellModel("Cell 3");

        row.insertCell(0, cell1);

        row.insertCell(4, cell2);

        row.insertCell(6, cell3);

        expect(row.cells[0] instanceof CellModel).toBe(true);

        expect(row.cells[0].value).toBe("Cell 1");

        expect(row.cells[4] instanceof CellModel).toBe(true);

        expect(row.cells[4].value).toBe("Cell 2");

        expect(row.cells[6] instanceof CellModel).toBe(true);

        expect(row.cells[6].value).toBe("Cell 3");

        expect(Object.keys(row.cells).length).toBe(3);
    }));
});

describe("rowModel.insertCells", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new cell instance", inject(function (RowModel, CellModel) {
        var row, data;

        data = {
            0: "Cell 1",
            2: "Cell 3",
            5: "Cell 6"
        };

        row = new RowModel();

        row.insertCells(data);

        expect(row.cells[0].value).toBe("Cell 1");
        expect(row.cells[2].value).toBe("Cell 3");
        expect(row.cells[5].value).toBe("Cell 6");
    }));
});

describe("rowModel.removeCell", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new cell instance", inject(function (RowModel, CellModel) {
        var row, cell1, cell2, cell3;

        row = new RowModel();

        cell1 = new CellModel("Cell 1");

        cell2 = new CellModel("Cell 2");

        cell3 = new CellModel("Cell 3");

        row.insertCell(0, cell1);

        row.insertCell(4, cell2);

        row.insertCell(6, cell3);


        expect(row.cells[0] instanceof CellModel).toBe(true);

        row.removeCell(0);

        expect(row.cells[0] instanceof CellModel).toBe(false);
        expect(row.cells[0]).toBe(null);


        expect(row.cells[4] instanceof CellModel).toBe(true);

        row.removeCell(4);

        expect(row.cells[4] instanceof CellModel).toBe(false);
        expect(row.cells[4]).toBe(null);


        expect(row.cells[6] instanceof CellModel).toBe(true);

        row.removeCell(6);

        expect(row.cells[6] instanceof CellModel).toBe(false);
        expect(row.cells[6]).toBe(null);
    }));
});

describe("rowModel.freeze", function () {
    beforeEach(module("infiniteGrid"));

    it("should update `frozen` property", inject(function (RowModel) {
        var row1, row2;

        row1 = new RowModel(false);

        row2 = new RowModel(true);

        expect(row1.frozen).toBe(false);

        expect(row2.frozen).toBe(true);

        // Changed

        row1.freeze(true);

        row2.freeze(false);

        expect(row1.frozen).toBe(true);

        expect(row2.frozen).toBe(false);
    }));
});

describe("rowModel.insertCells", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new cell instance", inject(function (RowModel, CellModel) {
        var row, data;

        data = {
            0: "Cell 1",
            2: "Cell 3",
            5: "Cell 6"
        };

        row = new RowModel();

        row.insertCells(data);

        expect(row.getCell(0).value).toBe("Cell 1");
        expect(row.getCell(2).value).toBe("Cell 3");
        expect(row.getCell(5).value).toBe("Cell 6");
    }));
});