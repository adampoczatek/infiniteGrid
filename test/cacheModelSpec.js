describe("cacheModel", function () {
    beforeEach(module("infiniteGrid"));

    it("should create new cache instance", inject(function (CacheModel) {
        var cache;

        cache = new CacheModel();

        expect(cache instanceof CacheModel).toBe(true);
    }));
});

describe("cacheModel.insertData", function () {
    beforeEach(module("infiniteGrid"));

    it("should insert data", inject(function (CacheModel, RowModel, CellModel) {
        var dataSet1, dataSet2, cache;

        dataSet1 = {
            0: {
                0: "Data Set 1 - Row 1 - Column 1",
                1: "Data Set 1 - Row 1 - Column 2",
                3: "Data Set 1 - Row 1 - Column 4"
            },
            2: {
                6: "Data Set 1 - Row 3 - Column 7",
                8: "Data Set 1 - Row 3 - Column 9",
                9: "Data Set 1 - Row 3 - Column 10"
            },
            5: {
                0: "Data Set 1 - Row 6 - Column 1",
                1: "Data Set 1 - Row 6 - Column 2",
                2: "Data Set 1 - Row 6 - Column 3"
            }
        };

        dataSet2 = {
            0: {
                2: "Data Set 2 - Row 1 - Column 3",
                3: "Data Set 2 - Row 1 - Column 4",
                4: "Data Set 2 - Row 1 - Column 5"
            },
            3: {
                6: "Data Set 2 - Row 4 - Column 7",
                8: "Data Set 2 - Row 4 - Column 9",
                9: "Data Set 2 - Row 4 - Column 10"
            },
            6: {
                0: "Data Set 2 - Row 7 - Column 1",
                1: "Data Set 2 - Row 7 - Column 2",
                2: "Data Set 2 - Row 7 - Column 3"
            }
        };
        
        cache = new CacheModel();

        cache.insertData(dataSet1);

        expect(cache.data[0].cells[0].value).toBe("Data Set 1 - Row 1 - Column 1");
        expect(cache.data[0].cells[1].value).toBe("Data Set 1 - Row 1 - Column 2");
        expect(cache.data[0].cells[3].value).toBe("Data Set 1 - Row 1 - Column 4");

        expect(cache.data[2].cells[6].value).toBe("Data Set 1 - Row 3 - Column 7");
        expect(cache.data[2].cells[8].value).toBe("Data Set 1 - Row 3 - Column 9");
        expect(cache.data[2].cells[9].value).toBe("Data Set 1 - Row 3 - Column 10");

        expect(cache.data[5].cells[0].value).toBe("Data Set 1 - Row 6 - Column 1");
        expect(cache.data[5].cells[1].value).toBe("Data Set 1 - Row 6 - Column 2");
        expect(cache.data[5].cells[2].value).toBe("Data Set 1 - Row 6 - Column 3");

        cache.insertData(dataSet2);

        expect(cache.data[0].cells[0].value).toBe("Data Set 1 - Row 1 - Column 1");
        expect(cache.data[0].cells[1].value).toBe("Data Set 1 - Row 1 - Column 2");
        expect(cache.data[0].cells[2].value).toBe("Data Set 2 - Row 1 - Column 3");
        expect(cache.data[0].cells[3].value).toBe("Data Set 2 - Row 1 - Column 4");
        expect(cache.data[0].cells[4].value).toBe("Data Set 2 - Row 1 - Column 5");

        expect(cache.data[2].cells[6].value).toBe("Data Set 1 - Row 3 - Column 7");
        expect(cache.data[2].cells[8].value).toBe("Data Set 1 - Row 3 - Column 9");
        expect(cache.data[2].cells[9].value).toBe("Data Set 1 - Row 3 - Column 10");

        expect(cache.data[5].cells[0].value).toBe("Data Set 1 - Row 6 - Column 1");
        expect(cache.data[5].cells[1].value).toBe("Data Set 1 - Row 6 - Column 2");
        expect(cache.data[5].cells[2].value).toBe("Data Set 1 - Row 6 - Column 3");

        expect(cache.data[3].cells[6].value).toBe("Data Set 2 - Row 4 - Column 7");
        expect(cache.data[3].cells[8].value).toBe("Data Set 2 - Row 4 - Column 9");
        expect(cache.data[3].cells[9].value).toBe("Data Set 2 - Row 4 - Column 10");

        expect(cache.data[6].cells[0].value).toBe("Data Set 2 - Row 7 - Column 1");
        expect(cache.data[6].cells[1].value).toBe("Data Set 2 - Row 7 - Column 2");
        expect(cache.data[6].cells[2].value).toBe("Data Set 2 - Row 7 - Column 3");
    }));
});

describe("cacheModel.insertData", function () {
    beforeEach(module("infiniteGrid"));

    it("should insert data", inject(function (CacheModel, RowModel, CellModel) {
        var dataSet, cache, query;

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
                3: "Row 2 - Column 4"

            },
            2: {
                0: "Row 3 - Column 1",
                1: "Row 3 - Column 2",

                3: "Row 3 - Column 4",
                4: "Row 3 - Column 5"
            },
            3: {
                0: "Row 4 - Column 1",


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

        expect(Object.keys(query.data).length).toBe(3);
        expect(Object.keys(query.data[0].cells).length).toBe(3);

        expect(query.data[0].cells[0].value).toBe(undefined);
        expect(query.data[0].cells[1].value).toBe("Row 3 - Column 4");
        expect(query.data[0].cells[2].value).toBe("Row 3 - Column 5");

        expect(query.data[1].cells[0].value).toBe(undefined);
        expect(query.data[1].cells[1].value).toBe("Row 4 - Column 4");
        expect(query.data[1].cells[2].value).toBe("Row 4 - Column 5");

        expect(query.data[2].cells[0].value).toBe("Row 5 - Column 3");
        expect(query.data[2].cells[1].value).toBe("Row 5 - Column 4");
        expect(query.data[2].cells[2].value).toBe("Row 5 - Column 5");

        expect(query.empty[0][2]).toBe(2);
        expect(query.empty[1][2]).toBe(3);
    }));
});