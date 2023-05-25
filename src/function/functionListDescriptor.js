export default [
    {
        "n": "SUMIF",
        "t": 0,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A1:A10",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "\">20\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "B1:B10",
                "require": "o",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "TAN",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "45*PI()/180",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TANH",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "CEILING",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "23.25",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ATAN",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ASINH",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "0.9",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ABS",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "-2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ACOS",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ACOSH",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MULTINOMIAL",
        "t": 0,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ATANH",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "0.9",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ATAN2",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COUNTBLANK",
        "t": 1,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2:C100",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "COSH",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "INT",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "99.44",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ISEVEN",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ISODD",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "LCM",
        "t": 0,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A5",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "3",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LN",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "LOG",
        "t": 0,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "128",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "LOG10",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MOD",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MROUND",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "21",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "14",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ODD",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SUMSQ",
        "t": 0,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "COMBIN",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SUM",
        "t": 0,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "SUBTOTAL",
        "t": 0,
        "m": [
            2,
            256
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2:A5",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "B2:B8",
                "require": "o",
                "repeat": "y",
                "type": "range"
            }
        ]
    },
    {
        "n": "ASIN",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COUNTIF",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A1:A10",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "\">20\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "RADIANS",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "180",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "RAND",
        "t": 0,
        "m": [
            0,
            0
        ],
        "p": []
    },
    {
        "n": "COUNTUNIQUE",
        "t": 0,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A1:C100",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "DEGREES",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "PI()",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ERFC",
        "t": 9,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "EVEN",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "EXP",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "FACT",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "FACTDOUBLE",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "6",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PI",
        "t": 0,
        "m": [
            0,
            0
        ],
        "p": []
    },
    {
        "n": "FLOOR",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "23.25",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "GCD",
        "t": 0,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A5",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "96",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "RANDBETWEEN",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ROUND",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "99.44",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ROUNDDOWN",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "99.44",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ROUNDUP",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "99.44",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SERIESSUM",
        "t": 0,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "{FACT(0)",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SIGN",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "-42",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SIN",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "PI()",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SINH",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SQRT",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "9",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SQRTPI",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "9",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "GAMMALN",
        "t": 1,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COS",
        "t": 0,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "PI()",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TRUNC",
        "t": 0,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "3.141592654",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "QUOTIENT",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "POWER",
        "t": 0,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.5",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SUMIFS",
        "t": 0,
        "m": [
            3,
            257
        ],
        "p": [
            {
                "example": "A1:A10",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": " B1:B10",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": " \">20\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": " C1:C10",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "GET_TARGET",
        "t": 0,
        "m": [
            0,
            0
        ],
        "p": [
        ]
    },
    {
        "n": "GET_AIRTABLE_DATA",
        "t": 0,
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "https://airtable.com/apppqwer/tblpoi/viwmnb",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
        ]
    },
    {
        "n": "ASK_AI",
        "t": 0,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "I need an accountability goal achievement",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "B1:B10",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
        ]
    },
    {
        "n": "COUNTIFS",
        "t": 1,
        "m": [
            2,
            256
        ],
        "p": [
            {
                "example": "A1:A10",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": " \">20\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": " B1:B10",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "PRODUCT",
        "t": 0,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "HARMEAN",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "HYPGEOMDIST",
        "t": 1,
        "m": [
            5,
            5
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "20",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "40",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "INTERCEPT",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "KURT",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "LARGE",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "STDEVA",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "STDEVP",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "GEOMEAN",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "RANK_EQ",
        "t": 1,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A1:A100",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "RANK_AVG",
        "t": 1,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A1:A100",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "PERCENTRANK_EXC",
        "t": 1,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A1:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PERCENTRANK_INC",
        "t": 1,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A1:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": " A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "FORECAST",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "FISHERINV",
        "t": 1,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "0.962",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "FISHER",
        "t": 1,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "0.962",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MODE_SNGL",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "WEIBULL_DIST",
        "t": 1,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "2.4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "COUNT",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "COUNTA",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "AVEDEV",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "AVERAGE",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "AVERAGEA",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "BINOM_DIST",
        "t": 1,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.005",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "BINOM_INV",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.005",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.8",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "CONFIDENCE_NORM",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "0.05",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1.6",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "250",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "CORREL",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COVARIANCE_P",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COVARIANCE_S",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DEVSQ",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "EXPON_DIST",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.5",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "AVERAGEIF",
        "t": 1,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A1:A10",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\">20\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "B1:B10",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "AVERAGEIFS",
        "t": 1,
        "m": [
            2,
            255
        ],
        "p": [
            {
                "example": "A1:A10",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": " B1:B10",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": " \">20\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": " C1:C10",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "PERMUT",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TRIMMEAN",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PERCENTILE_EXC",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.25",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PERCENTILE_INC",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.25",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PEARSON",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "NORM_S_INV",
        "t": 1,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "0.75",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "NORM_S_DIST",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "2.4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "NORM_INV",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "0.75",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "NORM_DIST",
        "t": 1,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "2.4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "NEGBINOM_DIST",
        "t": 1,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "MINA",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MIN",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MEDIAN",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MAXA",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MAX",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "LOGNORM_INV",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "0.4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "6",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "LOGNORM_DIST",
        "t": 1,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "6",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "Z_TEST",
        "t": 1,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "B2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "3",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PROB",
        "t": 1,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "A3:A6",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "QUARTILE_EXC",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "QUARTILE_INC",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "POISSON_DIST",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "RSQ",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "T_DIST",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "30",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "T_DIST_2T",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "30",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "T_DIST_RT",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "30",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "T_INV",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "0.35",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "T_INV_2T",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "0.35",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "T_TEST",
        "t": 1,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "A1:A4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B1:B4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "F_DIST",
        "t": 1,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "15.35",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "6",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "F_DIST_RT",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "15.35",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "6",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "VAR_P",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "VAR_S",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "VARA",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "VARPA",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "STEYX",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "STANDARDIZE",
        "t": 1,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "96",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "80",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "6.7",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SMALL",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:B100",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SLOPE",
        "t": 1,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SKEW",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "SKEW_P",
        "t": 1,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "VLOOKUP",
        "t": 2,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "10003",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A2:B26",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "HLOOKUP",
        "t": 2,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "10003",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A2:Z6",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LOOKUP",
        "t": 2,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "10003",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A1:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "B1:B100",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ADDRESS",
        "t": 2,
        "m": [
            2,
            5
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"Sheet2\"",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "INDIRECT",
        "t": 2,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "\"Sheet2!\"&B10",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "FALSE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ROW",
        "t": 2,
        "m": [
            0,
            1
        ],
        "p": [
            {
                "example": "A9",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ROWS",
        "t": 2,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A9:A62",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COLUMN",
        "t": 2,
        "m": [
            0,
            1
        ],
        "p": [
            {
                "example": "A9",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "COLUMNS",
        "t": 2,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A9:W62",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "OFFSET",
        "t": 2,
        "m": [
            3,
            5
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MATCH",
        "t": 2,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "\"Sunday\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A2:A9",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "INDEX",
        "t": 2,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A1:C20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "5",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "GETPIVOTDATA",
        "t": 2,
        "m": [
            2,
            254
        ],
        "p": [
            {
                "example": "\"SUM of number of units\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "'Pivot table'!A1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"division\"",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            },
            {
                "example": "\"east\"",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "CHOOSE",
        "t": 2,
        "m": [
            2,
            255
        ],
        "p": [
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "\"A\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"B\"",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "HYPERLINK",
        "t": 2,
        "p": [
            {
                "example": "\"http://www.luckysheet.com/\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"luckysheet\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TIME",
        "t": 6,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "11",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "40",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "59",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TIMEVALUE",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"2:15 PM\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "EOMONTH",
        "t": 6,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "EDATE",
        "t": 6,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SECOND",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "TIME(11",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "MINUTE",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "TIME(11",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "HOUR",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "TIME(11",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "NOW",
        "t": 6,
        "m": [
            0,
            0
        ],
        "p": []
    },
    {
        "n": "NETWORKDAYS",
        "t": 6,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "16)",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "NETWORKDAYS_INTL",
        "t": 6,
        "m": [
            2,
            4
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "16)",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(1969",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISOWEEKNUM",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "WEEKNUM",
        "t": 6,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "WEEKDAY",
        "t": 6,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DAY",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "DAYS",
        "t": 6,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "2011-3-15",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2011-2-1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "DAYS360",
        "t": 6,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "FALSE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "DATE",
        "t": 6,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "1969",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "20",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DATEVALUE",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"1969-7-20\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "DATEDIF",
        "t": 6,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "16)",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "WORKDAY",
        "t": 6,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "16)",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "WORKDAY_INTL",
        "t": 6,
        "m": [
            2,
            4
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "16)",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(1969",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "YEAR",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "YEARFRAC",
        "t": 6,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "7",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "16)",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TODAY",
        "t": 6,
        "m": [
            0,
            0
        ],
        "p": []
    },
    {
        "n": "MONTH",
        "t": 6,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "EFFECT",
        "t": 8,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "0.99",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DOLLAR",
        "t": 12,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "1.2351",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DOLLARDE",
        "t": 8,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "100.10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "32",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DOLLARFR",
        "t": 8,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "100.125",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "32",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DB",
        "t": 8,
        "m": [
            4,
            5
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "50",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DDB",
        "t": 8,
        "m": [
            4,
            5
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "50",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2.25",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "RATE",
        "t": 8,
        "m": [
            3,
            6
        ],
        "p": [
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "-100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "400",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "CUMPRINC",
        "t": 8,
        "m": [
            6,
            6
        ],
        "p": [
            {
                "example": "0.12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "5",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COUPNUM",
        "t": 8,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "02",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SYD",
        "t": 8,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "50",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TBILLEQ",
        "t": 8,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2)",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TBILLYIELD",
        "t": 8,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "95",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TBILLPRICE",
        "t": 8,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.09",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PV",
        "t": 8,
        "m": [
            3,
            5
        ],
        "p": [
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "D2",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ACCRINT",
        "t": 8,
        "m": [
            6,
            8
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "10000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ACCRINTM",
        "t": 8,
        "m": [
            4,
            5
        ],
        "p": [
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(1969",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COUPDAYBS",
        "t": 8,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COUPDAYS",
        "t": 8,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COUPDAYSNC",
        "t": 8,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COUPNCD",
        "t": 8,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "01)",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "DATE(2019",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COUPPCD",
        "t": 8,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "01)",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "DATE(2019",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "FV",
        "t": 8,
        "m": [
            3,
            5
        ],
        "p": [
            {
                "example": "0.12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "400",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "FVSCHEDULE",
        "t": 8,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "10000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "YIELD",
        "t": 8,
        "m": [
            6,
            7
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.057",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "95",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "YIELDDISC",
        "t": 8,
        "m": [
            4,
            5
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "95",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "NOMINAL",
        "t": 8,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "0.85",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "XIRR",
        "t": 8,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "B2:B25",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "C2:C25",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "250",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MIRR",
        "t": 8,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:A25",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "IRR",
        "t": 8,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "A2:A25",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "200",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "NPV",
        "t": 8,
        "m": [
            2,
            255
        ],
        "p": [
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "200",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "250",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "XNPV",
        "t": 8,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B25",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "C2:C25",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "CUMIPMT",
        "t": 8,
        "m": [
            6,
            6
        ],
        "p": [
            {
                "example": "0.12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "5",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PMT",
        "t": 8,
        "m": [
            3,
            5
        ],
        "p": [
            {
                "example": "0.08",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": " 100000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "D2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "IPMT",
        "t": 8,
        "m": [
            4,
            6
        ],
        "p": [
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "80000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "E2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PPMT",
        "t": 8,
        "m": [
            4,
            6
        ],
        "p": [
            {
                "example": "0.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "3*12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "INTRATE",
        "t": 8,
        "m": [
            4,
            5
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "100000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "101200",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PRICE",
        "t": 8,
        "m": [
            6,
            7
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.057",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.065",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PRICEDISC",
        "t": 8,
        "m": [
            4,
            5
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.0525",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "PRICEMAT",
        "t": 8,
        "m": [
            5,
            6
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.061",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.061",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "RECEIVED",
        "t": 8,
        "m": [
            4,
            5
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "10000000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.0575",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DISC",
        "t": 8,
        "m": [
            4,
            5
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "97.975",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "12",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "NPER",
        "t": 8,
        "m": [
            3,
            5
        ],
        "p": [
            {
                "example": "0.12",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "500",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "40000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SLN",
        "t": 8,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "300000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "75000",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DURATION",
        "t": 8,
        "m": [
            5,
            6
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.08",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.09",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MDURATION",
        "t": 8,
        "m": [
            5,
            6
        ],
        "p": [
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "DATE(2010",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0.08",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0.09",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "BIN2DEC",
        "t": 9,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "101",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "BIN2HEX",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "101",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "BIN2OCT",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "101",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DEC2BIN",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DEC2HEX",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DEC2OCT",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "HEX2BIN",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "\"f3\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "HEX2DEC",
        "t": 9,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"f3\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "HEX2OCT",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "\"f3\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "OCT2BIN",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "37",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "OCT2DEC",
        "t": 9,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "37",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "OCT2HEX",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "37",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "8",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "COMPLEX",
        "t": 9,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "\"j\"",
                "require": "o",
                "repeat": "n",
                "type": "rangestring"
            }
        ]
    },
    {
        "n": "IMREAL",
        "t": 9,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"4+5i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "IMAGINARY",
        "t": 9,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"4+5i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "IMCONJUGATE",
        "t": 9,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"3+4i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "IMABS",
        "t": 9,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"3+4i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "DELTA",
        "t": 9,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "IMSUM",
        "t": 9,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "\"3+4i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"5-3i\"",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "IMSUB",
        "t": 9,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "\"6+5i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"2+3i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "IMPRODUCT",
        "t": 9,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "\"3+4i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"5-3i\"",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "IMDIV",
        "t": 9,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "\"11+16i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"3+2i\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "NOT",
        "t": 10,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TRUE",
        "t": 10,
        "m": [
            0,
            0
        ],
        "p": []
    },
    {
        "n": "FALSE",
        "t": 10,
        "m": [
            0,
            0
        ],
        "p": []
    },
    {
        "n": "AND",
        "t": 10,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2 = \"foo\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A3 = \"bar\"",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "IFERROR",
        "t": 10,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"Error in cell A1\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "IF",
        "t": 10,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A2 = \"foo\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"A2 is foo\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"A2 was false\"",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "OR",
        "t": 10,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2 = \"foo\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": " A3 = \"bar\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "NE",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "EQ",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "GT",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "GTE",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LT",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LTE",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ADD",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MINUS",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MULTIPLY",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DIVIDE",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "CONCAT",
        "t": 11,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "\"de\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"mystify\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "UNARY_PERCENT",
        "t": 11,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "CONCATENATE",
        "t": 12,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "\"Super\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"calla\"",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "CODE",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"a\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "CHAR",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "97",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ARABIC",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"XIV\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ROMAN",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "499",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "REGEXEXTRACT",
        "t": 12,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "\"Needle in a haystack\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\".e{2}dle\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "REGEXMATCH",
        "t": 12,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "\"Spreadsheets\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"S.r\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "REGEXREPLACE",
        "t": 12,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "\"Spreadsheets\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"S.*d\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"Bed\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "T",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "FIXED",
        "t": 12,
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "3.141592653",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "FALSE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "FIND",
        "t": 12,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "\"n\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "14",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "FINDB",
        "t": 12,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "\"new\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"new year\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "JOIN",
        "t": 12,
        "m": [
            2,
            255
        ],
        "p": [
            {
                "example": "\" and-a \"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "{1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LEFT",
        "t": 12,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "RIGHT",
        "t": 12,
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MID",
        "t": 12,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "\"get this\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "5",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "LEN",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LENB",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LOWER",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"LOREM IPSUM\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "UPPER",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"lorem ipsum\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "EXACT",
        "t": 12,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "REPLACE",
        "t": 12,
        "m": [
            4,
            4
        ],
        "p": [
            {
                "example": "\"Spreadsheets\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "6",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "\"Bed\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "REPT",
        "t": 12,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "\"ha\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SEARCH",
        "t": 12,
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "\"n\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "14",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SUBSTITUTE",
        "t": 12,
        "m": [
            3,
            4
        ],
        "p": [
            {
                "example": "\"search for it\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"search for\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"Google\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "CLEAN",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"AF\"&CHAR(31)",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TEXT",
        "t": 12,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "1.23",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "\"$0.00\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TRIM",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\" lorem ipsum\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "VALUE",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"123\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "PROPER",
        "t": 12,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"united states\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "CONVERT",
        "t": 13,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "5.1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "\"g\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"kg\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "SUMX2MY2",
        "t": 14,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SUMX2PY2",
        "t": 14,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SUMXMY2",
        "t": 14,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B100",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TRANSPOSE",
        "t": 14,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "{1,2}",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "TREND",
        "t": 14,
        "m": [
            1,
            4
        ],
        "p": [
            {
                "example": "B2:B10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2:A10",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A11:A13",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "FREQUENCY",
        "t": 14,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A2:A40",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "B2:B5",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "GROWTH",
        "t": 14,
        "m": [
            1,
            4
        ],
        "p": [
            {
                "example": "B2:B10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2:A10",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A11:A13",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LINEST",
        "t": 14,
        "m": [
            1,
            4
        ],
        "p": [
            {
                "example": "B2:B10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2:A10",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LOGEST",
        "t": 14,
        "m": [
            1,
            4
        ],
        "p": [
            {
                "example": "B2:B10",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "A2:A10",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "MDETERM",
        "t": 14,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A1:D4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MINVERSE",
        "t": 14,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A1:D4",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "MMULT",
        "t": 14,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "A1:B3",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "C1:F2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SUMPRODUCT",
        "t": 14,
        "m": [
            1,
            255
        ],
        "p": [
            {
                "example": "A2:C5",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "D2:F5",
                "require": "o",
                "repeat": "y",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ISFORMULA",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "CELL",
        "t": 15,
        "m": [
            2,
            2
        ],
        "p": [
            {
                "example": "\"type\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "C2",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "NA",
        "t": 15,
        "m": [
            0,
            0
        ],
        "p": []
    },
    {
        "n": "ERROR_TYPE",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A3",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISBLANK",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "ISERR",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISERROR",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISLOGICAL",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISNA",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISNONTEXT",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISNUMBER",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISREF",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "ISTEXT",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TYPE",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "C4",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "N",
        "t": 15,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TO_DATE",
        "t": 16,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "25405",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TO_PURE_NUMBER",
        "t": 16,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "50%",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TO_TEXT",
        "t": 16,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "24",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TO_DOLLARS",
        "t": 16,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "TO_PERCENT",
        "t": 16,
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "A2",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DGET",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DMAX",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DMIN",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DAVERAGE",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DCOUNT",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DCOUNTA",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DPRODUCT",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DSTDEV",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DSTDEVP",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DSUM",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DVAR",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "DVARP",
        "t": 17,
        "m": [
            3,
            3
        ],
        "p": [
            {
                "example": "A2:F20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "G2",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "A22:D23",
                "require": "m",
                "repeat": "n",
                "type": "range"
            }
        ]
    },
    {
        "n": "AGE_BY_IDCARD",
        "t": "3",
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "A1",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "\"2017-10-01\"",
                "require": "o",
                "repeat": "n",
                "type": "rangedatetime"
            }
        ]
    },
    {
        "n": "SEX_BY_IDCARD",
        "t": "3",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"31033519900101XXXX\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "BIRTHDAY_BY_IDCARD",
        "t": "3",
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "\"31033519900101XXXX\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "PROVINCE_BY_IDCARD",
        "t": "3",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"31033519900101XXXX\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "CITY_BY_IDCARD",
        "t": "3",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"31033519900101XXXX\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "STAR_BY_IDCARD",
        "t": "3",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"31033519900101XXXX\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ANIMAL_BY_IDCARD",
        "t": "3",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"31033519900101XXXX\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "ISIDCARD",
        "t": "3",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"31033519900101XXXX\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "DM_TEXT_CUTWORD",
        "t": "4",
        "m": [
            1,
            2
        ],
        "p": [
            {
                "example": "\"I came to Beijing Tsinghua University\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DM_TEXT_TFIDF",
        "t": "4",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "\"I came to Beijing Tsinghua University\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "20",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DM_TEXT_TEXTRANK",
        "t": "4",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "\"I came to Beijing Tsinghua University\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "20",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DATA_CN_STOCK_CLOSE",
        "t": "5",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "\"000001\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2015-01-08",
                "require": "o",
                "repeat": "n",
                "type": "rangedate"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DATA_CN_STOCK_OPEN",
        "t": "5",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "\"000001\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2015-01-08",
                "require": "o",
                "repeat": "n",
                "type": "rangedate"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DATA_CN_STOCK_MAX",
        "t": "5",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "\"000001\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2015-01-08",
                "require": "o",
                "repeat": "n",
                "type": "rangedate"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DATA_CN_STOCK_MIN",
        "t": "5",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "\"000001\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2015-01-08",
                "require": "o",
                "repeat": "n",
                "type": "rangedate"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DATA_CN_STOCK_VOLUMN",
        "t": "5",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "\"000001\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2015-01-08",
                "require": "o",
                "repeat": "n",
                "type": "rangedate"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "DATA_CN_STOCK_AMOUNT",
        "t": "5",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "\"000001\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "2015-01-08",
                "require": "o",
                "repeat": "n",
                "type": "rangedate"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "ISDATE",
        "t": "6",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"1990-01-01\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "LINESPLINES",
        "t": "3",
        "m": [
            1,
            8
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#2ec7c9",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "avg",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#000",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1.5",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "AREASPLINES",
        "t": "3",
        "m": [
            1,
            5
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#2ec7c9",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#CCF3F4",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "avg",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#000",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "COLUMNSPLINES",
        "t": "3",
        "m": [
            1,
            6
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "100",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "STACKCOLUMNSPLINES",
        "t": "3",
        "m": [
            1,
            5
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "100",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "BARSPLINES",
        "t": "3",
        "m": [
            1,
            6
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "100",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "STACKBARSPLINES",
        "t": "3",
        "m": [
            1,
            5
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "100",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "DISCRETESPLINES",
        "t": "3",
        "m": [
            1,
            4
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#2ec7c9",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "TRISTATESPLINES",
        "t": "3",
        "m": [
            1,
            6
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#999",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "PIESPLINES",
        "t": "3",
        "m": [
            1,
            5
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "0",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#000",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "#97b552",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "BOXSPLINES",
        "t": "3",
        "m": [
            1,
            4
        ],
        "p": [
            {
                "example": "A1:A20",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1.5",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "10",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "1.5",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "BULLETSPLINES",
        "t": "3",
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "10",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "8",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "12",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "COMPOSESPLINES",
        "t": "3",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "PIESPLINES(A1:A20)",
                "require": "m",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "SORT",
        "t": "14",
        "m": [
            1,
            4
        ],
        "p": [
            {
                "example": "A2:A17",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "-1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "FILTER",
        "t": "14",
        "m": [
            2,
            3
        ],
        "p": [
            {
                "example": "A5:D20",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "range"
            },
            {
                "example": "\"\"",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "UNIQUE",
        "t": "14",
        "m": [
            1,
            3
        ],
        "p": [
            {
                "example": "A2:B26",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "TRUE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            {
                "example": "FALSE()",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "RANDARRAY",
        "t": "14",
        "m": [
            0,
            2
        ],
        "p": [
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "SEQUENCE",
        "t": "14",
        "m": [
            1,
            4
        ],
        "p": [
            {
                "example": "1",
                "require": "m",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            },
            {
                "example": "1",
                "require": "o",
                "repeat": "n",
                "type": "rangenumber"
            }
        ]
    },
    {
        "n": "EVALUATE",
        "t": "3",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "\"A1+5*2^2\"",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    {
        "n": "REMOTE",
        "t": "5",
        "m": [
            1,
            1
        ],
        "p": [
            {
                "example": "SUM(A1:A10000000)",
                "require": "m",
                "repeat": "n",
                "type": "string"
            }
        ]
    },
]
