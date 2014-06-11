var dataSet;

dataSet = {
    0: {
        columns: {
            0: {
                value: "James"
            },
            1: {
                value: null
            },
            2: {
                value: null
            }
        }
    },
    1: {
        columns: {
            0: {
                value: "Bruce"
            },
            1: {
                value: null
            },
            2: {
                value: "Chris"
            }
        }
    },
    2: {
        columns: {
            0: {
                value: "Daniel"
            },
            1: {
                value: "Stuart"
            },
            2: {
                value: null
            }
        }
    }
};

describe("dataService.getEmptyCells", function () {
    beforeEach(module("infiniteGrid"));

    it("should return an array of empty cells", inject(function (dataService) {
        var result;

        result = dataService.getEmptyCells(dataSet);

        expect(result.length).toBe(4);

        // First match: { 0: 1 }
        expect(result[0][0]).toBe(1);

        // Second match: { 0: 2 }
        expect(result[1][0]).toBe(2);

        // Third match: { 0: 2 }
        expect(result[2][1]).toBe(1);

        // Last match: { 0: 2 }
        expect(result[3][2]).toBe(2);
    }));
});

describe("dataService.queryLocalData", function () {
    beforeEach(module("infiniteGrid"));

    it("should return new set of data", inject(function (dataService) {
        var query, cachedQuery, missingData;

        query = dataService.queryLocalData(1, 1, 2, 2, dataSet);

        cachedQuery = query.cached;

        missingData = query.empty;

        expect(Object.keys(cachedQuery).length).toBe(2);

        expect(Object.keys(cachedQuery[0].columns).length).toBe(2);

        expect(Object.keys(cachedQuery[1].columns).length).toBe(2);

        expect(cachedQuery[0].columns[0].value).toBe(null);

        expect(cachedQuery[0].columns[1].value).toBe("Chris");

        expect(cachedQuery[1].columns[0].value).toBe("Stuart");

        expect(cachedQuery[1].columns[1].value).toBe(null);

        console.log(cachedQuery);
        console.log(cachedQuery);
        console.log(missingData);
    }));
});