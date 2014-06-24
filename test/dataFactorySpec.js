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

    it("should return an array of empty cells", inject(function (dataFactory) {
        var result;

        result = dataFactory.getEmptyCells(dataSet);

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

//describe("dataService.queryLocalData", function () {
//    beforeEach(module("infiniteGrid"));
//
//    it("should return new set of data", inject(function (dataFactory) {
//        var query, cachedQuery, missingData;
//
//        query = dataFactory.queryLocalData(1, 1, 2, 2, dataSet);
//
//        cachedQuery = query.cached;
//
//        missingData = query.empty;
//
//        expect(Object.keys(cachedQuery).length).toBe(2);
//
//        expect(Object.keys(cachedQuery[0].columns).length).toBe(2);
//
//        expect(Object.keys(cachedQuery[1].columns).length).toBe(2);
//
//        expect(cachedQuery[0].columns[0].value).toBe(null);
//
//        expect(cachedQuery[0].columns[1].value).toBe("Chris");
//
//        expect(cachedQuery[1].columns[0].value).toBe("Stuart");
//
//        expect(cachedQuery[1].columns[1].value).toBe(null);
//
//        console.log(cachedQuery);
//        console.log(cachedQuery);
//        console.log(missingData);
//    }));
//});

describe("dataService.mergeData", function () {
    beforeEach(module("infiniteGrid"));

    it("should merge data", inject(function (dataFactory) {
        var cachedData, serverData, result;

        serverData = {
            "0": {
                "0": {
                    "value": "Item 1"
                },
                "1": {
                    "value": "Item 2"
                },
                "2": {
                    "value": "Item 3"
                },
                "3": {
                    "value": "Item 4"
                }
            },
            "3": {
                "4": {
                    "value": "Item 5"
                },
                "5": {
                    "value": "Item 6"
                },
                "6": {
                    "value": "Item 7"
                },
                "7": {
                    "value": "Item 8"
                },
                "8": {
                    "value": "Item 9"
                },
                "9": {
                    "value": "Item 10"
                }
            }
        };

        cachedData = {
            "0": {
                columns: {
                    "4": {
                        value: "Cached item 5"
                    }
                }
            },

            "3": {
                columns: {
                    "1": {
                        value: "Cached item 2"
                    }
                }
            }
        };


        result = dataFactory.mergeData(cachedData, serverData);

        expect(result[0].columns[0].value).toBe("Item 1");
        expect(result[0].columns[1].value).toBe("Item 2");
        expect(result[0].columns[2].value).toBe("Item 3");
        expect(result[0].columns[3].value).toBe("Item 4");
        expect(result[0].columns[4].value).toBe("Cached item 5");
        expect(result[3].columns[1].value).toBe("Cached item 2");
        expect(result[3].columns[4].value).toBe("Item 5");
        expect(result[3].columns[5].value).toBe("Item 6");
        expect(result[3].columns[6].value).toBe("Item 7");
        expect(result[3].columns[7].value).toBe("Item 8");
        expect(result[3].columns[8].value).toBe("Item 9");
        expect(result[3].columns[9].value).toBe("Item 10");
    }));
});