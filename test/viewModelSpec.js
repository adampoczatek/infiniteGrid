describe("viewModel", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new view instance", inject(function (ViewModel) {
        var view;

        view = new ViewModel();

        expect(view instanceof ViewModel).toBe(true);
    }));
});


describe("viewModel.update", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new view instance", inject(function (ViewModel, CacheModel) {
        var view, cache, dataSet, query;

        dataSet = {
            0: {
                0: "Row 1 - Column 1",
                1: "Row 1 - Column 2",
                2: "Row 1 - Column 3",
                3: "Row 1 - Column 4",
                4: "Row 1 - Column 5"
            },
            1: {
                0: "Row 2 - Column 1",
                1: "Row 2 - Column 2",
                2: "Row 2 - Column 3",
                3: "Row 2 - Column 4",
                4: "Row 2 - Column 5"
            },
            2: {
                0: "Row 3 - Column 1",
                1: "Row 3 - Column 2",
                2: "Row 3 - Column 3",
                3: "Row 3 - Column 4",
                4: "Row 3 - Column 5"
            },
            3: {
                0: "Row 4 - Column 1",
                1: "Row 4 - Column 2",
                2: "Row 4 - Column 3",
                3: "Row 4 - Column 4",
                4: "Row 4 - Column 5"
            },
            4: {
                0: "Row 5 - Column 1",
                1: "Row 5 - Column 2",
                2: "Row 5 - Column 3",
                3: "Row 5 - Column 4",
                4: "Row 5 - Column 5"
            }
        };

        cache = new CacheModel(3, 3);

        cache.insertData(dataSet);

        query = cache.query(2, 2);

        view = new ViewModel();

        view.update(query.data);

        expect(Object.keys(view.data).length).toBe(3);

        expect(view.data[0].getCell(0).getValue()).toBe("Row 3 - Column 3");
        expect(view.data[0].getCell(1).getValue()).toBe("Row 3 - Column 4");
        expect(view.data[0].getCell(2).getValue()).toBe("Row 3 - Column 5");

        expect(view.data[1].getCell(0).getValue()).toBe("Row 4 - Column 3");
        expect(view.data[1].getCell(1).getValue()).toBe("Row 4 - Column 4");
        expect(view.data[1].getCell(2).getValue()).toBe("Row 4 - Column 5");

        expect(view.data[2].getCell(0).getValue()).toBe("Row 5 - Column 3");
        expect(view.data[2].getCell(1).getValue()).toBe("Row 5 - Column 4");
        expect(view.data[2].getCell(2).getValue()).toBe("Row 5 - Column 5");
    }));
});
