export default {
    functionlist: {
        SUMIF: {
            d: "Returns a conditional sum across a range.",
            a: "A conditional sum across a range.",
            p: [
                {
                    name: "range",
                    detail: "The range which is tested against `criterion`.",
                },
                {
                    name: "criterion",
                    detail: "The pattern or test to apply to `range`.",
                },
                {
                    name: "sum_range",
                    detail: "The range to be summed, if different from `range`.",
                },
            ],
        },
        TAN: {
            d: "Returns the tangent of an angle provided in radians.",
            a: "Tangent of an angle provided in radians.",
            p: [
                {
                    name: "angle",
                    detail: "The angle to find the tangent of, in radians.",
                },
            ],
        },
        TANH: {
            d: "Returns the hyperbolic tangent of any real number.",
            a: "Hyperbolic tangent of any real number.",
            p: [
                {
                    name: "value",
                    detail: "Any real value to calculate the hyperbolic tangent of.",
                },
            ],
        },
        CEILING: {
            d: "Rounds a number up to the nearest integer multiple of specified significance `factor`.",
            a: "Rounds number up to nearest multiple of a factor.",
            p: [
                {
                    name: "value",
                    detail: "The value to round up to the nearest integer multiple of `factor`.",
                },
                {
                    name: "factor",
                    detail: "The number to whose multiples `value` will be rounded.",
                },
            ],
        },
        ATAN: {
            d: "Returns the inverse tangent of a value, in radians.",
            a: "Inverse tangent of a value, in radians.",
            p: [
                {
                    name: "value",
                    detail: "The value for which to calculate the inverse tangent.",
                },
            ],
        },
        ASINH: {
            d: "Returns the inverse hyperbolic sine of a number.",
            a: "Inverse hyperbolic sine of a number.",
            p: [
                {
                    name: "value",
                    detail: "The value for which to calculate the inverse hyperbolic sine.",
                },
            ],
        },
        ABS: {
            d: "Returns the absolute value of a number.",
            a: "Absolute value of a number.",
            p: [
                {
                    name: "value",
                    detail: "The number of which to return the absolute value.",
                },
            ],
        },
        ACOS: {
            d: "Returns the inverse cosine of a value, in radians.",
            a: "Inverse cosine of a value, in radians.",
            p: [
                {
                    name: "value",
                    detail:
                        "The value for which to calculate the inverse cosine. Must be between `-1` and `1`, inclusive.",
                },
            ],
        },
        ACOSH: {
            d: "Returns the inverse hyperbolic cosine of a number.",
            a: "Inverse hyperbolic cosine of a number.",
            p: [
                {
                    name: "value",
                    detail:
                        "The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to `1`.",
                },
            ],
        },
        MULTINOMIAL: {
            d: "Returns the factorial of the sum of values divided by the product of the values' factorials.",
            a: "Multinomial distribution function.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider.",
                },
            ],
        },
        ATANH: {
            d: "Returns the inverse hyperbolic tangent of a number.",
            a: "Inverse hyperbolic tangent of a number.",
            p: [
                {
                    name: "value",
                    detail:
                        "The value for which to calculate the inverse hyperbolic tangent. Must be between -1 and 1, exclusive.",
                },
            ],
        },
        ATAN2: {
            d:
                "Returns the angle between the x-axis and a line segment from the origin (0,0) to specified coordinate pair (`x`,`y`), in radians.",
            a: "Arctangent of a value.",
            p: [
                {
                    name: "x",
                    detail:
                        "The x coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis.",
                },
                {
                    name: "y",
                    detail:
                        "The y coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis.",
                },
            ],
        },
        COUNTBLANK: {
            d: "Returns the number of empty values in a list of values and ranges.",
            a: "Number of empty values.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range in which to count the number of blanks.",
                },
            ],
        },
        COSH: {
            d: "Returns the hyperbolic cosine of any real number.",
            a: "Hyperbolic cosine of any real number.",
            p: [
                {
                    name: "value",
                    detail: "Any real value to calculate the hyperbolic cosine of.",
                },
            ],
        },
        INT: {
            d: "Rounds a number down to the nearest integer that is less than or equal to it.",
            a: "Rounds number down to nearest integer.",
            p: [
                {
                    name: "value",
                    detail: "The value to round down to the nearest integer.",
                },
            ],
        },
        ISEVEN: {
            d: "Checks whether the provided value is even.",
            a: "Whether the provided value is even.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as even.",
                },
            ],
        },
        ISODD: {
            d: "Checks whether the provided value is odd.",
            a: "Whether the provided value is odd.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as odd.",
                },
            ],
        },
        LCM: {
            d: "Returns the least common multiple of one or more integers.",
            a: "Least common multiple of one or more integers.",
            p: [
                {
                    name: "value1",
                    detail:
                        "The first value or range whose factors to consider in a calculation to find the least common multiple.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges whose factors to consider to find the least common multiple.",
                },
            ],
        },
        LN: {
            d: "Returns the logarithm of a number, base e (Euler's number).",
            a: "The logarithm of a number, base e (euler's number).",
            p: [
                {
                    name: "value",
                    detail: "The value for which to calculate the logarithm, base e.",
                },
            ],
        },
        LOG: {
            d: "Returns the logarithm of a number with respect to a base.",
            a: "The logarithm of a number with respect to a base.",
            p: [
                {
                    name: "value",
                    detail: "The value for which to calculate the logarithm.",
                },
                {
                    name: "base",
                    detail: "The base to use for calculation of the logarithm.",
                },
            ],
        },
        LOG10: {
            d: "Returns the logarithm of a number, base 10.",
            a: "The logarithm of a number, base 10.",
            p: [
                {
                    name: "value",
                    detail: "The value for which to calculate the logarithm, base 10.",
                },
            ],
        },
        MOD: {
            d: "Returns the result of the modulo operator, the remainder after a division operation.",
            a: "Modulo (remainder) operator.",
            p: [
                {
                    name: "dividend",
                    detail: "The number to be divided to find the remainder.",
                },
                {
                    name: "divisor",
                    detail: "The number to divide by.",
                },
            ],
        },
        MROUND: {
            d: "Rounds one number to the nearest integer multiple of another.",
            a: "Rounds a number to the nearest integer multiple.",
            p: [
                {
                    name: "value",
                    detail: "The number to round to the nearest integer multiple of another.",
                },
                {
                    name: "factor",
                    detail: "The number to whose multiples `value` will be rounded.",
                },
            ],
        },
        ODD: {
            d: "Rounds a number up to the nearest odd integer.",
            a: "Rounds a number up to the nearest odd integer.",
            p: [
                {
                    name: "value",
                    detail: "The value to round to the next greatest odd number.",
                },
            ],
        },
        SUMSQ: {
            d: "Returns the sum of the squares of a series of numbers and/or cells.",
            a: "Sum of squares.",
            p: [
                {
                    name: "value1",
                    detail: "The first number or range whose squares to add together.",
                },
                {
                    name: "value2",
                    detail: "Additional numbers or ranges whose squares to add to the square(s) of `value1`.",
                },
            ],
        },
        COMBIN: {
            d: "Returns the number of ways to choose some number of objects from a pool of a given size of objects.",
            a: "Number of combinations from a set of objects.",
            p: [
                {
                    name: "n",
                    detail: "The size of the pool of objects to choose from.",
                },
                {
                    name: "k",
                    detail: "The number of objects to choose.",
                },
            ],
        },
        SUM: {
            d: "Returns the sum of a series of numbers and/or cells.",
            a: "Sum of a series of numbers and/or cells.",
            p: [
                {
                    name: "value1",
                    detail: "The first number or range to add together.",
                },
                {
                    name: "value2",
                    detail: "Additional numbers or ranges to add to `value1`.",
                },
            ],
        },
        SUBTOTAL: {
            d: "Returns a subtotal for a vertical range of cells using a specified aggregation function.",
            a: "Subtotal for a range using a specific function.",
            p: [
                {
                    name: "function_code",
                    detail: "The function to use in subtotal aggregation.",
                },
                {
                    name: "range1",
                    detail: "The first range over which to calculate a subtotal.",
                },
                {
                    name: "range2",
                    detail: "Additional ranges over which to calculate subtotals.",
                },
            ],
        },
        ASIN: {
            d: "Returns the inverse sine of a value, in radians.",
            a: "Inverse sine of a value, in radians.",
            p: [
                {
                    name: "value",
                    detail:
                        "The value for which to calculate the inverse sine. Must be between `-1` and `1`, inclusive.",
                },
            ],
        },
        COUNTIF: {
            d: "Returns a conditional count across a range.",
            a: "A conditional count across a range.",
            p: [
                {
                    name: "range",
                    detail: "The range that is tested against `criterion`.",
                },
                {
                    name: "criterion",
                    detail: "The pattern or test to apply to `range`.",
                },
            ],
        },
        RADIANS: {
            d: "Converts an angle value in degrees to radians.",
            a: "Converts an angle value in degrees to radians.",
            p: [
                {
                    name: "angle",
                    detail: "The angle to convert from degrees to radians.",
                },
            ],
        },
        RAND: {
            d: "Returns a random number between 0 inclusive and 1 exclusive.",
            a: "A random number between 0 inclusive and 1 exclusive.",
            p: [],
        },
        COUNTUNIQUE: {
            d: "Counts the number of unique values in a list of specified values and ranges.",
            a: "Counts number of unique values in a range.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider for uniqueness.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider for uniqueness.",
                },
            ],
        },
        DEGREES: {
            d: "Converts an angle value in radians to degrees.",
            a: "Converts an angle value in radians to degrees.",
            p: [
                {
                    name: "angle",
                    detail: "The angle to convert from radians to degrees.",
                },
            ],
        },
        ERFC: {
            d: "Returns the complementary Gauss error function of a value.",
            a: "Complementary gauss error function of a value.",
            p: [
                {
                    name: "z",
                    detail: "The number for which to calculate the complementary Gauss error function.",
                },
            ],
        },
        EVEN: {
            d: "Rounds a number up to the nearest even integer.",
            a: "Rounds a number up to the nearest even integer.",
            p: [
                {
                    name: "value",
                    detail: "The value to round to the next greatest even number.",
                },
            ],
        },
        EXP: {
            d: "Returns Euler's number, e (~2.718) raised to a power.",
            a: "Euler's number, e (~2.718) raised to a power.",
            p: [
                {
                    name: "exponent",
                    detail: "The exponent to raise e to.",
                },
            ],
        },
        FACT: {
            d: "Returns the factorial of a number.",
            a: "Factorial of a number.",
            p: [
                {
                    name: "value",
                    detail: "The number or reference to a number whose factorial will be calculated and returned.",
                },
            ],
        },
        FACTDOUBLE: {
            d: 'Returns the "double factorial" of a number.',
            a: '"double factorial" of a number.',
            p: [
                {
                    name: "value",
                    detail:
                        "The number or reference to a number whose double factorial will be calculated and returned.",
                },
            ],
        },
        PI: {
            d: "Returns the value of Pi to 14 decimal places.",
            a: "The number pi.",
            p: [],
        },
        FLOOR: {
            d: "Rounds a number down to the nearest integer multiple of specified significance `factor`.",
            a: "Rounds number down to nearest multiple of a factor.",
            p: [
                {
                    name: "value",
                    detail: "The value to round down to the nearest integer multiple of `factor`.",
                },
                {
                    name: "factor",
                    detail: "The number to whose multiples `value` will be rounded.",
                },
            ],
        },
        GCD: {
            d: "Returns the greatest common divisor of one or more integers.",
            a: "Greatest common divisor of one or more integers.",
            p: [
                {
                    name: "value1",
                    detail:
                        "The first value or range whose factors to consider in a calculation to find the greatest common divisor.",
                },
                {
                    name: "value2",
                    detail:
                        "Additional values or ranges whose factors to consider to find the greatest common divisor.",
                },
            ],
        },
        RANDBETWEEN: {
            d: "Returns a uniformly random integer between two values, inclusive.",
            a: "Random integer between two values, inclusive.",
            p: [
                {
                    name: "low",
                    detail: "The low end of the random range.",
                },
                {
                    name: "high",
                    detail: "The high end of the random range.",
                },
            ],
        },
        ROUND: {
            d: "Rounds a number to a certain number of decimal places according to standard rules.",
            a: "Rounds a number according to standard rules.",
            p: [
                {
                    name: "value",
                    detail: "The value to round to `places` number of places.",
                },
                {
                    name: "places",
                    detail: "The number of decimal places to which to round.",
                },
            ],
        },
        ROUNDDOWN: {
            d:
                "Rounds a number to a certain number of decimal places, always rounding down to the next valid increment.",
            a: "Rounds down a number.",
            p: [
                {
                    name: "value",
                    detail: "The value to round to `places` number of places, always rounding down.",
                },
                {
                    name: "places",
                    detail: "The number of decimal places to which to round.",
                },
            ],
        },
        ROUNDUP: {
            d: "Rounds a number to a certain number of decimal places, always rounding up to the next valid increment.",
            a: "Rounds up a number.",
            p: [
                {
                    name: "value",
                    detail: "The value to round to `places` number of places, always rounding up.",
                },
                {
                    name: "places",
                    detail: "The number of decimal places to which to round.",
                },
            ],
        },
        SERIESSUM: {
            d: "Given parameters `x`, `n`, `m`, and `a`, returns the power series sum a",
            a: "Sum of a power series.",
            p: [
                {
                    name: "x",
                    detail:
                        "The input to the power series. Varies depending on the type of approximation, may be angle, exponent, or some other value.",
                },
                {
                    name: "n",
                    detail: "The initial power to which to raise `x` in the power series.",
                },
                {
                    name: "m",
                    detail: "The additive increment by which to increase `x`.",
                },
                {
                    name: "a",
                    detail: "The array or range containing the coefficients of the power series.",
                },
            ],
        },
        SIGN: {
            d: "Given an input number, returns `-1` if it is negative, `1` if positive, and `0` if it is zero.",
            a: "Sign of a provided number (+/-/0).",
            p: [
                {
                    name: "value",
                    detail: "The value whose sign will be evaluated.",
                },
            ],
        },
        SIN: {
            d: "Returns the sine of an angle provided in radians.",
            a: "Sine of an angle provided in radians.",
            p: [
                {
                    name: "angle",
                    detail: "The angle to find the sine of, in radians.",
                },
            ],
        },
        SINH: {
            d: "Returns the hyperbolic sine of any real number.",
            a: "Hyperbolic sine of any real number.",
            p: [
                {
                    name: "value",
                    detail: "Any real value to calculate the hyperbolic sine of.",
                },
            ],
        },
        SQRT: {
            d: "Returns the positive square root of a positive number.",
            a: "Positive square root of a positive number.",
            p: [
                {
                    name: "value",
                    detail: "The number for which to calculate the positive square root.",
                },
            ],
        },
        SQRTPI: {
            d: "Returns the positive square root of the product of Pi and the given positive number.",
            a: "Square root of the product of pi and number.",
            p: [
                {
                    name: "value",
                    detail: "The number which will be multiplied by Pi and have the product's square root returned",
                },
            ],
        },
        GAMMALN: {
            d: "Returns the logarithm of a specified Gamma function, base e (Euler's number).",
            a: "Logarithm of gamma function.",
            p: [
                {
                    name: "value",
                    detail:
                        "The input to the Gamma function. The natural logarithm of Gamma(`value`) will be returned.",
                },
            ],
        },
        COS: {
            d: "Returns the cosine of an angle provided in radians.",
            a: "Cosine of an angle provided in radians.",
            p: [
                {
                    name: "angle",
                    detail: "The angle to find the cosine of, in radians.",
                },
            ],
        },
        TRUNC: {
            d: "Truncates a number to a certain number of significant digits by omitting less significant digits.",
            a: "Truncates a number.",
            p: [
                {
                    name: "value",
                    detail: "The value to be truncated.",
                },
                {
                    name: "places",
                    detail: "The number of significant digits to the right of the decimal point to retain.",
                },
            ],
        },
        QUOTIENT: {
            d: "Returns one number divided by another.",
            a: "One number divided by another.",
            p: [
                {
                    name: "dividend",
                    detail: "The number to be divided.",
                },
                {
                    name: "divisor",
                    detail: "The number to divide by.",
                },
            ],
        },
        POWER: {
            d: "Returns a number raised to a power.",
            a: "A number raised to a power.",
            p: [
                {
                    name: "base",
                    detail: "The number to raise to the `exponent` power.",
                },
                {
                    name: "exponent",
                    detail: "The exponent to raise `base` to.",
                },
            ],
        },
        SUMIFS: {
            d: "Returns the sum of a range depending on multiple criteria.",
            a: "Sums a range depending on multiple criteria.",
            p: [
                {
                    name: "sum_range",
                    detail: "The range to sum.",
                },
                {
                    name: "criteria_range1",
                    detail: "The range to check against criterion1.",
                },
                {
                    name: "criterion1",
                    detail: "The pattern or test to apply to criteria_range1.",
                },
                {
                    name: "criteria_range2",
                    detail: "Additional ranges to check.",
                },
            ],
        },
        GET_TARGET: {
            d: "Query target data.",
            a: "Query target data.",
            p: [],
        },
        GET_AIRTABLE_DATA: {
            d: "Query AirTable data.",
            a: "Query AirTable data.",
            p: [
                {
                    name: "AirTable url",
                    detail: "AirTable url address.",
                },
                {
                    name: "sort_column",
                    detail: "The index of the column in current AirTable view containing the values by which to sort.",
                },
                {
                    name: "is_ascending",
                    detail:
                        "[Optional] - 1 or 0 indicating whether to sort `sort_column` in ascending order. 0 sorts in descending order.1 sorts in ascending order.",
                },
            ],
        },
        ASK_AI: {
            d: "Ask the AI questions.",
            a: "Ask the AI questions.",
            p: [
                {
                    name: "question",
                    detail: "Consult AI for the data you want.",
                },
                {
                    name: "criteria_range",
                    detail: "In which range to process the data.",
                },
            ],
        },
        COUNTIFS: {
            d: "Returns the count of a range depending on multiple criteria.",
            a: "Count values depending on multiple criteria.",
            p: [
                {
                    name: "criteria_range1",
                    detail: "The range to check against `criterion1`.",
                },
                {
                    name: "criterion1",
                    detail: "The pattern or test to apply to `criteria_range1`.",
                },
                {
                    name: "criteria_range2",
                    detail: "Additional ranges to check.",
                },
            ],
        },
        PRODUCT: {
            d: "Returns the result of multiplying a series of numbers together.",
            a: "Result of multiplying a series of numbers together.",
            p: [
                {
                    name: "factor1",
                    detail: "The first number or range to calculate for the product.",
                },
                {
                    name: "factor2",
                    detail: "More numbers or ranges to calculate for the product.",
                },
            ],
        },
        HARMEAN: {
            d: "Calculates the harmonic mean of a dataset.",
            a: "The harmonic mean of a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the population.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the population.",
                },
            ],
        },
        HYPGEOMDIST: {
            d:
                "Calculates the probability of drawing a certain number of successes in a certain number of tries given a population of a certain size containing a certain number of successes, without replacement of draws.",
            a: "Hypergeometric distribution probability.",
            p: [
                {
                    name: "num_successes",
                    detail: "The desired number of successes.",
                },
                {
                    name: "num_draws",
                    detail: "The number of permitted draws.",
                },
                {
                    name: "successes_in_pop",
                    detail: "The total number of successes in the population.",
                },
                {
                    name: "pop_size",
                    detail: "The total size of the population",
                },
                {
                    name: "cumulative",
                    detail:
                        "Determine the logical value of the function form. \n\nIf cumulative is TRUE(), HYPGEOM.DIST returns the cumulative distribution function;\n\nif FALSE(), it returns the probability density function.",
                },
            ],
        },
        INTERCEPT: {
            d:
                "Calculates the y-value at which the line resulting from linear regression of a dataset will intersect the y-axis (x=0).",
            a: "Y-intercept of line derived via linear regression.",
            p: [
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        KURT: {
            d:
                'Calculates the kurtosis of a dataset, which describes the shape, and in particular the "peakedness" of that dataset.',
            a: "Kurtosis of a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the dataset.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the dataset.",
                },
            ],
        },
        LARGE: {
            d: "Returns the nth largest element from a data set, where n is user-defined.",
            a: "Nth largest element from a data set.",
            p: [
                {
                    name: "data",
                    detail: "Array or range containing the dataset to consider.",
                },
                {
                    name: "n",
                    detail: "The rank from largest to smallest of the element to return.",
                },
            ],
        },
        STDEVA: {
            d: "Calculates the standard deviation based on a sample, setting text to the value `0`.",
            a: "Standard deviation of sample (text as 0).",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the sample.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the sample.",
                },
            ],
        },
        STDEVP: {
            d: "Calculates the standard deviation based on an entire population.",
            a: "Standard deviation of an entire population.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the population.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the population.",
                },
            ],
        },
        GEOMEAN: {
            d: "Calculates the geometric mean of a dataset.",
            a: "The geometric mean of a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the population.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the population.",
                },
            ],
        },
        RANK_EQ: {
            d:
                "Returns the rank of a specified value in a dataset. If there is more than one entry of the same value in the dataset, the top rank of the entries will be returned.",
            a: "Top rank of a specified value in a dataset.",
            p: [
                {
                    name: "value",
                    detail: "The value whose rank will be determined.",
                },
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "is_ascending",
                    detail:
                        "Whether to consider the values in `data` in descending or ascending order. If omitted, the default is descending (FALSE).",
                },
            ],
        },
        RANK_AVG: {
            d:
                "Returns the rank of a specified value in a dataset. If there is more than one entry of the same value in the dataset, the average rank of the entries will be returned.",
            a: "Average rank of a specified value in a dataset.",
            p: [
                {
                    name: "value",
                    detail: "The value whose rank will be determined.",
                },
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "is_ascending",
                    detail:
                        "Whether to consider the values in `data` in descending or ascending order. If omitted, the default is descending (FALSE).",
                },
            ],
        },
        PERCENTRANK_EXC: {
            d: "Returns the percentage rank (percentile) from 0 to 1 exclusive of a specified value in a dataset.",
            a: "Percentage rank (percentile) from 0 to 1 exclusive.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "value",
                    detail: "The value whose percentage rank will be determined.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant figures to use in the calculation. Default is 3.",
                },
            ],
        },
        PERCENTRANK_INC: {
            d: "Returns the percentage rank (percentile) from 0 to 1 inclusive of a specified value in a dataset.",
            a: "Percentage rank (percentile) from 0 to 1 inclusive.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "value",
                    detail: "The value whose percentage rank will be determined.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant figures to use in the calculation. Default is 3.",
                },
            ],
        },
        FORECAST: {
            d: "Calculates the expected y-value for a specified x based on a linear regression of a dataset.",
            a: "Expected y-value based of linear regression.",
            p: [
                {
                    name: "x",
                    detail: "The value on the x-axis to forecast.",
                },
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        FISHERINV: {
            d: "Returns the inverse Fisher transformation of a specified value.",
            a: "Inverse fisher transformation of a specified value.",
            p: [
                {
                    name: "value",
                    detail: "The value for which to calculate the inverse Fisher transformation.",
                },
            ],
        },
        FISHER: {
            d: "Returns the Fisher transformation of a specified value.",
            a: "Fisher transformation of a specified value.",
            p: [
                {
                    name: "value",
                    detail: "The value for which to calculate the Fisher transformation.",
                },
            ],
        },
        MODE_SNGL: {
            d: "Returns the most commonly occurring value in a dataset.",
            a: "Most commonly occurring value in a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when calculating mode.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when calculating mode.",
                },
            ],
        },
        WEIBULL_DIST: {
            d:
                "Returns the value of the Weibull distribution function (or Weibull cumulative distribution function) for a specified shape and scale.",
            a: "Weibull distribution function.",
            p: [
                {
                    name: "x",
                    detail: "The input to the Weibull distribution function.",
                },
                {
                    name: "shape",
                    detail: "The shape parameter of the Weibull distribution function.",
                },
                {
                    name: "scale",
                    detail: "The scale parameter of the Weibull distribution function.",
                },
                {
                    name: "cumulative",
                    detail: "Whether to use the cumulative distribution function.",
                },
            ],
        },
        COUNT: {
            d: "Returns the number of numeric values in a dataset.",
            a: "The number of numeric values in dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when counting.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when counting.",
                },
            ],
        },
        COUNTA: {
            d: "Returns the number of values in a dataset.",
            a: "The number of values in a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when counting.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when counting.",
                },
            ],
        },
        AVEDEV: {
            d: "Calculates the average of the magnitudes of deviations of data from a dataset's mean.",
            a: "Average magnitude of deviations from mean.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the sample.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the sample.",
                },
            ],
        },
        AVERAGE: {
            d: "Returns the numerical average value in a dataset, ignoring text.",
            a: "Numerical average value in a dataset, ignoring text.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when calculating the average value.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when calculating the average value.",
                },
            ],
        },
        AVERAGEA: {
            d: "Returns the numerical average value in a dataset.",
            a: "Numerical average value in a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when calculating the average value.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when calculating the average value.",
                },
            ],
        },
        BINOM_DIST: {
            d:
                "Calculates the probability of drawing a certain number of successes (or a maximum number of successes) in a certain number of tries given a population of a certain size containing a certain number of successes, with replacement of draws.",
            a: "Binomial distribution probability.",
            p: [
                {
                    name: "num_successes",
                    detail: "The number of successes for which to calculate the probability in `num_trials` trials.",
                },
                {
                    name: "num_trials",
                    detail: "The number of independent trials.",
                },
                {
                    name: "prob_success",
                    detail: "The probability of success in any given trial.",
                },
                {
                    name: "cumulative",
                    detail: "Whether to use the binomial cumulative distribution.",
                },
            ],
        },
        BINOM_INV: {
            d:
                "Calculates the smallest value for which the cumulative binomial distribution is greater than or equal to a specified criteria.",
            a: "Inverse cumulative binomial distribution function.",
            p: [
                {
                    name: "num_trials",
                    detail: "The number of independent trials.",
                },
                {
                    name: "prob_success",
                    detail: "The probability of success in any given trial.",
                },
                {
                    name: "target_prob",
                    detail: "The desired threshold probability.",
                },
            ],
        },
        CONFIDENCE_NORM: {
            d: "Calculates the width of half the confidence interval for a normal distribution.",
            a: "Confidence interval for a normal distribution.",
            p: [
                {
                    name: "alpha",
                    detail: "One minus the desired confidence level. E.g. `0.1` for `0.9`, or 90%, confidence.",
                },
                {
                    name: "standard_deviation",
                    detail: "The standard deviation of the population.",
                },
                {
                    name: "pop_size",
                    detail: "The size of the population.",
                },
            ],
        },
        CORREL: {
            d: "Calculates r, the Pearson product-moment correlation coefficient of a dataset.",
            a: "Pearson Product-Moment Correlation Coefficient.",
            p: [
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        COVARIANCE_P: {
            d: "Calculates the covariance of a dataset.",
            a: "The covariance of a dataset.",
            p: [
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        COVARIANCE_S: {
            d: "Calculates the sample covariance of a dataset.",
            a: "The sample covariance of a dataset.",
            p: [
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        DEVSQ: {
            d: "Calculates the sum of squares of deviations based on a sample.",
            a: "The sum of squares of deviations based on a sample.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the sample.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the sample.",
                },
            ],
        },
        EXPON_DIST: {
            d:
                "Returns the value of the exponential distribution function with a specified lambda at a specified value.",
            a: "Exponential distribution function.",
            p: [
                {
                    name: "x",
                    detail: "The input to the exponential distribution function.",
                },
                {
                    name: "lambda",
                    detail: "The lambda to specify the exponential distribution function.",
                },
                {
                    name: "cumulative",
                    detail: "Whether to use the exponential cumulative distribution.",
                },
            ],
        },
        AVERAGEIF: {
            d: "Returns the average of a range depending on criteria.",
            a: "Average of values depending on criteria.",
            p: [
                {
                    name: "criteria_range",
                    detail: "The range to check against `criterion`.",
                },
                {
                    name: "criterion",
                    detail: "The pattern or test to apply to `criteria_range`.",
                },
                {
                    name: "average_range",
                    detail: "The range to average. If not included, `criteria_range` is used for the average instead.",
                },
            ],
        },
        AVERAGEIFS: {
            d: "Returns the average of a range depending on multiple criteria.",
            a: "Average of values depending on multiple criteria.",
            p: [
                {
                    name: "average_range",
                    detail: "The range to average.",
                },
                {
                    name: "criteria_range1",
                    detail: "The range to check against `criterion1`.",
                },
                {
                    name: "criterion1",
                    detail: "The pattern or test to apply to `criteria_range1`.",
                },
                {
                    name: "criteria_range2",
                    detail: "Additional ranges to check.",
                },
            ],
        },
        PERMUT: {
            d:
                "Returns the number of ways to choose some number of objects from a pool of a given size of objects, considering order.",
            a: "Number of permutations from a number of objects.",
            p: [
                {
                    name: "n",
                    detail: "The size of the pool of objects to choose from.",
                },
                {
                    name: "k",
                    detail: "The number of objects to choose.",
                },
            ],
        },
        TRIMMEAN: {
            d:
                "Calculates the mean of a dataset excluding some proportion of data from the high and low ends of the dataset.",
            a: "Mean of a dataset excluding high/low ends.",
            p: [
                {
                    name: "data",
                    detail: "Array or range containing the dataset to consider.",
                },
                {
                    name: "exclude_proportion",
                    detail: "The proportion of the dataset to exclude, from the extremities of the set.",
                },
            ],
        },
        PERCENTILE_EXC: {
            d: "Returns the value at a given percentile of a dataset exclusive of 0 and 1.",
            a: "Value at a given percentile of a dataset exclusive of 0 and 1.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "percentile",
                    detail:
                        "The percentile, exclusive of 0 and 1, whose value within 'data' will be calculated and returned.",
                },
            ],
        },
        PERCENTILE_INC: {
            d: "Returns the value at a given percentile of a dataset.",
            a: "Value at a given percentile of a dataset.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "percentile",
                    detail: "The percentile whose value within `data` will be calculated and returned.`",
                },
            ],
        },
        PEARSON: {
            d: "Calculates r, the Pearson product-moment correlation coefficient of a dataset.",
            a: "Pearson Product-Moment Correlation Coefficient.",
            p: [
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        NORM_S_INV: {
            d: "Returns the value of the inverse standard normal distribution function for a specified value.",
            a: "Inverse standard normal distribution function.",
            p: [
                {
                    name: "x",
                    detail: "The input to the inverse standard normal distribution function.",
                },
            ],
        },
        NORM_S_DIST: {
            d: "Returns the value of the standard normal cumulative distribution function for a specified value.",
            a: "Standard normal cumulative distribution function.",
            p: [
                {
                    name: "x",
                    detail: "The input to the standard normal cumulative distribution function.",
                },
                {
                    name: "cumulative",
                    detail:
                        "Determine the logical value of the function form. \n\nIf TRUE(), it returns the cumulative distribution function;\n\nIf it is FALSE(), it returns the probability density function.",
                },
            ],
        },
        NORM_INV: {
            d:
                "Returns the value of the inverse normal distribution function for a specified value, mean, and standard deviation.",
            a: "Inverse normal distribution function.",
            p: [
                {
                    name: "x",
                    detail: "The input to the inverse normal distribution function.",
                },
                {
                    name: "mean",
                    detail: "The mean (mu) of the normal distribution function.",
                },
                {
                    name: "standard_deviation",
                    detail: "The standard deviation (sigma) of the normal distribution function.",
                },
            ],
        },
        NORM_DIST: {
            d:
                "Returns the value of the normal distribution function (or normal cumulative distribution function) for a specified value, mean, and standard deviation.",
            a: "Normal distribution function.",
            p: [
                {
                    name: "x",
                    detail: "The input to the normal distribution function.",
                },
                {
                    name: "mean",
                    detail: "The mean (mu) of the normal distribution function.",
                },
                {
                    name: "standard_deviation",
                    detail: "The standard deviation (sigma) of the normal distribution function.",
                },
                {
                    name: "cumulative",
                    detail:
                        "Whether to use the normal cumulative distribution function rather than the distribution function.",
                },
            ],
        },
        NEGBINOM_DIST: {
            d:
                "Calculates the probability of drawing a certain number of failures before a certain number of successes given a probability of success in independent trials.",
            a: "Negative binomial distribution probability.",
            p: [
                {
                    name: "num_failures",
                    detail: "The number of failures to model.",
                },
                {
                    name: "num_successes",
                    detail: "The number of successes to model.",
                },
                {
                    name: "prob_success",
                    detail: "The probability of success in any given trial.",
                },
                {
                    name: "cumulative",
                    detail:
                        "Determine the logical value of the function form. \n\nIf TRUE(), it returns the cumulative distribution function;\n\nIf it is FALSE(), it returns the probability density function.",
                },
            ],
        },
        MINA: {
            d: "Returns the minimum numeric value in a dataset.",
            a: "Minimum numeric value in a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when calculating the minimum value.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when calculating the minimum value.",
                },
            ],
        },
        MIN: {
            d: "Returns the minimum value in a numeric dataset.",
            a: "Minimum value in a numeric dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when calculating the minimum value.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when calculating the minimum value.",
                },
            ],
        },
        MEDIAN: {
            d: "Returns the median value in a numeric dataset.",
            a: "Median value in a numeric dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when calculating the median value.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when calculating the median value.",
                },
            ],
        },
        MAXA: {
            d: "Returns the maximum numeric value in a dataset.",
            a: "Maximum numeric value in a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when calculating the maximum value.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when calculating the maximum value.",
                },
            ],
        },
        MAX: {
            d: "Returns the maximum value in a numeric dataset.",
            a: "Maximum value in a numeric dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range to consider when calculating the maximum value.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to consider when calculating the maximum value.",
                },
            ],
        },
        LOGNORM_INV: {
            d:
                "Returns the value of the inverse log-normal cumulative distribution with given mean and standard deviation at a specified value.",
            a: "Inverse log-normal cumulative distribution function.",
            p: [
                {
                    name: "x",
                    detail: "The input to the inverse log-normal cumulative distribution function.",
                },
                {
                    name: "mean",
                    detail: "The mean (mu) of the inverse log-normal cumulative distribution function.",
                },
                {
                    name: "standard_deviation",
                    detail:
                        "The standard deviation (sigma) of the inverse log-normal cumulative distribution function.",
                },
            ],
        },
        LOGNORM_DIST: {
            d:
                "Returns the value of the log-normal cumulative distribution with given mean and standard deviation at a specified value.",
            a: "Log-normal cumulative distribution probability.",
            p: [
                {
                    name: "x",
                    detail: "The input to the log-normal cumulative distribution function.",
                },
                {
                    name: "mean",
                    detail: "The mean (mu) of the log-normal cumulative distribution function.",
                },
                {
                    name: "standard_deviation",
                    detail: "The standard deviation (sigma) of the log-normal cumulative distribution function.",
                },
                {
                    name: "cumulative",
                    detail:
                        "Determine the logical value of the function form. \n\nIf TRUE(), it returns the cumulative distribution function;\n\nIf it is FALSE(), it returns the probability density function.",
                },
            ],
        },
        Z_TEST: {
            d: "Returns the one-tailed p-value of a Z-test with standard distribution.",
            a: "One-tailed p-value of a z-test.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "value",
                    detail: "The test statistic to use in the Z-test.",
                },
                {
                    name: "standard_deviation",
                    detail:
                        "The standard deviation to assume for the Z-test. If this is not provided, the standard deviation of the data will be used.",
                },
            ],
        },
        PROB: {
            d:
                "Given a set of values and corresponding probabilities, calculates the probability that a value chosen at random falls between two limits.",
            a: "Probability values lie in a range.",
            p: [
                {
                    name: "data",
                    detail: "Array or range containing the dataset to consider.",
                },
                {
                    name: "probabilities",
                    detail: "Array or range containing probabilities corresponding to `data`.",
                },
                {
                    name: "low_limit",
                    detail: "The lower bound on the value range for which to calculate the probability.",
                },
                {
                    name: "high_limit",
                    detail: "The upper bound on the value range for which to calculate the probability.",
                },
            ],
        },
        QUARTILE_EXC: {
            d: "Returns a value nearest to a specified quartile of a dataset exclusive of 0 and 4.",
            a: "Value nearest to a specific quartile of a dataset exclusive of 0 and 4.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "quartile_number",
                    detail: "Which quartile to return.",
                },
            ],
        },
        QUARTILE_INC: {
            d: "Returns a value nearest to a specified quartile of a dataset.",
            a: "Value nearest to a specific quartile of a dataset.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "quartile_number",
                    detail: "Which quartile value to return.",
                },
            ],
        },
        POISSON_DIST: {
            d:
                "Returns the value of the Poisson distribution function (or Poisson cumulative distribution function) for a specified value and mean.",
            a: "Poisson distribution function.",
            p: [
                {
                    name: "x",
                    detail: "The input to the Poisson distribution function.",
                },
                {
                    name: "mean",
                    detail: "The mean (mu) of the Poisson distribution function.",
                },
                {
                    name: "cumulative",
                    detail:
                        "Whether to use the Poisson cumulative distribution function rather than the distribution function.",
                },
            ],
        },
        RSQ: {
            d: "Calculates the square of r, the Pearson product-moment correlation coefficient of a dataset.",
            a: "Square of the correlation coefficient.",
            p: [
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        T_DIST: {
            d: "Calculates the left tail probability for a Student's t-distribution with a given input (x).",
            a: "The left-tailed Student's t-distribution",
            p: [
                {
                    name: "x",
                    detail: "The input to the t-distribution function.",
                },
                {
                    name: "degrees_freedom",
                    detail: "The number of degrees of freedom.",
                },
                {
                    name: "cumulative",
                    detail:
                        "If cumulative is TRUE, T.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.",
                },
            ],
        },
        T_DIST_2T: {
            d: "Calculates the probability for two tailed Student's t-distribution with a given input (x).",
            a: "The two tailed Student's t-distribution",
            p: [
                {
                    name: "x",
                    detail: "The input to the t-distribution function.",
                },
                {
                    name: "degrees_freedom",
                    detail: "The number of degrees of freedom.",
                },
            ],
        },
        T_DIST_RT: {
            d: "Calculates the right tail probability for a Student's t-distribution with a given input (x).",
            a: "The right-tailed Student's t-distribution",
            p: [
                {
                    name: "x",
                    detail: "The input to the t-distribution function.",
                },
                {
                    name: "degrees_freedom",
                    detail: "The number of degrees of freedom.",
                },
            ],
        },
        T_INV: {
            d: "Calculates the negative inverse of the one-tailed TDIST function.",
            a: "T.INV",
            p: [
                {
                    name: "probability",
                    detail: "The probability associated with the two-tailed t-distribution.",
                },
                {
                    name: "degrees_freedom",
                    detail: "The number of degrees of freedom.",
                },
            ],
        },
        T_INV_2T: {
            d: "Calculates the inverse of the two-tailed TDIST function.",
            a: "T.INV.2T",
            p: [
                {
                    name: "probability",
                    detail: "The probability associated with the two-tailed t-distribution.",
                },
                {
                    name: "degrees_freedom",
                    detail: "The number of degrees of freedom.",
                },
            ],
        },
        T_TEST: {
            d:
                "t-test. Returns the probability associated with Student's t-test. Determines whether two samples are likely to have come from the same two underlying populations that have the same mean.",
            a: "Returns the probability associated with t-test.",
            p: [
                {
                    name: "range1",
                    detail: "The first sample of data or group of cells to consider for the t-test.",
                },
                {
                    name: "range2",
                    detail: "The second sample of data or group of cells to consider for the t-test.",
                },
                {
                    name: "tails",
                    detail: "Specifies the number of distribution tails.",
                },
                {
                    name: "type",
                    detail: "Specifies the type of t-test.",
                },
            ],
        },
        F_DIST: {
            d:
                "Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input x. Alternately called Fisher-Snedecor distribution or Snedecor's F distribution.",
            a: "F probability distribution (left-tailed).",
            p: [
                {
                    name: "x",
                    detail:
                        "The input to the F probability distribution function. The value at which to evaluate the function.",
                },
                {
                    name: "degrees_freedom1",
                    detail: "The numerator of the number of degrees of freedom.",
                },
                {
                    name: "degrees_freedom2",
                    detail: "The denominator of the number of degrees of freedom.",
                },
                {
                    name: "cumulative",
                    detail: "Logical value that determines the form of the function.",
                },
            ],
        },
        F_DIST_RT: {
            d:
                "Calculates the right-tailed F probability distribution (degree of diversity) for two data sets with given input x. Alternately called Fisher-Snedecor distribution or Snedecor's F distribution.",
            a: "F probability distribution.",
            p: [
                {
                    name: "x",
                    detail:
                        "The input to the F probability distribution function. The value at which to evaluate the function.",
                },
                {
                    name: "degrees_freedom1",
                    detail: "The numerator of the number of degrees of freedom.",
                },
                {
                    name: "degrees_freedom2",
                    detail: "The denominator of the number of degrees of freedom.",
                },
            ],
        },
        VAR_P: {
            d: "Calculates the variance based on an entire population.",
            a: "Variance of entire population.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the population.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the population.",
                },
            ],
        },
        VAR_S: {
            d: "Calculates the variance based on a sample.",
            a: "Variance.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the sample.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the sample.",
                },
            ],
        },
        VARA: {
            d: "Calculates the variance based on a sample, setting text to the value `0`.",
            a: "Variance of sample (text as 0).",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the sample.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the sample.",
                },
            ],
        },
        VARPA: {
            d: "Calculates the variance based on an entire population, setting text to the value `0`.",
            a: "Variance of entire population (text as 0).",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the population.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the population.",
                },
            ],
        },
        STEYX: {
            d: "Calculates the standard error of the predicted y-value for each x in the regression of a dataset.",
            a: "Standard error of predicted y-values in regression.",
            p: [
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        STANDARDIZE: {
            d:
                "Calculates the normalized equivalent of a random variable given mean and standard deviation of the distribution.",
            a: "Normalized equivalent of a random variable.",
            p: [
                {
                    name: "value",
                    detail: "The value of the random variable to normalize.",
                },
                {
                    name: "mean",
                    detail: "The mean of the distribution.",
                },
                {
                    name: "standard_deviation",
                    detail: "The standard deviation of the distribution.",
                },
            ],
        },
        SMALL: {
            d: "Returns the nth smallest element from a data set, where n is user-defined.",
            a: "Nth smallest element in a data set.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the dataset to consider.",
                },
                {
                    name: "n",
                    detail: "The rank from smallest to largest of the element to return.",
                },
            ],
        },
        SLOPE: {
            d: "Calculates the slope of the line resulting from linear regression of a dataset.",
            a: "Slope of line from linear regression of data.",
            p: [
                {
                    name: "data_y",
                    detail: "The range representing the array or matrix of dependent data.",
                },
                {
                    name: "data_x",
                    detail: "The range representing the array or matrix of independent data.",
                },
            ],
        },
        SKEW: {
            d: "Calculates the skewness of a dataset, which describes the symmetry of that dataset about the mean.",
            a: "Skewness of a dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the dataset.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the dataset.",
                },
            ],
        },
        SKEW_P: {
            d:
                "Calculates the skewness of a dataset, which describes the symmetry of that dataset about the mean. This assumes the dataset is for the population.",
            a: "Skewness of a population's dataset.",
            p: [
                {
                    name: "value1",
                    detail: "The first value or range of the dataset.",
                },
                {
                    name: "value2",
                    detail: "Additional values or ranges to include in the dataset.",
                },
            ],
        },
        VLOOKUP: {
            d:
                "Vertical lookup. Searches down the first column of a range for a key and returns the value of a specified cell in the row found.",
            a: "Vertical lookup.",
            p: [
                {
                    name: "search_key",
                    detail: 'The value to search for. For example, `42`, `"Cats"`, or `I24`.',
                },
                {
                    name: "range",
                    detail:
                        "The range to consider for the search. The first column in the range is searched for the key specified in `search_key`.",
                },
                {
                    name: "index",
                    detail:
                        "The column index of the value to be returned, where the first column in `range` is numbered 1.",
                },
                {
                    name: "is_sorted",
                    detail:
                        "Indicates whether the column to be searched (the first column of the specified range) is sorted, in which case the closest match for `search_key` will be returned.",
                },
            ],
        },
        HLOOKUP: {
            d:
                "Horizontal lookup. Searches across the first row of a range for a key and returns the value of a specified cell in the column found.",
            a: "Horizontal lookup",
            p: [
                {
                    name: "search_key",
                    detail: 'The value to search for. For example, `42`, `"Cats"`, or `I24`.',
                },
                {
                    name: "range",
                    detail:
                        "The range to consider for the search. The first row in the range is searched for the key specified in `search_key`.",
                },
                {
                    name: "index",
                    detail: "The row index of the value to be returned, where the first row in `range` is numbered 1.",
                },
                {
                    name: "is_sorted",
                    detail:
                        "Indicates whether the row to be searched (the first row of the specified range) is sorted.",
                },
            ],
        },
        LOOKUP: {
            d:
                "Looks through a sorted row or column for a key and returns the value of the cell in a result range located in the same position as the search row or column.",
            a: "Look up a value.",
            p: [
                {
                    name: "search_key",
                    detail: 'The value to search for in the row or column. For example, `42`, `"Cats"`, or `I24`.',
                },
                {
                    name: "search_range|search_result_array",
                    detail:
                        "One method of using this function is to provide a single sorted row or column `search_range` to look through for the `search_key` with a second argument `result_range`. The other way is to combine these two arguments into one `search_result_array` where the first row or column is searched and a value is returned from the last row or column in the array. If `search_key` is not found, a non-exact match may be returned.",
                },
                {
                    name: "result_range",
                    detail:
                        "The range from which to return a result. The value returned corresponds to the location where `search_key` is found in `search_range`. This range must be only a single row or column and should not be used if using the `search_result_array` method.",
                },
            ],
        },
        ADDRESS: {
            d: "Returns a cell reference as a string.",
            a: "Cell reference as a string.",
            p: [
                {
                    name: "row",
                    detail: "The row number of the cell reference",
                },
                {
                    name: "column",
                    detail: "The column number (not name) of the cell reference. `A` is column number `1`.",
                },
                {
                    name: "absolute_relative_mode",
                    detail:
                        "An indicator of whether the reference is row/column absolute. `1` is row and column absolute (e.g. $A$1), `2` is row absolute and column relative (e.g. A$1), `3` is row relative and column absolute (e.g. $A1), and `4` is row and column relative (e.g. A1).",
                },
                {
                    name: "use_a1_notation",
                    detail:
                        "A boolean indicating whether to use `A1` style notation (TRUE) or `R1C1` style notation (FALSE).",
                },
                {
                    name: "sheet",
                    detail: "Text indicating the name of the sheet into which the address points.",
                },
            ],
        },
        INDIRECT: {
            d: "Returns a cell reference specified by a string.",
            a: "A cell reference specified by a string.",
            p: [
                {
                    name: "cell_reference_as_string",
                    detail: "A cell reference, written as a string with surrounding quotation marks.",
                },
                {
                    name: "is_A1_notation",
                    detail: "Indicates if the cell reference is in A1 notation (TRUE) or R1C1 notation (FALSE).",
                },
            ],
        },
        ROW: {
            d: "Returns the row number of a specified cell.",
            a: "Row number of a specified cell.",
            p: [
                {
                    name: "cell_reference",
                    detail: "The cell whose row number will be returned.",
                },
            ],
        },
        ROWS: {
            d: "Returns the number of rows in a specified array or range.",
            a: "Number of rows in a specified array or range.",
            p: [
                {
                    name: "range",
                    detail: "The range whose row count will be returned.",
                },
            ],
        },
        COLUMN: {
            d: "Returns the column number of a specified cell, with `A=1`.",
            a: "Column number of a specified cell.",
            p: [
                {
                    name: "cell_reference",
                    detail: "The cell whose column number will be returned. Column `A` corresponds to `1`.",
                },
            ],
        },
        COLUMNS: {
            d: "Returns the number of columns in a specified array or range.",
            a: "Number of columns in a specified array or range.",
            p: [
                {
                    name: "range",
                    detail: "The range whose column count will be returned.",
                },
            ],
        },
        OFFSET: {
            d:
                "Returns a range reference shifted a specified number of rows and columns from a starting cell reference.",
            a: "A range reference offset relative to a cell.",
            p: [
                {
                    name: "cell_reference",
                    detail: "The starting point from which to count the offset rows and columns.",
                },
                {
                    name: "offset_rows",
                    detail: "The number of rows to offset by.",
                },
                {
                    name: "offset_columns",
                    detail: "The number of columns to offset by.",
                },
                {
                    name: "height",
                    detail: "The height of the range to return starting at the offset target.",
                },
                {
                    name: "width",
                    detail: "The width of the range to return starting at the offset target.",
                },
            ],
        },
        MATCH: {
            d: "Returns the relative position of an item in a range that matches a specified value.",
            a: "Position of item in range that matches value.",
            p: [
                {
                    name: "search_key",
                    detail: 'The value to search for. For example, `42`, `"Cats"`, or `I24`.',
                },
                {
                    name: "range",
                    detail: "The one-dimensional array to be searched.",
                },
                {
                    name: "search_type",
                    detail:
                        "The search method. `1` (default) finds the largest value less than or equal to `search_key` when `range` is sorted in ascending order. `0` finds the exact value when `range` is unsorted. `-1` finds the smallest value greater than or equal to `search_key` when `range` is sorted in descending order.",
                },
            ],
        },
        INDEX: {
            d: "Returns the content of a cell, specified by row and column offset.",
            a: "Content of cell specified by row and column offset.",
            p: [
                {
                    name: "reference",
                    detail: "The array of cells to be offset into.",
                },
                {
                    name: "row",
                    detail: "The number of offset rows.",
                },
                {
                    name: "column",
                    detail: "The number of offset columns.",
                },
            ],
        },
        GETPIVOTDATA: {
            d:
                "Extracts an aggregated value from a pivot table that corresponds to the specified row and column headings.",
            a:
                "Extracts an aggregated value from a pivot table that corresponds to the specified row and column headings.",
            p: [
                {
                    name: "value_name",
                    detail: "The name of the value in the pivot table for which you want to get data.",
                },
                {
                    name: "any_pivot_table_cell",
                    detail: "Any reference to a cell in the desired pivot table (top corner recommended).",
                },
                {
                    name: "original_column",
                    detail: "The name of the column in the original data set (not the pivot table).",
                },
                {
                    name: "pivot_item",
                    detail:
                        "The name of the row or column shown in the pivot table corresponding to *original_column* that you want to retrieve.",
                },
            ],
        },
        CHOOSE: {
            d: "Returns an element from a list of choices based on index.",
            a: "An element from a list of choices based on index.",
            p: [
                {
                    name: "index",
                    detail: "Which choice (of the up to 30 provided) to return.",
                },
                {
                    name: "choice1",
                    detail:
                        "A potential value to return. Required. May be a reference to a cell or an individual value.",
                },
                {
                    name: "choice2",
                    detail: "Additional values among which to choose.",
                },
            ],
        },
        HYPERLINK: {
            d: "Creates a hyperlink inside a cell.",
            a: "Creates a hyperlink inside a cell.",
            p: [
                {
                    name: "url",
                    detail:
                        "The full URL of the link location enclosed in quotation marks, or a reference to a cell containing such a URL.",
                },
                {
                    name: "link_label",
                    detail:
                        "The text to display in the cell as the link, enclosed in quotation marks, or a reference to a cell containing such a label.",
                },
            ],
        },
        TIME: {
            d: "Converts a provided hour, minute, and second into a time.",
            a: "Converts hour/minute/second into a time.",
            p: [
                {
                    name: "hour",
                    detail: "The hour component of the time.",
                },
                {
                    name: "minute",
                    detail: "The minute component of the time.",
                },
                {
                    name: "second",
                    detail: "The second component of the time.",
                },
            ],
        },
        TIMEVALUE: {
            d: "Returns the fraction of a 24-hour day the time represents.",
            a: "Converts a time string into its serial number representation.",
            p: [
                {
                    name: "time_string",
                    detail: "The string that holds the time representation.",
                },
            ],
        },
        EOMONTH: {
            d:
                "Returns a date on the last day of a month that falls a specified number of months before or after another date.",
            a: "Last day of a month before or after a date.",
            p: [
                {
                    name: "start_date",
                    detail: "The date from which to calculate the result.",
                },
                {
                    name: "months",
                    detail: "The number of months before (negative) or after (positive) 'start_date' to consider.",
                },
            ],
        },
        EDATE: {
            d: "Returns a date a specified number of months before or after another date.",
            a: "Date a number of months before/after another date.",
            p: [
                {
                    name: "start_date",
                    detail: "The date from which to calculate the result.",
                },
                {
                    name: "months",
                    detail: "The number of months before (negative) or after (positive) 'start_date' to calculate.",
                },
            ],
        },
        SECOND: {
            d: "Returns the second component of a specific time, in numeric format.",
            a: "Second component of a specific time.",
            p: [
                {
                    name: "time",
                    detail: "The time from which to calculate the second component",
                },
            ],
        },
        MINUTE: {
            d: "Returns the minute component of a specific time, in numeric format.",
            a: "Minute component of a specific time.",
            p: [
                {
                    name: "time",
                    detail: "The time from which to calculate the minute component.",
                },
            ],
        },
        HOUR: {
            d: "Returns the hour component of a specific time, in numeric format.",
            a: "Hour component of a specific time.",
            p: [
                {
                    name: "time",
                    detail: "The time from which to calculate the hour component.",
                },
            ],
        },
        NOW: {
            d: "Returns the current date and time as a date value.",
            a: "Current date and time as a date value.",
            p: [],
        },
        NETWORKDAYS: {
            d: "Returns the number of net working days between two provided days.",
            a: "Net working days between two provided days.",
            p: [
                {
                    name: "start_date",
                    detail: "The start date of the period from which to calculate the number of net working days.",
                },
                {
                    name: "end_date",
                    detail: "The end date of the period from which to calculate the number of net working days.",
                },
                {
                    name: "holidays",
                    detail: "A range or array constant containing the date serial numbers to consider holidays.",
                },
            ],
        },
        NETWORKDAYS_INTL: {
            d:
                "Returns the number of net working days between two provided days excluding specified weekend days and holidays.",
            a: "Net working days between two dates (specifying weekends).",
            p: [
                {
                    name: "start_date",
                    detail: "The start date of the period from which to calculate the number of net working days.",
                },
                {
                    name: "end_date",
                    detail: "The end date of the period from which to calculate the number of net working days.",
                },
                {
                    name: "weekend",
                    detail: "A number or string representing which days of the week are considered weekends.",
                },
                {
                    name: "holidays",
                    detail: "A range or array constant containing the dates to consider as holidays.",
                },
            ],
        },
        ISOWEEKNUM: {
            d: "Returns a number representing the ISO week of the year where the provided date falls.",
            a: "ISO week number of the year.",
            p: [
                {
                    name: "date",
                    detail:
                        "The date for which to determine the ISO week number. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
            ],
        },
        WEEKNUM: {
            d: "Returns a number representing the week of the year where the provided date falls.",
            a: "Week number of the year.",
            p: [
                {
                    name: "date",
                    detail:
                        "The date for which to determine the week number. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
                {
                    name: "type",
                    detail: "A number representing the day that a week starts on. Sunday = 1.",
                },
            ],
        },
        WEEKDAY: {
            d: "Returns a number representing the day of the week of the date provided.",
            a: "Day of the week of the date provided (as number).",
            p: [
                {
                    name: "date",
                    detail:
                        "The date for which to determine the day of the week. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
                {
                    name: "type",
                    detail:
                        "A number indicating which numbering system to use to represent weekdays. By default, counts starting with Sunday = 1.",
                },
            ],
        },
        DAY: {
            d: "Returns the day of the month that a specific date falls on, in numeric format.",
            a: "Day of the month that a specific date falls on.",
            p: [
                {
                    name: "date",
                    detail: "The date from which to extract the day.",
                },
            ],
        },
        DAYS: {
            d: "Returns the number of days between two dates.",
            a: "Number of days between two dates.",
            p: [
                {
                    name: "end_date",
                    detail: "The end of the date range.",
                },
                {
                    name: "start_date",
                    detail: "The start of the date range.",
                },
            ],
        },
        DAYS360: {
            d:
                "Returns the difference between two days based on the 360 day year used in some financial interest calculations.",
            a: "Days between two dates on a 360-day year.",
            p: [
                {
                    name: "start_date",
                    detail:
                        "The start date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
                {
                    name: "end_date",
                    detail:
                        "The end date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
                {
                    name: "method",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        DATE: {
            d: "Converts a provided year, month, and day into a date.",
            a: "Converts year/month/day into a date.",
            p: [
                {
                    name: "year",
                    detail: "The year component of the date.",
                },
                {
                    name: "month",
                    detail: "The month component of the date.",
                },
                {
                    name: "day",
                    detail: "The day component of the date.",
                },
            ],
        },
        DATEVALUE: {
            d: "Converts a provided date string in a known format to a date value.",
            a: "Converts a date string to a date value.",
            p: [
                {
                    name: "date_string",
                    detail: "The string representing the date.",
                },
            ],
        },
        DATEDIF: {
            d: "Calculates the number of days, months, or years between two dates.",
            a: "Date Difference.",
            p: [
                {
                    name: "start_date",
                    detail:
                        "The start date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
                {
                    name: "end_date",
                    detail:
                        "The end date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
                {
                    name: "unit",
                    detail:
                        'A string abbreviation for unit of time. For example, "M" for month. Accepted values are "Y","M","D","MD","YM","YD".',
                },
            ],
        },
        WORKDAY: {
            d: "Calculates the date after a number of working days from a specified start date.",
            a: "Number of working days from start date.",
            p: [
                {
                    name: "start_date",
                    detail: "The date from which to begin counting.",
                },
                {
                    name: "num_days",
                    detail: "The number of working days to advance from `start_date`. If negative, counts backwards.",
                },
                {
                    name: "holidays",
                    detail: "A range or array constant containing the dates to consider holidays.",
                },
            ],
        },
        WORKDAY_INTL: {
            d:
                "Calculates the date after a specified number of workdays excluding specified weekend days and holidays.",
            a: "Date after a number of workdays (specifying weekends).",
            p: [
                {
                    name: "start_date",
                    detail: "The date from which to begin counting.",
                },
                {
                    name: "num_days",
                    detail: "The number of working days to advance from `start_date`. If negative, counts backwards.",
                },
                {
                    name: "weekend",
                    detail: "A number or string representing which days of the week are considered weekends.",
                },
                {
                    name: "holidays",
                    detail: "A range or array constant containing the dates to consider holidays.",
                },
            ],
        },
        YEAR: {
            d: "Returns the year specified by a given date.",
            a: "Year specified by a given date.",
            p: [
                {
                    name: "date",
                    detail: "The date from which to extract the year.",
                },
            ],
        },
        YEARFRAC: {
            d:
                "Returns the number of years, including fractional years, between two dates using a specified day count convention.",
            a: "Exact number of years between two dates.",
            p: [
                {
                    name: "start_date",
                    detail:
                        "The start date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
                {
                    name: "end_date",
                    detail:
                        "The end date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number.",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        TODAY: {
            d: "Returns the current date as a date value.",
            a: "Current date as a date value.",
            p: [],
        },
        MONTH: {
            d: "Returns the month of the year a specific date falls in, in numeric format.",
            a: "Month of the year a specific date falls in.",
            p: [
                {
                    name: "date",
                    detail: "The date from which to extract the month.",
                },
            ],
        },
        EFFECT: {
            d:
                "Calculates the annual effective interest rate given the nominal rate and number of compounding periods per year.",
            a: "Annual effective interest rate.",
            p: [
                {
                    name: "nominal_rate",
                    detail: "The nominal interest rate per year.",
                },
                {
                    name: "periods_per_year",
                    detail: "The number of compounding periods per year.",
                },
            ],
        },
        DOLLAR: {
            d: "Formats a number into the currency specific to your spreadsheet locale.",
            a: "Formats a number as currency specific to your spreadsheet locale.",
            p: [
                {
                    name: "number",
                    detail: "The value to be formatted.",
                },
                {
                    name: "number_of_places",
                    detail: "The number of decimal places to display.",
                },
            ],
        },
        DOLLARDE: {
            d: "Converts a price quotation given as a decimal fraction into a decimal value.",
            a: "Converts a decimal fraction to decimal value.",
            p: [
                {
                    name: "fractional_price",
                    detail: "The price quotation given using fractional decimal conventions.",
                },
                {
                    name: "unit",
                    detail: "The units of the fraction, e.g. `8` for 1/8ths or `32` for 1/32nds.",
                },
            ],
        },
        DOLLARFR: {
            d: "Converts a price quotation given as a decimal value into a decimal fraction.",
            a: "Converts a decimal value to decimal fraction.",
            p: [
                {
                    name: "decimal_price",
                    detail: "The price quotation given as a decimal value.",
                },
                {
                    name: "unit",
                    detail: "The units of the desired fraction, e.g. `8` for 1/8ths or `32` for 1/32nds.",
                },
            ],
        },
        DB: {
            d:
                "Calculates the depreciation of an asset for a specified period using the arithmetic declining balance method.",
            a: "Depreciation via declining balance method.",
            p: [
                {
                    name: "cost",
                    detail: "The initial cost of the asset.",
                },
                {
                    name: "salvage",
                    detail: "The value of the asset at the end of depreciation.",
                },
                {
                    name: "life",
                    detail: "The number of periods over which the asset is depreciated.",
                },
                {
                    name: "period",
                    detail: "The single period within `life` for which to calculate depreciation.",
                },
                {
                    name: "month",
                    detail: "The number of months in the first year of depreciation.",
                },
            ],
        },
        DDB: {
            d:
                "Calculates the depreciation of an asset for a specified period using the double-declining balance method.",
            a: "Depreciation via double-declining balance method.",
            p: [
                {
                    name: "cost",
                    detail: "The initial cost of the asset.",
                },
                {
                    name: "salvage",
                    detail: "The value of the asset at the end of depreciation.",
                },
                {
                    name: "life",
                    detail: "The number of periods over which the asset is depreciated.",
                },
                {
                    name: "period",
                    detail: "The single period within `life` for which to calculate depreciation.",
                },
                {
                    name: "factor",
                    detail: "The factor by which depreciation decreases.",
                },
            ],
        },
        RATE: {
            d:
                "Calculates the interest rate of an annuity investment based on constant-amount periodic payments and the assumption of a constant interest rate.",
            a: "Interest rate of an annuity investment.",
            p: [
                {
                    name: "number_of_periods",
                    detail: "The number of payments to be made.",
                },
                {
                    name: "payment_per_period",
                    detail: "The amount per period to be paid.",
                },
                {
                    name: "present_value",
                    detail: "The current value of the annuity.",
                },
                {
                    name: "future_value",
                    detail: "The future value remaining after the final payment has been made.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
                {
                    name: "rate_guess",
                    detail: "An estimate for what the interest rate will be.",
                },
            ],
        },
        CUMPRINC: {
            d:
                "Calculates the cumulative principal paid over a range of payment periods for an investment based on constant-amount periodic payments and a constant interest rate.",
            a: "Cumulative principal paid over a set of periods.",
            p: [
                {
                    name: "rate",
                    detail: "The interest rate.",
                },
                {
                    name: "number_of_periods",
                    detail: "The number of payments to be made.",
                },
                {
                    name: "present_value",
                    detail: "The current value of the annuity.",
                },
                {
                    name: "first_period",
                    detail: "The number of the payment period to begin the cumulative calculation.",
                },
                {
                    name: "last_period",
                    detail: "The number of the payment period to end the cumulative calculation.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
            ],
        },
        COUPNUM: {
            d:
                "Calculates the number of coupons, or interest payments, between the settlement date and the maturity date of the investment.",
            a: "Number of coupons between settlement and maturity.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        SYD: {
            d: "Calculates the depreciation of an asset for a specified period using the sum of years digits method.",
            a: "Depreciation via sum of years digits method.",
            p: [
                {
                    name: "cost",
                    detail: "The initial cost of the asset.",
                },
                {
                    name: "salvage",
                    detail: "The value of the asset at the end of depreciation.",
                },
                {
                    name: "life",
                    detail: "The number of periods over which the asset is depreciated.",
                },
                {
                    name: "period",
                    detail: "The single period within `life` for which to calculate depreciation.",
                },
            ],
        },
        TBILLEQ: {
            d: "Calculates the equivalent annualized rate of return of a US Treasury Bill based on discount rate.",
            a: "Equivalent rate of return for a Treasury bill.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "discount",
                    detail: "The discount rate of the bill at time of purchase.",
                },
            ],
        },
        TBILLYIELD: {
            d: "Calculates the yield of a US Treasury Bill based on price.",
            a: "The yield of a us treasury bill based on price.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "price",
                    detail: "The price at which the security is bought per 100 face value.",
                },
            ],
        },
        TBILLPRICE: {
            d: "Calculates the price of a US Treasury Bill based on discount rate.",
            a: "Price of US treasury bill.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "discount",
                    detail: "The discount rate of the bill at time of purchase.",
                },
            ],
        },
        PV: {
            d:
                "Calculates the present value of an annuity investment based on constant-amount periodic payments and a constant interest rate.",
            a: "Present value of an annuity investment.",
            p: [
                {
                    name: "rate",
                    detail: "The interest rate.",
                },
                {
                    name: "number_of_periods",
                    detail: "The number of payments to be made.",
                },
                {
                    name: "payment_amount",
                    detail: "The amount per period to be paid.",
                },
                {
                    name: "future_value",
                    detail: "The future value remaining after the final payment has been made.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
            ],
        },
        ACCRINT: {
            d: "Calculates the accrued interest of a security that has periodic payments.",
            a: "Accrued interest of security with periodic payments.",
            p: [
                {
                    name: "issue",
                    detail: "The date the security was initially issued.",
                },
                {
                    name: "first_payment",
                    detail: "The first date interest will be paid.",
                },
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "rate",
                    detail: "The annualized rate of interest.",
                },
                {
                    name: "redemption",
                    detail: "The redemption amount per 100 face value, or par.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
                {
                    name: "calc_method",
                    detail:
                        "[Optional-defaults to TRUE()] - A logical value that specifies the method used to calculate the total accrued interest when the settlement date is later than the first interest accrual date. \n\nIf the value is TRUE, the total accrued interest from the issue date to the settlement date is returned. \n\nIf the value is FALSE, return the accrued interest from the first interest accrual date to the settlement date.",
                },
            ],
        },
        ACCRINTM: {
            d: "Calculates the accrued interest of a security that pays interest at maturity.",
            a: "Accrued interest of security paying at maturity.",
            p: [
                {
                    name: "issue",
                    detail: "The date the security was initially issued.",
                },
                {
                    name: "maturity",
                    detail: "The maturity date of the security.",
                },
                {
                    name: "rate",
                    detail: "The annualized rate of interest.",
                },
                {
                    name: "redemption",
                    detail: "The redemption amount per 100 face value, or par.",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        COUPDAYBS: {
            d: "Calculates the number of days from the first coupon, or interest payment, until settlement.",
            a: "Number of days from first coupon to settlement.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        COUPDAYS: {
            d:
                "Calculates the number of days in the coupon, or interest payment, period that contains the specified settlement date.",
            a: "Days in coupon period containing settlement date.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        COUPDAYSNC: {
            d: "Calculates the number of days from the settlement date until the next coupon, or interest payment.",
            a: "Days from settlement until next coupon.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        COUPNCD: {
            d: "Calculates next coupon, or interest payment, date after the settlement date.",
            a: "Next coupon date after the settlement date.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        COUPPCD: {
            d: "Calculates last coupon, or interest payment, date before the settlement date.",
            a: "Last coupon date before settlement date.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        FV: {
            d:
                "Calculates the future value of an annuity investment based on constant-amount periodic payments and a constant interest rate.",
            a: "Future value of an annuity investment.",
            p: [
                {
                    name: "rate",
                    detail: "The interest rate.",
                },
                {
                    name: "number_of_periods",
                    detail: "The number of payments to be made.",
                },
                {
                    name: "payment_amount",
                    detail: "The amount per period to be paid.",
                },
                {
                    name: "present_value",
                    detail: "The current value of the annuity.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
            ],
        },
        FVSCHEDULE: {
            d:
                "Calculates the future value of some principal based on a specified series of potentially varying interest rates.",
            a: "Future value of principal from series of rates.",
            p: [
                {
                    name: "principal",
                    detail: "The amount of initial capital or value to compound against.",
                },
                {
                    name: "rate_schedule",
                    detail: "A series of interest rates to compound against the `principal`.",
                },
            ],
        },
        YIELD: {
            d:
                "Calculates the annual yield of a security paying periodic interest, such as a US Treasury Bond, based on price.",
            a: "Annual yield of a security paying periodic interest.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "rate",
                    detail: "The annualized rate of interest.",
                },
                {
                    name: "price",
                    detail: "The price at which the security is bought per 100 face value.",
                },
                {
                    name: "redemption",
                    detail: "The redemption amount per 100 face value, or par.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        YIELDDISC: {
            d: "Calculates the annual yield of a discount (non-interest-bearing) security, based on price.",
            a: "Annual yield of a discount security.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "price",
                    detail: "The price at which the security is bought per 100 face value.",
                },
                {
                    name: "redemption",
                    detail: "The redemption amount per 100 face value, or par.",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        NOMINAL: {
            d:
                "Calculates the annual nominal interest rate given the effective rate and number of compounding periods per year.",
            a: "Annual nominal interest rate.",
            p: [
                {
                    name: "effective_rate",
                    detail: "The effective interest rate per year.",
                },
                {
                    name: "periods_per_year",
                    detail: "The number of compounding periods per year.",
                },
            ],
        },
        XIRR: {
            d:
                "Calculates the internal rate of return of an investment based on a specified series of potentially irregularly spaced cash flows.",
            a: "Internal rate of return given non-periodic cashflows.",
            p: [
                {
                    name: "cashflow_amounts",
                    detail: "An array or range containing the income or payments associated with the investment.",
                },
                {
                    name: "cashflow_dates",
                    detail: "An array or range with dates corresponding to the cash flows in `cashflow_amounts`.",
                },
                {
                    name: "rate_guess",
                    detail: "An estimate for what the internal rate of return will be.",
                },
            ],
        },
        MIRR: {
            d:
                "Calculates the modified internal rate of return on an investment based on a series of periodic cash flows and the difference between the interest rate paid on financing versus the return received on reinvested income.",
            a: "Modified internal rate of return.",
            p: [
                {
                    name: "cashflow_amounts",
                    detail: "An array or range containing the income or payments associated with the investment.",
                },
                {
                    name: "financing_rate",
                    detail: "The interest rate paid on funds invested.",
                },
                {
                    name: "reinvestment_return_rate",
                    detail:
                        "The return (as a percentage) earned on reinvestment of income received from the investment.",
                },
            ],
        },
        IRR: {
            d: "Calculates the internal rate of return on an investment based on a series of periodic cash flows.",
            a: "Internal rate of return given periodic cashflows.",
            p: [
                {
                    name: "cashflow_amounts",
                    detail: "An array or range containing the income or payments associated with the investment.",
                },
                {
                    name: "rate_guess",
                    detail: "An estimate for what the internal rate of return will be.",
                },
            ],
        },
        NPV: {
            d:
                "Calculates the net present value of an investment based on a series of periodic cash flows and a discount rate.",
            a: "The net present value of an investment based on a series of periodic cash flows and a discount rate.",
            p: [
                {
                    name: "discount",
                    detail: "The discount rate of the investment over one period.",
                },
                {
                    name: "cashflow1",
                    detail: "The first future cash flow.",
                },
                {
                    name: "cashflow2",
                    detail: "Additional future cash flows.",
                },
            ],
        },
        XNPV: {
            d:
                "Calculates the net present value of an investment based on a specified series of potentially irregularly spaced cash flows and a discount rate.",
            a: "Net present value given non-periodic cashflows.",
            p: [
                {
                    name: "discount",
                    detail: "The discount rate of the investment over one period.",
                },
                {
                    name: "cashflow_amounts",
                    detail: "A range of cells containing the income or payments associated with the investment.",
                },
                {
                    name: "cashflow_dates",
                    detail: "A range of cells with dates corresponding to the cash flows in `cashflow_amounts`.",
                },
            ],
        },
        CUMIPMT: {
            d:
                "Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount periodic payments and a constant interest rate.",
            a: "Cumulative interest paid over a set of periods.",
            p: [
                {
                    name: "rate",
                    detail: "The interest rate.",
                },
                {
                    name: "number_of_periods",
                    detail: "The number of payments to be made.",
                },
                {
                    name: "present_value",
                    detail: "The current value of the annuity.",
                },
                {
                    name: "first_period",
                    detail: "The number of the payment period to begin the cumulative calculation.",
                },
                {
                    name: "last_period",
                    detail: "The number of the payment period to end the cumulative calculation.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
            ],
        },
        PMT: {
            d:
                "Calculates the periodic payment for an annuity investment based on constant-amount periodic payments and a constant interest rate.",
            a: "Periodic payment for an annuity investment.",
            p: [
                {
                    name: "rate",
                    detail: "The interest rate.",
                },
                {
                    name: "number_of_periods",
                    detail: "The number of payments to be made.",
                },
                {
                    name: "present_value",
                    detail: "The current value of the annuity.",
                },
                {
                    name: "future_value",
                    detail: "The future value remaining after the final payment has been made.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
            ],
        },
        IPMT: {
            d:
                "Calculates the payment on interest for an investment based on constant-amount periodic payments and a constant interest rate.",
            a: "Payment on interest for an investment.",
            p: [
                {
                    name: "rate",
                    detail: "The interest rate.",
                },
                {
                    name: "period",
                    detail: "The amortization period, in terms of number of periods.",
                },
                {
                    name: "number_of_periods",
                    detail: "The number of payments to be made.",
                },
                {
                    name: "present_value",
                    detail: "The current value of the annuity.",
                },
                {
                    name: "future_value",
                    detail: "The future value remaining after the final payment has been made.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
            ],
        },
        PPMT: {
            d:
                "Calculates the payment on the principal of an investment based on constant-amount periodic payments and a constant interest rate.",
            a: "Payment on the principal of an investment.",
            p: [
                {
                    name: "rate",
                    detail: "The interest rate.",
                },
                {
                    name: "period",
                    detail: "The amortization period, in terms of number of periods.",
                },
                {
                    name: "number_of_periods",
                    detail: "The number of payments to be made.",
                },
                {
                    name: "present_value",
                    detail: "The current value of the annuity.",
                },
                {
                    name: "future_value",
                    detail: "The future value remaining after the final payment has been made.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
            ],
        },
        INTRATE: {
            d:
                "Calculates the effective interest rate generated when an investment is purchased at one price and sold at another with no interest or dividends generated by the investment itself.",
            a: "Calculates effective interest rate.",
            p: [
                {
                    name: "buy_date",
                    detail: "The date of purchase of the investment.",
                },
                {
                    name: "sell_date",
                    detail: "The date of sale of the investment.",
                },
                {
                    name: "buy_price",
                    detail: "The price at which the investment was purchased.",
                },
                {
                    name: "sell_price",
                    detail: "The price at which the investment was sold.",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        PRICE: {
            d:
                "Calculates the price of a security paying periodic interest, such as a US Treasury Bond, based on expected yield.",
            a: "Price of a security paying periodic interest.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "rate",
                    detail: "The annualized rate of interest.",
                },
                {
                    name: "yield",
                    detail: "The expected annual yield of the security.",
                },
                {
                    name: "redemption",
                    detail: "The redemption amount per 100 face value, or par.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        PRICEDISC: {
            d: "Calculates the price of a discount (non-interest-bearing) security, based on expected yield.",
            a: "Price of a discount security.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "discount",
                    detail: "The discount rate of the security at time of purchase.",
                },
                {
                    name: "redemption",
                    detail: "The redemption amount per 100 face value, or par.",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        PRICEMAT: {
            d: "Calculates the price of a security paying interest at maturity, based on expected yield.",
            a: "Price of security paying interest at maturity.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "issue",
                    detail: "The date the security was initially issued.",
                },
                {
                    name: "rate",
                    detail: "The annualized rate of interest.",
                },
                {
                    name: "yield",
                    detail: "The expected annual yield of the security.",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        RECEIVED: {
            d:
                "Calculates the amount received at maturity for an investment in fixed-income securities purchased on a given date.",
            a: "Amount received at maturity for a security.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "investment",
                    detail: "The amount invested (irrespective of face value of each security).",
                },
                {
                    name: "discount",
                    detail: "The discount rate of the security invested in.",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        DISC: {
            d: "Calculates the discount rate of a security based on price.",
            a: "The discount rate of a security based on price.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "price",
                    detail: "The price at which the security is bought per 100 face value.",
                },
                {
                    name: "redemption",
                    detail: "The redemption amount per 100 face value, or par.",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        NPER: {
            d:
                "Calculates the number of payment periods for an investment based on constant-amount periodic payments and a constant interest rate.",
            a: "Number of payment periods for an investment.",
            p: [
                {
                    name: "rate",
                    detail: "The interest rate.",
                },
                {
                    name: "payment_amount",
                    detail: "The amount of each payment made.",
                },
                {
                    name: "present_value",
                    detail: "The current value of the annuity.",
                },
                {
                    name: "future_value",
                    detail: "The future value remaining after the final payment has been made.",
                },
                {
                    name: "end_or_beginning",
                    detail: "Whether payments are due at the end (`0`) or beginning (`1`) of each period.",
                },
            ],
        },
        SLN: {
            d: "Calculates the depreciation of an asset for one period using the straight-line method.",
            a: "Depreciation of asset using the straight-line method.",
            p: [
                {
                    name: "cost",
                    detail: "The initial cost of the asset.",
                },
                {
                    name: "salvage",
                    detail: "The value of the asset at the end of depreciation.",
                },
                {
                    name: "life",
                    detail: "The number of periods over which the asset is depreciated.",
                },
            ],
        },
        DURATION: {
            d:
                "Calculates the number of compounding periods required for an investment of a specified present value appreciating at a given rate to reach a target value.",
            a: "Number of periods for an investment to reach a value.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "rate",
                    detail: "The annualized rate of interest.",
                },
                {
                    name: "yield",
                    detail: "The expected annual yield of the security.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        MDURATION: {
            d:
                "Calculates the modified Macaulay duration of a security paying periodic interest, such as a US Treasury Bond, based on expected yield.",
            a: "Modified Macaulay duration.",
            p: [
                {
                    name: "settlement",
                    detail:
                        "The settlement date of the security, the date after issuance when the security is delivered to the buyer.",
                },
                {
                    name: "maturity",
                    detail: "The maturity or end date of the security, when it can be redeemed at face, or par value.",
                },
                {
                    name: "rate",
                    detail: "The annualized rate of interest.",
                },
                {
                    name: "yield",
                    detail: "The expected annual yield of the security.",
                },
                {
                    name: "frequency",
                    detail: "The number of interest or coupon payments per year (1, 2, or 4).",
                },
                {
                    name: "day_count_convention",
                    detail: "An indicator of what day count method to use.",
                },
            ],
        },
        BIN2DEC: {
            d: "Converts a signed binary number to decimal format.",
            a: "Converts a signed binary number to decimal format.",
            p: [
                {
                    name: "signed_binary_number",
                    detail: "The signed 10-bit binary value to be converted to decimal, provided as a string.",
                },
            ],
        },
        BIN2HEX: {
            d: "Converts a signed binary number to signed hexadecimal format.",
            a: "Converts a binary number to hexadecimal.",
            p: [
                {
                    name: "signed_binary_number",
                    detail:
                        "The signed 10-bit binary value to be converted to signed hexademical, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        BIN2OCT: {
            d: "Converts a signed binary number to signed octal format.",
            a: "Converts a binary number to octal.",
            p: [
                {
                    name: "signed_binary_number",
                    detail: "The signed 10-bit binary value to be converted to signed octal, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        DEC2BIN: {
            d: "Converts a decimal number to signed binary format.",
            a: "Converts a decimal number to signed binary format.",
            p: [
                {
                    name: "decimal_number",
                    detail: "The decimal value to be converted to signed binary, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        DEC2HEX: {
            d: "Converts a decimal number to signed hexadecimal format.",
            a: "Converts a decimal number to hexadecimal.",
            p: [
                {
                    name: "decimal_number",
                    detail: "The decimal value to be converted to signed hexadecimal, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        DEC2OCT: {
            d: "Converts a decimal number to signed octal format.",
            a: "Converts a decimal number to signed octal format.",
            p: [
                {
                    name: "decimal_number",
                    detail: "The decimal value to be converted to signed octal, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        HEX2BIN: {
            d: "Converts a signed hexadecimal number to signed binary format.",
            a: "Converts a hexadecimal number to binary.",
            p: [
                {
                    name: "signed_hexadecimal_number",
                    detail:
                        "The signed 40-bit hexadecimal value to be converted to signed binary, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        HEX2DEC: {
            d: "Converts a signed hexadecimal number to decimal format.",
            a: "Converts a hexadecimal number to decimal.",
            p: [
                {
                    name: "signed_hexadecimal_number",
                    detail: "The signed 40-bit hexadecimal value to be converted to decimal, provided as a string.",
                },
            ],
        },
        HEX2OCT: {
            d: "Converts a signed hexadecimal number to signed octal format.",
            a: "Converts a hexadecimal number to octal.",
            p: [
                {
                    name: "signed_hexadecimal_number",
                    detail:
                        "The signed 40-bit hexadecimal value to be converted to signed octal, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        OCT2BIN: {
            d: "Converts a signed octal number to signed binary format.",
            a: "Converts an octal number to binary.",
            p: [
                {
                    name: "signed_octal_number",
                    detail: "The signed 30-bit octal value to be converted to signed binary, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        OCT2DEC: {
            d: "Converts a signed octal number to decimal format.",
            a: "Converts a signed octal number to decimal format.",
            p: [
                {
                    name: "signed_octal_number",
                    detail: "The signed 30-bit octal value to be converted to decimal, provided as a string.",
                },
            ],
        },
        OCT2HEX: {
            d: "Converts a signed octal number to signed hexadecimal format.",
            a: "Converts an octal number to hexadecimal.",
            p: [
                {
                    name: "signed_octal_number",
                    detail:
                        "The signed 30-bit octal value to be converted to signed hexadecimal, provided as a string.",
                },
                {
                    name: "significant_digits",
                    detail: "The number of significant digits to ensure in the result.",
                },
            ],
        },
        COMPLEX: {
            d: "Creates a complex number given real and imaginary coefficients.",
            a: "Creates a complex number.",
            p: [
                {
                    name: "real_part",
                    detail: "The real coefficient.",
                },
                {
                    name: "imaginary_part",
                    detail: "The imaginary coefficient.",
                },
                {
                    name: "suffix",
                    detail:
                        "The suffix for the imaginary coefficient, can only be 'i' or 'j'. If omitted, 'i' will be used.",
                },
            ],
        },
        IMREAL: {
            d: "Returns the real coefficient of a complex number.",
            a: "The real coefficient of a complex number.",
            p: [
                {
                    name: "complex_number",
                    detail: "The complex number, in the a+bi or a+bj format.",
                },
            ],
        },
        IMAGINARY: {
            d: "Returns the imaginary coefficient of a complex number.",
            a: "The imaginary coefficient of a complex number.",
            p: [
                {
                    name: "complex_number",
                    detail: "The complex number, in the a+bi or a+bj format.",
                },
            ],
        },
        IMCONJUGATE: {
            d: "Returns the complex conjugate of a number.",
            a: "The complex conjugate of a number.",
            p: [
                {
                    name: "number",
                    detail: "The complex number to calculate the conjugate for.",
                },
            ],
        },
        IMABS: {
            d: "Returns absolute value (or modulus) of a complex number.",
            a: "The absolute value of a complex number.",
            p: [
                {
                    name: "number",
                    detail: "The complex number to calculate the absolute value of.",
                },
            ],
        },
        DELTA: {
            d: "Compare two numeric values, returning 1 if they're equal.",
            a: "Compare two numeric values.",
            p: [
                {
                    name: "number1",
                    detail: "The first number to compare.",
                },
                {
                    name: "number2",
                    detail: "The second number to compare.",
                },
            ],
        },
        IMSUM: {
            d: "Returns the sum of a series of complex numbers.",
            a: "Sum of a series of complex numbers.",
            p: [
                {
                    name: "value1",
                    detail: "The first complex number or range to add together.",
                },
                {
                    name: "value2",
                    detail: "Additional complex numbers or ranges to add to `value1`.",
                },
            ],
        },
        IMSUB: {
            d: "Returns the difference between two complex numbers.",
            a: "The difference between two complex numbers.",
            p: [
                {
                    name: "first_number",
                    detail: "The complex number to subtract second_number from.",
                },
                {
                    name: "second_number",
                    detail: "The complex number to subtract from first_number.",
                },
            ],
        },
        IMPRODUCT: {
            d: "Returns the result of multiplying a series of complex numbers together.",
            a: "Result of multiplying a series of complex numbers together.",
            p: [
                {
                    name: "factor1",
                    detail: "The first number or range to calculate for the product.",
                },
                {
                    name: "factor2",
                    detail: "Additional complex numbers or ranges to calculate for the product.",
                },
            ],
        },
        IMDIV: {
            d: "Returns one complex number divided by another.",
            a: "One complex number divided by another.",
            p: [
                {
                    name: "dividend",
                    detail: "The complex number to be divided.",
                },
                {
                    name: "divisor",
                    detail: "The complex number to divide by.",
                },
            ],
        },
        NOT: {
            d: "Returns the opposite of a logical value - `NOT(TRUE)` returns `FALSE`; `NOT(FALSE)` returns `TRUE`.",
            a: "Returns opposite of provided logical value.",
            p: [
                {
                    name: "logical_expression",
                    detail:
                        "An expression or reference to a cell holding an expression that represents some logical value.",
                },
            ],
        },
        TRUE: {
            d: "Returns the logical value `TRUE`.",
            a: "Logical value `true`.",
            p: [],
        },
        FALSE: {
            d: "Returns the logical value `FALSE`.",
            a: "Logical value `false`.",
            p: [],
        },
        AND: {
            d:
                "Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.",
            a: "Logical `and` operator.",
            p: [
                {
                    name: "logical_expression1",
                    detail:
                        "An expression or reference to a cell containing an expression that represents some logical value, i.e. `TRUE` or `FALSE`, or an expression that can be coerced to a logical value.",
                },
                {
                    name: "logical_expression2",
                    detail: "More expressions that represent logical values.",
                },
            ],
        },
        IFERROR: {
            d:
                "Returns the first argument if it is not an error value, otherwise returns the second argument if present, or a blank if the second argument is absent.",
            a: "Value if it is not an error, otherwise 2nd argument.",
            p: [
                {
                    name: "value",
                    detail: "The value to return if `value` itself is not an error.",
                },
                {
                    name: "value_if_error",
                    detail: "The value the function returns if `value` is an error.",
                },
            ],
        },
        IF: {
            d: "Returns one value if a logical expression is `TRUE` and another if it is `FALSE`.",
            a: "Returns value depending on logical expression.",
            p: [
                {
                    name: "logical_expression",
                    detail:
                        "An expression or reference to a cell containing an expression that represents some logical value, i.e. `TRUE` or `FALSE`.",
                },
                {
                    name: "value_if_true",
                    detail: "The value the function returns if `logical_expression` is `TRUE`.",
                },
                {
                    name: "value_if_false",
                    detail: "The value the function returns if `logical_expression` is `FALSE`.",
                },
            ],
        },
        OR: {
            d:
                "Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false.",
            a: "Logical `or` operator.",
            p: [
                {
                    name: "logical_expression1",
                    detail:
                        "An expression or reference to a cell containing an expression that represents some logical value, i.e. `TRUE` or `FALSE`, or an expression that can be coerced to a logical value.",
                },
                {
                    name: "logical_expression2",
                    detail: "More expressions that evaluate to logical values.",
                },
            ],
        },
        NE: {
            d:
                "Returns `TRUE` if two specified values are not equal and `FALSE` otherwise. Equivalent to the `!=` operator.",
            a: "Not equal.",
            p: [
                {
                    name: "value1",
                    detail: "The first value.",
                },
                {
                    name: "value2",
                    detail: "The value to test against `value1` for inequality.",
                },
            ],
        },
        EQ: {
            d:
                "Returns `TRUE` if two specified values are equal and `FALSE` otherwise. Equivalent to the `==` operator.",
            a: "Equal.",
            p: [
                {
                    name: "value1",
                    detail: "The first value.",
                },
                {
                    name: "value2",
                    detail: "The value to test against `value1` for equality.",
                },
            ],
        },
        GT: {
            d:
                "Returns `TRUE` if the first argument is strictly greater than the second, and `FALSE` otherwise. Equivalent to the `>` operator.",
            a: "Strictly greater than.",
            p: [
                {
                    name: "value1",
                    detail: "The value to test as being greater than `value2`.",
                },
                {
                    name: "value2",
                    detail: "The second value.",
                },
            ],
        },
        GTE: {
            d:
                "Returns `TRUE` if the first argument is greater than or equal to the second, and `FALSE` otherwise. Equivalent to the `>=` operator.",
            a: "Greater than or equal to.",
            p: [
                {
                    name: "value1",
                    detail: "The value to test as being greater than or equal to `value2`.",
                },
                {
                    name: "value2",
                    detail: "The second value.",
                },
            ],
        },
        LT: {
            d:
                "Returns `TRUE` if the first argument is strictly less than the second, and `FALSE` otherwise. Equivalent to the `<` operator.",
            a: "Less than.",
            p: [
                {
                    name: "value1",
                    detail: "The value to test as being less than `value2`.",
                },
                {
                    name: "value2",
                    detail: "The second value.",
                },
            ],
        },
        LTE: {
            d:
                "Returns `TRUE` if the first argument is less than or equal to the second, and `FALSE` otherwise. Equivalent to the `<=` operator.",
            a: "Less than or equal to.",
            p: [
                {
                    name: "value1",
                    detail: "The value to test as being less than or equal to `value2`.",
                },
                {
                    name: "value2",
                    detail: "The second value.",
                },
            ],
        },
        ADD: {
            d: "Returns the sum of two numbers. Equivalent to the `+` operator.",
            a: "Sum of two numbers",
            p: [
                {
                    name: "value1",
                    detail: "The first addend.",
                },
                {
                    name: "value2",
                    detail: "The second addend.",
                },
            ],
        },
        MINUS: {
            d: "Returns the difference of two numbers. Equivalent to the `-` operator.",
            a: "Difference of two numbers",
            p: [
                {
                    name: "value1",
                    detail: "The minuend, or number to be subtracted from.",
                },
                {
                    name: "value2",
                    detail: "The subtrahend, or number to subtract from `value1`.",
                },
            ],
        },
        MULTIPLY: {
            d: "Returns the product of two numbers. Equivalent to the `*` operator.",
            a: "Product of two numbers",
            p: [
                {
                    name: "factor1",
                    detail: "The first multiplicand.",
                },
                {
                    name: "factor2",
                    detail: "The second multiplicand.",
                },
            ],
        },
        DIVIDE: {
            d: "Returns one number divided by another. Equivalent to the `/` operator.",
            a: "One number divided by another",
            p: [
                {
                    name: "dividend",
                    detail: "The number to be divided.",
                },
                {
                    name: "divisor",
                    detail: "The number to divide by.",
                },
            ],
        },
        CONCAT: {
            d: "Returns the concatenation of two values. Equivalent to the `&` operator.",
            a: "Concatenation of two values",
            p: [
                {
                    name: "value1",
                    detail: "The value to which `value2` will be appended.",
                },
                {
                    name: "value2",
                    detail: "The value to append to `value1`.",
                },
            ],
        },
        UNARY_PERCENT: {
            d: "Returns a value interpreted as a percentage; that is, `UNARY_PERCENT(100)` equals `1`.",
            a: "Value interpreted as a percentage.",
            p: [
                {
                    name: "percentage",
                    detail: "The value to interpret as a percentage.",
                },
            ],
        },
        CONCATENATE: {
            d: "Appends strings to one another.",
            a: "Appends strings to one another.",
            p: [
                {
                    name: "string1",
                    detail: "The initial string.",
                },
                {
                    name: "string2",
                    detail: "More strings to append in sequence.",
                },
            ],
        },
        CODE: {
            d: "Returns the numeric Unicode map value of the first character in the string provided.",
            a: "Numeric unicode map value of character.",
            p: [
                {
                    name: "string",
                    detail: "The string whose first character's Unicode map value will be returned.",
                },
            ],
        },
        CHAR: {
            d: "Convert a number into a character according to the current Unicode table.",
            a: "Gets character associated with number.",
            p: [
                {
                    name: "table_number",
                    detail: "The number of the character to look up from the current Unicode table in decimal format.",
                },
            ],
        },
        ARABIC: {
            d: "Computes the value of a Roman numeral.",
            a: "Computes the value of a roman numeral.",
            p: [
                {
                    name: "roman_numeral",
                    detail: "The Roman numeral to format, whose value must be between 1 and 3999, inclusive.",
                },
            ],
        },
        ROMAN: {
            d: "Formats a number in Roman numerals.",
            a: "Formats a number in Roman numerals.",
            p: [
                {
                    name: "number",
                    detail: "The number to format, between 1 and 3999, inclusive.",
                },
            ],
        },
        REGEXEXTRACT: {
            d: "Extracts matching substrings according to a regular expression.",
            a: "Extracts matching substrings with regular expression.",
            p: [
                {
                    name: "text",
                    detail: "The input text.",
                },
                {
                    name: "regular_expression",
                    detail: "The first part of `text` that matches this expression will be returned.",
                },
            ],
        },
        REGEXMATCH: {
            d: "Whether a piece of text matches a regular expression.",
            a: "Whether a piece of text matches regular expression.",
            p: [
                {
                    name: "text",
                    detail: "The text to be tested against the regular expression.",
                },
                {
                    name: "regular_expression",
                    detail: "The regular expression to test the text against.",
                },
            ],
        },
        REGEXREPLACE: {
            d: "Replaces part of a text string with a different text string using regular expressions.",
            a: "Replaces text with regular expressions.",
            p: [
                {
                    name: "text",
                    detail: "The text, a part of which will be replaced.",
                },
                {
                    name: "regular_expression",
                    detail: "The regular expression.  All matching instances in `text` will be replaced.",
                },
                {
                    name: "replacement",
                    detail: "The text which will be inserted into the original text.",
                },
            ],
        },
        T: {
            d: "Returns string arguments as text, or the empty string if the value is not text.",
            a: "String arguments as text.",
            p: [
                {
                    name: "value",
                    detail: "The argument to be converted to text.",
                },
            ],
        },
        FIXED: {
            d: "Formats a number with a fixed number of decimal places.",
            a: "Formats number with fixed number of decimal places.",
            p: [
                {
                    name: "number",
                    detail: "The number to format.",
                },
                {
                    name: "number_of_places",
                    detail: "The number of decimal places to display in the result.",
                },
                {
                    name: "suppress_separator",
                    detail:
                        "Whether or not to suppress the thousands separator used in some locales (e.g. `1,000` becomes `1000`). Separators will be present if this value is 0 or omitted, and absent otherwise.",
                },
            ],
        },
        FIND: {
            d:
                "Returns the position at which a string is first found within text where the capitalization of letters matters. Returns `#VALUE!` if the string is not found.",
            a: "First position of string found in text, case-sensitive.",
            p: [
                {
                    name: "search_for",
                    detail: "The string to look for within `text_to_search`.",
                },
                {
                    name: "text_to_search",
                    detail: "The text to search for the first occurrence of `search_for`.",
                },
                {
                    name: "starting_at",
                    detail: "The character within `text_to_search` at which to start the search.",
                },
            ],
        },
        FINDB: {
            d: "Returns the position at which a string is first found within text counting each double-character as 2.",
            a: "Position at which a string is first found within text (binary).",
            p: [
                {
                    name: "search_for",
                    detail: "The string to look for within `text_to_search`.",
                },
                {
                    name: "text_to_search",
                    detail: "The text to search for the first occurrence of `search_for`.",
                },
                {
                    name: "starting_at",
                    detail: "The character within `text_to_search` at which to start the search.",
                },
            ],
        },
        JOIN: {
            d: "Concatenates the elements of one or more one-dimensional arrays using a specified delimiter.",
            a: "Concatenates elements of arrays with delimiter.",
            p: [
                {
                    name: "delimiter",
                    detail: "The character or string to place between each concatenated value.",
                },
                {
                    name: "value_or_array1",
                    detail: "The value or values to be appended using `delimiter`.",
                },
                {
                    name: "value_or_array2",
                    detail: "More values to be appended using `delimiter`.",
                },
            ],
        },
        LEFT: {
            d: "Returns a substring from the beginning of a specified string.",
            a: "Substring from beginning of specified string.",
            p: [
                {
                    name: "string",
                    detail: "The string from which the left portion will be returned.",
                },
                {
                    name: "number_of_characters",
                    detail: "The number of characters to return from the left side of `string`.",
                },
            ],
        },
        RIGHT: {
            d: "Returns a substring from the end of a specified string.",
            a: "A substring from the end of a specified string.",
            p: [
                {
                    name: "string",
                    detail: "The string from which the right portion will be returned.",
                },
                {
                    name: "number_of_characters",
                    detail: "The number of characters to return from the right side of `string`.",
                },
            ],
        },
        MID: {
            d: "Returns a segment of a string.",
            a: "A segment of a string.",
            p: [
                {
                    name: "string",
                    detail: "The string to extract a segment from.",
                },
                {
                    name: "starting_at",
                    detail:
                        "The index from the left of `string` from which to begin extracting. The first character in `string` has the index 1.",
                },
                {
                    name: "extract_length",
                    detail: "The length of the segment to extract.",
                },
            ],
        },
        LEN: {
            d: "Returns the length of a string.",
            a: "Length of a string.",
            p: [
                {
                    name: "text",
                    detail: "The string whose length will be returned.",
                },
            ],
        },
        LENB: {
            d: "Returns the length of a string in bytes.",
            a: "Length of a string in bytes.",
            p: [
                {
                    name: "text",
                    detail: "The string whose length will be returned.",
                },
            ],
        },
        LOWER: {
            d: "Converts a specified string to lowercase.",
            a: "Converts a specified string to lowercase.",
            p: [
                {
                    name: "text",
                    detail: "The string to convert to lowercase.",
                },
            ],
        },
        UPPER: {
            d: "Converts a specified string to uppercase.",
            a: "Converts a specified string to uppercase.",
            p: [
                {
                    name: "text",
                    detail: "The string to convert to uppercase.",
                },
            ],
        },
        EXACT: {
            d: "Tests whether two strings are identical.",
            a: "Tests whether two strings are identical.",
            p: [
                {
                    name: "string1",
                    detail: "The first string to compare",
                },
                {
                    name: "string2",
                    detail: "The second string to compare",
                },
            ],
        },
        REPLACE: {
            d: "Replaces part of a text string with a different text string.",
            a: "Replaces part of a text string with different text.",
            p: [
                {
                    name: "text",
                    detail: "The text, a part of which will be replaced.",
                },
                {
                    name: "position",
                    detail: "The position where the replacement will begin (starting from 1).",
                },
                {
                    name: "length",
                    detail: "The number of characters in the text to be replaced.",
                },
                {
                    name: "new_text",
                    detail: "The text which will be inserted into the original text.",
                },
            ],
        },
        REPT: {
            d: "Returns specified text repeated a number of times.",
            a: "Specified text repeated a number of times.",
            p: [
                {
                    name: "text_to_repeat",
                    detail: "The character or string to repeat.",
                },
                {
                    name: "number_of_repetitions",
                    detail: "The number of times `text_to_repeat` should appear in the value returned.",
                },
            ],
        },
        SEARCH: {
            d:
                "Returns the position at which a string is first found within text and ignores capitalization of letters. Returns `#VALUE!` if the string is not found.",
            a: "First position of string found in text, ignoring case.",
            p: [
                {
                    name: "search_for",
                    detail: "The string to look for within `text_to_search`.",
                },
                {
                    name: "text_to_search",
                    detail: "The text to search for the first occurrence of `search_for`.",
                },
                {
                    name: "starting_at",
                    detail: "The character within `text_to_search` at which to start the search.",
                },
            ],
        },
        SUBSTITUTE: {
            d: "Replaces existing text with new text in a string.",
            a: "Replaces existing text with new text in a string.",
            p: [
                {
                    name: "text_to_search",
                    detail: "The text within which to search and replace.",
                },
                {
                    name: "search_for",
                    detail: "The string to search for within `text_to_search`.",
                },
                {
                    name: "replace_with",
                    detail: "The string that will replace `search_for`.",
                },
                {
                    name: "occurrence_number",
                    detail:
                        "The instance of `search_for` within `text_to_search` to replace with `replace_with`. By default, all occurrences of `search_for` are replaced; however, if `occurrence_number` is specified, only the indicated instance of `search_for` is replaced.",
                },
            ],
        },
        CLEAN: {
            d: "Returns the text with the non-printable ASCII characters removed.",
            a: "Removes non-printable characters from a piece of text.",
            p: [
                {
                    name: "text",
                    detail: "The text whose non-printable characters are to be removed.",
                },
            ],
        },
        TEXT: {
            d: "Converts a number into text according to a specified format.",
            a: "Formats a number into text.",
            p: [
                {
                    name: "number",
                    detail: "The number, date, or time to format.",
                },
                {
                    name: "format",
                    detail: "The pattern by which to format the number, enclosed in quotation marks.",
                },
            ],
        },
        TRIM: {
            d: "Removes leading, trailing, and repeated spaces in text.",
            a: "Removes space characters.",
            p: [
                {
                    name: "text",
                    detail: "The text or reference to a cell containing text to be trimmed.",
                },
            ],
        },
        VALUE: {
            d:
                "Converts a string in any of the date, time or number formats that Google Sheets understands into a number.",
            a: "Converts a date/time/number string into a number.",
            p: [
                {
                    name: "text",
                    detail: "The string containing the value to be converted.",
                },
            ],
        },
        PROPER: {
            d: "Capitalizes each word in a specified string.",
            a: "Capitalizes each word in a specified string.",
            p: [
                {
                    name: "text_to_capitalize",
                    detail:
                        "The text which will be returned with the first letter of each word in uppercase and all other letters in lowercase.",
                },
            ],
        },
        CONVERT: {
            d: "Converts a numeric value to a different unit of measure.",
            a: "Unit conversion for numbers.",
            p: [
                {
                    name: "value",
                    detail: "The numeric value in `start_unit` to convert to `end_unit`.",
                },
                {
                    name: "start_unit",
                    detail: "The starting unit, the unit currently assigned to `value`.",
                },
                {
                    name: "end_unit",
                    detail: "The unit of measure into which to convert the argument, `value`.",
                },
            ],
        },
        SUMX2MY2: {
            d: "Calculates the sum of the differences of the squares of values in two arrays.",
            a: "Sum of the differences of squares.",
            p: [
                {
                    name: "array_x",
                    detail:
                        "The array or range of values whose squares will be reduced by the squares of corresponding entries in `array_y` and added together.",
                },
                {
                    name: "array_y",
                    detail:
                        "The array or range of values whose squares will be subtracted from the squares of corresponding entries in `array_x` and added together.",
                },
            ],
        },
        SUMX2PY2: {
            d: "Calculates the sum of the sums of the squares of values in two arrays.",
            a: "Sum of the sums of squares.",
            p: [
                {
                    name: "array_x",
                    detail:
                        "The array or range of values whose squares will be added to the squares of corresponding entries in `array_y` and added together.",
                },
                {
                    name: "array_y",
                    detail:
                        "The array or range of values whose squares will be added to the squares of corresponding entries in `array_x` and added together.",
                },
            ],
        },
        SUMXMY2: {
            d: "Calculates the sum of the squares of differences of values in two arrays.",
            a: "Sum of the squares of differences.",
            p: [
                {
                    name: "array_x",
                    detail:
                        "The array or range of values that will be reduced by corresponding entries in `array_y`, squared, and added together.",
                },
                {
                    name: "array_y",
                    detail:
                        "The array or range of values that will be subtracted from corresponding entries in `array_x`, the result squared, and all such results added together.",
                },
            ],
        },
        TRANSPOSE: {
            d: "Transposes the rows and columns of an array or range of cells.",
            a: "Transposes the rows and columns of an array.",
            p: [
                {
                    name: "array_or_range",
                    detail: "The array or range whose rows and columns will be swapped.",
                },
            ],
        },
        TREND: {
            d:
                "Given partial data about a linear trend, fits an ideal linear trend using the least squares method and/or predicts further values.",
            a: "Fits points to linear trend derived via least-squares.",
            p: [
                {
                    name: "known_data_y",
                    detail:
                        "The array or range containing dependent (y) values that are already known, used to curve fit an ideal linear trend.",
                },
                {
                    name: "known_data_x",
                    detail: "The values of the independent variable(s) corresponding with `known_data_y`.",
                },
                {
                    name: "new_data_x",
                    detail: "The data points to return the `y` values for on the ideal curve fit.",
                },
                {
                    name: "b",
                    detail:
                        "Given a general linear form of `y = m*x+b` for a curve fit, calculates `b` if `TRUE` or forces `b` to be `0` and only calculates the `m` values if `FALSE`, i.e. forces the curve fit to pass through the origin.",
                },
            ],
        },
        FREQUENCY: {
            d: "Calculates the frequency distribution of a one-column array into specified classes.",
            a: "The frequency distribution of array.",
            p: [
                {
                    name: "data",
                    detail: "The array or range containing the values to be counted.",
                },
                {
                    name: "classes",
                    detail: "The array or range containing the set of classes.",
                },
            ],
        },
        GROWTH: {
            d:
                "Given partial data about an exponential growth trend, fits an ideal exponential growth trend and/or predicts further values.",
            a: "Fits points to exponential growth trend.",
            p: [
                {
                    name: "known_data_y",
                    detail:
                        "The array or range containing dependent (y) values that are already known, used to curve fit an ideal exponential growth curve.",
                },
                {
                    name: "known_data_x",
                    detail: "The values of the independent variable(s) corresponding with `known_data_y`.",
                },
                {
                    name: "new_data_x",
                    detail: "The data points to return the `y` values for on the ideal curve fit.",
                },
                {
                    name: "b",
                    detail:
                        "Given a general exponential form of `y = b*m^x` for a curve fit, calculates `b` if `TRUE` or forces `b` to be `1` and only calculates the `m` values if `FALSE`.",
                },
            ],
        },
        LINEST: {
            d:
                "Given partial data about a linear trend, calculates various parameters about the ideal linear trend using the least-squares method.",
            a: "Best-fit linear trend via least-squares.",
            p: [
                {
                    name: "known_data_y",
                    detail:
                        "The array or range containing dependent (y) values that are already known, used to curve fit an ideal linear trend.",
                },
                {
                    name: "known_data_x",
                    detail: "The values of the independent variable(s) corresponding with `known_data_y`.",
                },
                {
                    name: "calculate_b",
                    detail:
                        "Given a linear form of `y = m*x+b`, calculates the y-intercept (`b`) if `TRUE`. Otherwise, forces `b` to be `0` and only calculates the `m` values if `FALSE`, i.e. forces the curve fit to pass through the origin.",
                },
                {
                    name: "verbose",
                    detail:
                        "A flag specifying whether to return additional regression statistics or only the linear coefficients and the y-intercept (default).",
                },
            ],
        },
        LOGEST: {
            d:
                "Given partial data about an exponential growth curve, calculates various parameters about the best fit ideal exponential growth curve.",
            a: "Best-fit exponential growth curve.",
            p: [
                {
                    name: "known_data_y",
                    detail:
                        "The array or range containing dependent (y) values that are already known, used to curve fit an ideal exponential growth curve.",
                },
                {
                    name: "known_data_x",
                    detail: "The values of the independent variable(s) corresponding with `known_data_y`.",
                },
                {
                    name: "b",
                    detail:
                        "Given a general exponential form of `y = b*m^x` for a curve fit, calculates `b` if `TRUE` or forces `b` to be `1` and only calculates the `m` values if `FALSE`.",
                },
                {
                    name: "verbose",
                    detail:
                        "A flag specifying whether to return additional regression statistics or only the calculated coefficient and exponents.",
                },
            ],
        },
        MDETERM: {
            d: "Returns the matrix determinant of a square matrix specified as an array or range.",
            a: "Matrix determinant of a square matrix.",
            p: [
                {
                    name: "square_matrix",
                    detail:
                        "An array or range with an equal number of rows and columns representing a matrix whose determinant will be calculated.",
                },
            ],
        },
        MINVERSE: {
            d: "Returns the multiplicative inverse of a square matrix specified as an array or range.",
            a: "Multiplicative inverse of square matrix.",
            p: [
                {
                    name: "square_matrix",
                    detail:
                        "An array or range with an equal number of rows and columns representing a matrix whose multiplicative inverse will be calculated.",
                },
            ],
        },
        MMULT: {
            d: "Calculates the matrix product of two matrices specified as arrays or ranges.",
            a: "The matrix product of two matrices.",
            p: [
                {
                    name: "matrix1",
                    detail:
                        "The first matrix in the matrix multiplication operation, represented as an array or range.",
                },
                {
                    name: "matrix2",
                    detail:
                        "The second matrix in the matrix multiplication operation, represented as an array or range.",
                },
            ],
        },
        SUMPRODUCT: {
            d: "Calculates the sum of the products of corresponding entries in two equal-sized arrays or ranges.",
            a: "Sum of products of elements in two arrays.",
            p: [
                {
                    name: "array1",
                    detail:
                        "The first array or range whose entries will be multiplied with corresponding entries in the second such array or range.",
                },
                {
                    name: "array2",
                    detail:
                        "The second array or range whose entries will be multiplied with corresponding entries in the first such array or range.",
                },
            ],
        },
        ISFORMULA: {
            d: "Checks whether a value is a formula.",
            a: "Whether a value is a formula.",
            p: [
                {
                    name: "cell",
                    detail: "The cell to be verified as containing a formula.",
                },
            ],
        },
        CELL: {
            d: "Returns the requested information about the specified cell.",
            a: "Gets information about a cell.",
            p: [
                {
                    name: "info_type",
                    detail: "The type of information requested (see article for available types)",
                },
                {
                    name: "reference",
                    detail: "The reference to the cell.",
                },
            ],
        },
        NA: {
            d: 'Returns the "value not available" error, `#N/A`.',
            a: "The `#N/A` error.",
            p: [],
        },
        ERROR_TYPE: {
            d: "Returns a number corresponding to the error value in a different cell.",
            a: "Error value of cell (as number).",
            p: [
                {
                    name: "reference",
                    detail:
                        "The cell to find the error number for although you can also provide the error value directly.",
                },
            ],
        },
        ISBLANK: {
            d: "Checks whether the referenced cell is empty.",
            a: "Whether the referenced cell is empty.",
            p: [
                {
                    name: "value",
                    detail: "Reference to the cell that will be checked for emptiness.",
                },
            ],
        },
        ISERR: {
            d: "Checks whether a value is an error other than `#N/A`.",
            a: "Whether a value is an error other than `#n/a`.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as an error type other than `#N/A`.",
                },
            ],
        },
        ISERROR: {
            d: "Checks whether a value is an error.",
            a: "Whether a value is an error.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as an error type.",
                },
            ],
        },
        ISLOGICAL: {
            d: "Checks whether a value is `TRUE` or `FALSE`.",
            a: "Whether a value is `true` or `false`.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as a logical `TRUE` or `FALSE`.",
                },
            ],
        },
        ISNA: {
            d: "Checks whether a value is the error `#N/A`.",
            a: "Whether a value is the error `#n/a`.",
            p: [
                {
                    name: "value",
                    detail: "The value to be compared with the error value `#N/A`.",
                },
            ],
        },
        ISNONTEXT: {
            d: "Checks whether a value is non-textual.",
            a: "Whether a value is non-textual.",
            p: [
                {
                    name: "value",
                    detail: "The value to be checked.",
                },
            ],
        },
        ISNUMBER: {
            d: "Checks whether a value is a number.",
            a: "Whether a value is a number.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as a number.",
                },
            ],
        },
        ISREF: {
            d: "Checks whether a value is a valid cell reference.",
            a: "Whether a value is a valid cell reference.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as a cell reference.",
                },
            ],
        },
        ISTEXT: {
            d: "Checks whether a value is text.",
            a: "Whether a value is text.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as text.",
                },
            ],
        },
        TYPE: {
            d: "Returns a number associated with the type of data passed into the function.",
            a: "Get the type of a value.",
            p: [
                {
                    name: "value",
                    detail: "The value whose type is to be determined.",
                },
            ],
        },
        N: {
            d: "Returns the argument provided as a number. Text is converted to 0 and errors are returned as-is.",
            a: "Argument provided as a number.",
            p: [
                {
                    name: "value",
                    detail: "The argument to be converted to a number.",
                },
            ],
        },
        TO_DATE: {
            d: "Converts a provided number to a date.",
            a: "Converts a provided number to a date.",
            p: [
                {
                    name: "value",
                    detail: "The argument or reference to a cell to be converted to a date.",
                },
            ],
        },
        TO_PURE_NUMBER: {
            d:
                "Converts a provided date/time, percentage, currency or other formatted numeric value to a pure number without formatting.",
            a: "Converts any numeric value to a pure number.",
            p: [
                {
                    name: "value",
                    detail: "The argument or reference to a cell to be converted to a pure number.",
                },
            ],
        },
        TO_TEXT: {
            d: "Converts a provided numeric value to a text value.",
            a: "Converts a provided numeric value to a text value.",
            p: [
                {
                    name: "value",
                    detail: "The argument or reference to a cell to be converted to text.",
                },
            ],
        },
        TO_DOLLARS: {
            d: "Converts a provided number to a dollar value.",
            a: "Converts a provided number to a dollar value.",
            p: [
                {
                    name: "value",
                    detail: "The argument or reference to a cell to be converted to a dollar value.",
                },
            ],
        },
        TO_PERCENT: {
            d: "Converts a provided number to a percentage.",
            a: "Converts a provided number to a percentage.",
            p: [
                {
                    name: "value",
                    detail: "The argument or reference to a cell to be converted to a percentage.",
                },
            ],
        },
        DGET: {
            d: "Returns a single value from a database table-like array or range using a SQL-like query.",
            a: "Single value from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DMAX: {
            d: "Returns the maximum value selected from a database table-like array or range using a SQL-like query.",
            a: "Maximum of values from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DMIN: {
            d: "Returns the minimum value selected from a database table-like array or range using a SQL-like query.",
            a: "Minimum of values from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DAVERAGE: {
            d:
                "Returns the average of a set of values selected from a database table-like array or range using a SQL-like query.",
            a: "Average of a set of values from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DCOUNT: {
            d: "Counts numeric values selected from a database table-like array or range using a SQL-like query.",
            a: "Counts values from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DCOUNTA: {
            d:
                "Counts values, including text, selected from a database table-like array or range using a SQL-like query.",
            a: "Counts values and text from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DPRODUCT: {
            d:
                "Returns the product of values selected from a database table-like array or range using a SQL-like query.",
            a: "Product of values from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DSTDEV: {
            d:
                "Returns the standard deviation of a population sample selected from a database table-like array or range using a SQL-like query.",
            a: "Standard deviation of population sample from table.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DSTDEVP: {
            d:
                "Returns the standard deviation of an entire population selected from a database table-like array or range using a SQL-like query.",
            a: "Standard deviation of entire population from table.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DSUM: {
            d: "Returns the sum of values selected from a database table-like array or range using a SQL-like query.",
            a: "Sum of values from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DVAR: {
            d:
                "Returns the variance of a population sample selected from a database table-like array or range using a SQL-like query.",
            a: "Variance of population sample from table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        DVARP: {
            d:
                "Returns the variance of an entire population selected from a database table-like array or range using a SQL-like query.",
            a: "Variance of a population from a table-like range.",
            p: [
                {
                    name: "database",
                    detail:
                        "The array or range containing the data to consider, structured in such a way that the first row contains the labels for each column's values.",
                },
                {
                    name: "field",
                    detail: "Indicates which column in `database` contains the values to be extracted and operated on.",
                },
                {
                    name: "criteria",
                    detail:
                        "An array or range containing zero or more criteria to filter the `database` values by before operating.",
                },
            ],
        },
        AGE_BY_IDCARD: {
            d: "Calculate the age based on the Chinese ID number. Support 15 or 18",
            a: "Get age based on ID number.",
            p: [
                {
                    name: "ID number",
                    detail: "15-digit or 18-digit ID number or range.",
                },
                {
                    name: "Deadline",
                    detail: "The deadline or range of age calculation. The default is the current day.",
                },
            ],
        },
        SEX_BY_IDCARD: {
            d: "Calculate gender based on Chinese ID number. Support 15 or 18",
            a: "Get gender based on ID number.",
            p: [
                {
                    name: "ID number",
                    detail: "15-digit or 18-digit ID number or range.",
                },
            ],
        },
        BIRTHDAY_BY_IDCARD: {
            d: "Calculate the birthday based on the Chinese ID number. Support 15 or 18",
            a: "Get the birthday based on the ID number.",
            p: [
                {
                    name: "ID number",
                    detail: "15-digit or 18-digit ID number or range.",
                },
                {
                    name: "Birthday format",
                    detail: "Date type, default:0:[1900/01/01], 1:[1900-01-01], 2:[1900年1月1日]",
                },
            ],
        },
        PROVINCE_BY_IDCARD: {
            d: "Calculate the province of birthplace based on the Chinese ID number. Support 15 or 18",
            a: "Get the province of birthplace based on the ID number.",
            p: [
                {
                    name: "ID number",
                    detail: "15-digit or 18-digit ID number or range.",
                },
            ],
        },
        CITY_BY_IDCARD: {
            d: "Calculate the city of birthplace based on the Chinese ID number. Support 15 or 18",
            a: "Get the city of birthplace based on the ID number.",
            p: [
                {
                    name: "ID number",
                    detail: "15-digit or 18-digit ID number or range.",
                },
            ],
        },
        STAR_BY_IDCARD: {
            d: "Calculate the constellation based on the Chinese ID number. Support 15 or 18",
            a: "Get the constellation based on the ID number.",
            p: [
                {
                    name: "ID number",
                    detail: "15-digit or 18-digit ID number or range.",
                },
            ],
        },
        ANIMAL_BY_IDCARD: {
            d: "Calculate the zodiac (rat, ox, tiger, rabbit...) based on the Chinese ID number. Support 15 or 18",
            a: "Get the zodiac according to the ID number.",
            p: [
                {
                    name: "ID number",
                    detail: "15-digit or 18-digit ID number or range.",
                },
            ],
        },
        ISIDCARD: {
            d: "Verify that the format of the ID card is correct. Support 15 or 18",
            a: "Verify the correctness of the ID card format.",
            p: [
                {
                    name: "ID number",
                    detail: "15-digit or 18-digit ID number or range.",
                },
            ],
        },
        DM_TEXT_CUTWORD: {
            d: "Text segmentation. Split a series of words into a series of individual words",
            a: "Chinese text segmentation.",
            p: [
                {
                    name: "Text",
                    detail: "Any text that needs word segmentation.",
                },
                {
                    name: "Word segmentation mode",
                    detail: "The default is 0[precision mode], 1[full mode], 2[search engine mode].",
                },
            ],
        },
        DM_TEXT_TFIDF: {
            d: "Use tf-idf algorithm for keyword extraction. Identify keywords from a series of text",
            a: "tf-idf keyword recognition.",
            p: [
                {
                    name: "Text",
                    detail: "Any text that needs word segmentation.",
                },
                {
                    name: "Number of keywords",
                    detail: "The number of keywords returned by the algorithm, the default is 20",
                },
                {
                    name: "Corpus",
                    detail: "Select a corpus in a specific field, the default is 0[General], 1[Finance], 2[Medical]",
                },
            ],
        },
        DM_TEXT_TEXTRANK: {
            d: "Use TextRank algorithm to extract keywords. Identify keywords from a series of text",
            a: "TextRank keyword recognition.",
            p: [
                {
                    name: "Text",
                    detail: "Any text that needs word segmentation.",
                },
                {
                    name: "Number of keywords",
                    detail: "The number of keywords returned by the algorithm, the default is 20",
                },
                {
                    name: "Corpus",
                    detail: "Select a corpus in a specific field, the default is 0[General], 1[Finance], 2[Medical]",
                },
            ],
        },
        DATA_CN_STOCK_CLOSE: {
            d: "According to the stock code and date, return the corresponding stock closing price of A shares.",
            a: "Returns the closing price of stock.",
            p: [
                {
                    name: "Stock code",
                    detail: "6-digit stock code, required.",
                },
                {
                    name: "Date",
                    detail: "The trading day of the stock, the default is the latest trading day",
                },
                {
                    name: "Reversion and exclusion",
                    detail:
                        "Select the ex right restoration type of the stock, default to 0 [former reversion], 1 [original price], 2 [post reversion]",
                },
            ],
        },
        DATA_CN_STOCK_OPEN: {
            d: "According to the stock code and date, return the opening price of stock.",
            a: "Return the opening price of a shares.",
            p: [
                {
                    name: "Stock code",
                    detail: "6-digit stock code, required.",
                },
                {
                    name: "Date",
                    detail: "The trading day of the stock, the default is the latest trading day",
                },
                {
                    name: "Reversion and exclusion",
                    detail:
                        "Select the ex right restoration type of the stock, default to 0 [former reversion], 1 [original price], 2 [post reversion]",
                },
            ],
        },
        DATA_CN_STOCK_MAX: {
            d: "According to the stock code and date, return the highest price of stock.",
            a: "Return the highest price of stock.",
            p: [
                {
                    name: "Stock code",
                    detail: "6-digit stock code, required.",
                },
                {
                    name: "Date",
                    detail: "The trading day of the stock, the default is the latest trading day",
                },
                {
                    name: "Reversion and exclusion",
                    detail:
                        "Select the ex right restoration type of the stock, default to 0 [former reversion], 1 [original price], 2 [post reversion]",
                },
            ],
        },
        DATA_CN_STOCK_MIN: {
            d: "According to the stock code and date, return the lowest price of stock.",
            a: "Returns the lowest price of stock.",
            p: [
                {
                    name: "Stock code",
                    detail: "6-digit stock code, required.",
                },
                {
                    name: "Date",
                    detail: "The trading day of the stock, the default is the latest trading day",
                },
                {
                    name: "Reversion and exclusion",
                    detail:
                        "Select the ex right restoration type of the stock, default to 0 [former reversion], 1 [original price], 2 [post reversion]",
                },
            ],
        },
        DATA_CN_STOCK_VOLUMN: {
            d: "According to the stock code and date, return the corresponding stock trading volume of A shares.",
            a: "Returns the corresponding stock trading volume of A shares.",
            p: [
                {
                    name: "Stock code",
                    detail: "6-digit stock code, required.",
                },
                {
                    name: "Date",
                    detail: "The trading day of the stock, the default is the latest trading day",
                },
                {
                    name: "Reversion and exclusion",
                    detail:
                        "Select the ex right restoration type of the stock, default to 0 [former reversion], 1 [original price], 2 [post reversion]",
                },
            ],
        },
        DATA_CN_STOCK_AMOUNT: {
            d: "According to the stock code and date, return the corresponding stock turnover of A shares.",
            a: "Returns the corresponding stock turnover of A shares.",
            p: [
                {
                    name: "Stock code",
                    detail: "6-digit stock code, required.",
                },
                {
                    name: "Date",
                    detail: "The trading day of the stock, the default is the latest trading day",
                },
                {
                    name: "Reversion and exclusion",
                    detail:
                        "Select the ex right restoration type of the stock, default to 0 [former reversion], 1 [original price], 2 [post reversion]",
                },
            ],
        },
        ISDATE: {
            d: "Returns whether a value is a date.",
            a: "Whether a value is a date.",
            p: [
                {
                    name: "value",
                    detail: "The value to be verified as a date.",
                },
            ],
        },
        LINESPLINES: {
            d: "Generate sparklines embedded in the cell to describe the continuous trend of data",
            a: "Generate sparklines line chart",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Line color",
                    detail:
                        "The line color of the line graph can be range A1, color table index value or specific color value. Set it to 0 or false to not display it. It supports regx, rgb, rgba, etc. Default #2ec7c9",
                },
                {
                    name: "Line thickness",
                    detail: "Line thickness of the line graph, the default is 1px",
                },
                {
                    name: "Auxiliary line",
                    detail:
                        "A horizontal line, which can be min, max, avg, median, range or custom value, default 0 none",
                },
                {
                    name: "Auxiliary line color",
                    detail: "Color setting of auxiliary line, same as line color configuration, default #000",
                },
                {
                    name: "Maximum mark",
                    detail:
                        "Identifies the maximum value of the line graph, the same line color configuration, default 0 does not display",
                },
                {
                    name: "Minimum mark",
                    detail:
                        "Identify the minimum value of the line graph, the same line color configuration, default 0 does not display",
                },
                {
                    name: "Mark size",
                    detail: "The maximum and minimum mark size settings, the default is 1.5",
                },
            ],
        },
        AREASPLINES: {
            d:
                "Generate sparklines embedded in the cell area chart, generally used to describe the continuous cumulative value trend of the data",
            a: "Generate sparklines area chart",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Line color",
                    detail:
                        "The line color of the line graph can be range A1, color table index value or specific color value. Set it to 0 or false to not display it. It supports regx, rgb, rgba, etc. Default #2ec7c9",
                },
                {
                    name: "Fill color",
                    detail: "Form an area chart, the same line color configuration, default 0 does not display",
                },
                {
                    name: "Line thickness",
                    detail: "Line thickness of the line graph, the default is 1px",
                },
                {
                    name: "Auxiliary line",
                    detail:
                        "A horizontal line, which can be min, max, avg, median, range or custom value, default 0 none",
                },
                {
                    name: "Auxiliary line color",
                    detail: "Color setting of auxiliary line, same as line color configuration, default #000",
                },
            ],
        },
        COLUMNSPLINES: {
            d:
                "Generate sparklines embedded in the vertical histogram of cells, generally used to describe the size of discrete data",
            a: "Generate sparklines vertical histogram",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Bar interval",
                    detail: "The distance between bars, the default is 1",
                },
                {
                    name: "Bar color",
                    detail:
                        "The line color of the line graph can be range A1, color table index value or specific color value. Set it to 0 or false to not display it. It supports regx, rgb, rgba, etc. Default #fc5c5c",
                },
                {
                    name: "Negative bar color",
                    detail:
                        "Negative bar color setting, representing the color of negative value, same as the bar color configuration, default #97b552",
                },
                {
                    name: "Max",
                    detail:
                        "The maximum value of the bar chart, used to standardize the length of the bar chart, the default is to automatically calculate false, auto, null",
                },
                {
                    name: "Color palette",
                    detail:
                        "The color palette can set the color of each bar individually, multiple settings can be set, and two formats are supported: 1 color such as #000, which means that the color of the first bar is black; 2 value range: color, such as -2:# 000 indicates that the bar with a value of -2 is black, 0:5:#000 indicates that the bar with a value of 0-5 is black, and the default is empty",
                },
            ],
        },
        STACKCOLUMNSPLINES: {
            d:
                "Generate sparklines, a cumulative vertical histogram embedded in a cell, generally used to describe the numerical size of multiple dimensions of discrete data",
            a: "Generate sparklines cumulative vertical histogram",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Stack by column",
                    detail: "If you need to stack by row, set this item to false or 0, the default is 1",
                },
                {
                    name: "Bar interval",
                    detail: "The distance between bars, the default is 1",
                },
                {
                    name: "Max",
                    detail:
                        "The maximum value of the cumulative bar, used to regulate the length of the bar, the default is to automatically calculate false, auto, null",
                },
                {
                    name: "Color palette",
                    detail:
                        "The color palette can individually set the bar color of each dimension, which can be set to the range of A1:A10, etc. The default is #2ec7c9, #fc5c5c, #5ab1ef, #ffb980...",
                },
            ],
        },
        BARSPLINES: {
            d: "Generate sparklines embedded in the cell, generally used to describe the size of discrete data",
            a: "Generate sparklines horizontal bar graph",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Bar interval",
                    detail: "The distance between bars, the default is 1",
                },
                {
                    name: "Bar color",
                    detail:
                        "The line color of the line graph can be range A1, color table index value or specific color value. Set it to 0 or false to not display it. It supports regx, rgb, rgba, etc. Default #fc5c5c",
                },
                {
                    name: "Negative bar color",
                    detail:
                        "Negative bar color setting, representing the color of negative value, same as the bar color configuration, default #97b552",
                },
                {
                    name: "Max",
                    detail:
                        "The maximum value of the bar chart, used to standardize the length of the bar chart, the default is to automatically calculate false, auto, null",
                },
                {
                    name: "Color palette",
                    detail:
                        "The color palette can set the color of each bar individually, multiple settings can be set, and two formats are supported: 1 color such as #000, which means that the color of the first bar is black; 2 value range: color, such as -2:# 000 indicates that the bar with a value of -2 is black, 0:5:#000 indicates that the bar with a value of 0-5 is black, and the default is empty",
                },
            ],
        },
        STACKBARSPLINES: {
            d:
                "Generate sparklines, a cumulative horizontal bar graph embedded in a cell, which is generally used to describe the numerical size of multiple dimensions of discrete data",
            a: "Generate sparklines cumulative horizontal bar graph",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Stack by column",
                    detail: "If you need to stack by row, set this item to false or 0, the default is 1",
                },
                {
                    name: "Bar interval",
                    detail: "The distance between bars, the default is 1",
                },
                {
                    name: "Max",
                    detail:
                        "The maximum value of the cumulative bar, used to regulate the length of the bar, the default is to automatically calculate false, auto, null",
                },
                {
                    name: "Color palette",
                    detail:
                        "The color palette can individually set the bar color of each dimension, which can be set to the range of A1:A10, etc. The default is #2ec7c9, #fc5c5c, #5ab1ef, #ffb980...",
                },
            ],
        },
        DISCRETESPLINES: {
            d: "Generate sparklines embedded in the cell, generally used to describe the trend of discrete data",
            a: "Generate sparklines discrete graph",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Segmentation threshold",
                    detail:
                        "Discrete graph column color distinction, for example: if the value is 0, blue is greater than 0, red is less than 0, and the default is 0",
                },
                {
                    name: "Above threshold color",
                    detail:
                        "The line color of the line graph can be range A1, color table index value or specific color value. Set it to 0 or false to not display it. It supports regx, rgb, rgba, etc. Default #2ec7c9",
                },
                {
                    name: "Below threshold color",
                    detail:
                        "The color setting of the bar below the threshold, the same as the color above the threshold, default #fc5c5c",
                },
            ],
        },
        TRISTATESPLINES: {
            d:
                "Generate sparklines, a three-state graph embedded in the cell, which is generally used to describe the trend of three situations, such as winning, losing, or drawing.",
            a: "Generate sparklines three-state graph",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Bar interval",
                    detail: "The distance between bars, the default is 1",
                },
                {
                    name: "Bar color",
                    detail:
                        "The line color of the line graph can be range A1, color table index value or specific color value. Set it to 0 or false to not display it. It supports regx, rgb, rgba, etc. Default #fc5c5c",
                },
                {
                    name: "Negative bar color",
                    detail:
                        "Negative bar color setting, representing the color of negative value, same as the bar color configuration, default #97b552",
                },
                {
                    name: "Zero value bar color",
                    detail:
                        "Zero value bar color setting, representing 0 value color, the same color configuration of the bar, default #999",
                },
                {
                    name: "Color palette",
                    detail:
                        "The color palette can set the color of each bar individually, multiple settings can be set, and two formats are supported: 1 color such as #000, which means that the color of the first bar is black; 2 value range: color, such as -2:# 000 indicates that the bar with a value of -2 is black, 0:5:#000 indicates that the bar with a value of 0-5 is black, and the default is empty",
                },
            ],
        },
        PIESPLINES: {
            d: "Generate sparklines pie chart embedded in the cell, generally used to describe the proportion of data",
            a: "Generate sparklines pie chart",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Rotation angle",
                    detail: "The rotation angle of the pie chart, the default is 0",
                },
                {
                    name: "border",
                    detail: "Pie chart border size, default is none 0",
                },
                {
                    name: "Border color",
                    detail: "The border color of the pie chart, the default is #000",
                },
                {
                    name: "Color palette",
                    detail:
                        "The color of the slice can be set in the palette, which can be set to the range of A1:A10, etc. The default is #2ec7c9, #fc5c5c, #5ab1ef, #ffb980...",
                },
            ],
        },
        BOXSPLINES: {
            d:
                "Generate sparklines embedded in the cell box plot, generally used to describe the statistical distribution of the data set",
            a: "Generate sparklines box plot",
            p: [
                {
                    name: "Range",
                    detail: "Range，Values can be calculated effectively, such as A1:A20, {1,2,3,4,5}, etc.",
                },
                {
                    name: "Outlier ratio",
                    detail:
                        "The threshold range of outliers, if it is 0 or false, it will not be displayed, the default is 1.5 times",
                },
                {
                    name: "Target value",
                    detail: "The target value setting on the box plot, the default is false and does not display",
                },
                {
                    name: "Point size",
                    detail: "The radius of the target point and outlier is set, the default is 1.5",
                },
            ],
        },
        BULLETSPLINES: {
            d: "Generate sparklines embedded in the cell, generally used to describe the task achievement rate",
            a: "Generating sparklines bullets",
            p: [
                {
                    name: "Target",
                    detail:
                        "The numerical value can be calculated effectively for the achieved target value, such as A1, 100, etc.",
                },
                {
                    name: "achieved",
                    detail:
                        "Only when the value is completed can the value be calculated effectively, such as A1, 100, etc.",
                },
                {
                    name: "Contrast",
                    detail:
                        "Comparative values, such as excess, minimum, and bottom line for awards, can be effectively calculated, such as A1, 100, etc. You can set up to 9 comparison values",
                },
            ],
        },
        COMPOSESPLINES: {
            d: "Support multiple types of pictures in the same cell, each parameter represents a sparklines diagram",
            a: "Combine sparklines graphs into one cell",
            p: [
                {
                    name: "config",
                    detail:
                        "Sparklines chart settings, such as A1:A20, a completed pie chart, line chart settings, etc.",
                },
            ],
        },
        SORT: {
            d: "Sorts the rows of a given array or range by the values in one or more columns.",
            a: "Sorts rows of range by specified column.",
            p: [
                {
                    name: "range",
                    detail: "The data to be sorted.",
                },
                {
                    name: "sort_column",
                    detail:
                        "The index of the column in `range` or a range outside of `range` containing the values by which to sort.",
                },
                {
                    name: "is_ascending",
                    detail:
                        "`TRUE` or `FALSE` indicating whether to sort `sort_column` in ascending order. `FALSE` sorts in descending order.",
                },
                {
                    name: "sort_column2",
                    detail: "Additional columns.",
                },
            ],
        },
        FILTER: {
            d:
                "Returns a filtered version of the source range, returning only rows or columns which meet the specified conditions.",
            a: "Filters a range based off provided conditions.",
            p: [
                {
                    name: "range",
                    detail: "The data to be filtered.",
                },
                {
                    name: "condition1",
                    detail:
                        "A column or row containing true or false values corresponding to the first column or row of `range`, or an array formula evaluating to true or false.",
                },
                {
                    name: "condition2",
                    detail:
                        "Additional rows or columns containing boolean values `TRUE` or `FALSE` indicating whether the corresponding row or column in `range` should pass through `FILTER`. Can also contain array formula expressions which evaluate to such rows or columns. All conditions must be of the same type (row or column). Mixing row conditions and column conditions is not permitted.",
                },
            ],
        },
        UNIQUE: {
            d:
                "Returns unique rows in the provided source range, discarding duplicates. Rows are returned in the order in which they first appear in the source range.",
            a: "Unique rows in the provided source range.",
            p: [
                {
                    name: "range",
                    detail: "The data to filter by unique entries.",
                },
                {
                    name: "by_col",
                    detail:
                        "[Option] - Logical value, indicating how to compare; by row = FALSE() or omitted; by column = TRUE().",
                },
                {
                    name: "occurs_once",
                    detail:
                        "[Option] - Logical value, only one occurrence in the unique value is returned = TRUE(); including all unique values = FALSE() or omitted.",
                },
            ],
        },
        RANDARRAY: {
            d:
                "Returns a grid of random numbers between 0 inclusive and 1 exclusive. The grid size will match the provided rows and columns arguments. If neither rows nor columns are provided, then the grid will be size 1 x 1.",
            a: "Returns a grid of random numbers.",
            p: [
                {
                    name: "rows",
                    detail: "The number of rows to populate with a random number.",
                },
                {
                    name: "columns",
                    detail: "The number of columns to populate with a random number.",
                },
            ],
        },
        SEQUENCE: {
            d:
                "Returns a grid of sequential numbers starting at a specified start value and  increasing by a specified step size. By default, the sequence starts at and  increases by 1.",
            a: "Returns a grid of sequential numbers.",
            p: [
                {
                    name: "rows",
                    detail: "The number of rows in the function's resulting grid.",
                },
                {
                    name: "columns",
                    detail:
                        "The number of columns in the function's resulting grid. If omitted, the result grid will have 1 column.",
                },
                {
                    name: "start",
                    detail: "The number, at which to start the sequence. If omitted, the sequence will start at 1.",
                },
                {
                    name: "step",
                    detail:
                        "The amount each value in the sequence will differ by. If omitted, each value will differ by 1.",
                },
            ],
        },
        EVALUATE: {
            d: "Evaluate a formula or expression expressed in words and return the result",
            a: "Evaluate according to literal formula or expression.",
            p: [
                {
                    name: "expression",
                    detail: "Formula or expression",
                },
            ],
        },
        REMOTE: {
            d: "Calls a function on a remote server",
            a: "Calls a function on a remote back end server/API.",
            p: [
                {
                    name: "remote_expression",
                    detail: "Formula",
                },
            ],
        },
    },
    toolbar: {
        undo: "Undo",
        redo: "Redo",
        paintFormat: "Paint format",
        currencyFormat: "Format as currency",
        percentageFormat: "Format as percent",
        numberDecrease: "Decrease decimal places",
        numberIncrease: "Increase decimal places",
        moreFormats: "More formats",
        font: "Font",
        fontSize: "Font size",
        bold: "Bold (Ctrl+B)",
        italic: "Italic (Ctrl+I)",
        strikethrough: "Strikethrough (Alt+Shift+5)",
        underline: "Underline",
        textColor: "Text color",
        chooseColor: "choose color",
        resetColor: "Reset",
        customColor: "CUSTOM",
        alternatingColors: "Alternating colors",
        confirmColor: "OK",
        cancelColor: "Cancel",
        collapse: "Collapse",
        fillColor: "Fill color",
        border: "Border",
        borderStyle: "Border style",
        mergeCell: "Merge cells",
        chooseMergeType: "Choose merge type",
        horizontalAlign: "Horizontal align",
        verticalAlign: "Vertical align",
        alignment: "Alignment",
        textWrap: "Text wrap",
        textWrapMode: "Text wrap mode",
        textRotate: "Text rotate",
        textRotateMode: "Text rotate mode",
        freezeTopRow: "Freeze first row",
        sortAndFilter: "Sort and filter",
        findAndReplace: "Find and replace",
        sum: "SUM",
        autoSum: "Auto SUM",
        moreFunction: "More functions",
        conditionalFormat: "Conditional format",
        postil: "Comment",
        pivotTable: "Pivot Table",
        chart: "Chart",
        screenshot: "Screenshot",
        splitColumn: "Split text",
        insertImage: "Insert image",
        exportXlsx: "Export Xlsx",
        insertLink: "Insert link",
        dataVerification: "Data verification",
        protection: "Protect the sheet",

        clearText: "Clear color",
        noColorSelectedText: "No color is selected",

        toolMore: "More",
        toolLess: "Less",
        toolClose: "Close",
        toolMoreTip: "More features",
        moreOptions: "More options",

        cellFormat: "Cell format config",
        print: "Print",
    },
    alternatingColors: {
        applyRange: "Apply to range",
        selectRange: "Select a data range",
        header: "Header",
        footer: "Footer",

        errorInfo:
            "Cannot perform this operation on multiple selection areas, please select a single area and try again",
        textTitle: "Format style",
        custom: "CUSTOM",
        close: "close",
        selectionTextColor: "Click to select text color",
        selectionCellColor: "Click to select cell color",
        removeColor: "Remove alternating colors",
        colorShow: "color",
        currentColor: "Current",

        tipSelectRange: "Please select the range of alternating colors",
        errorNoRange: "No range is selected",
        errorExistColors: "Alternating colors already exist and cannot be edited",
    },
    button: {
        confirm: "OK",
        cancel: "Cancel",
        close: "Close",
        update: "Update",
        delete: "Delete",
        insert: "Insert",
        prevPage: "Previous",
        nextPage: "Next",
        total: "total:",
    },
    paint: {
        start: "Paint format start",
        end: "ESC",

        tipSelectRange: "Please select the range to be copied",
        tipNotMulti: "Cannot perform this operation on multiple selection ranges",
    },
    format: {
        moreCurrency: "More currency formats",
        moreDateTime: "More date and time formats",
        moreNumber: "More number formats",

        titleCurrency: "Currency formats",
        decimalPlaces: "Decimal places",
        titleDateTime: "Date and time formats",
        titleNumber: "Number formats",
    },
    info: {
        detailUpdate: "New opened",
        detailSave: "Local cache restored",
        row: "",
        column: "",
        loading: "Loading...",

        copy: "Copy",
        return: "Exit",
        rename: "Rename",
        tips: "WorkBook rename",
        noName: "Untitled spreadsheet",
        wait: "waiting for update",

        add: "Add",
        addLast: "more rows at bottom",
        backTop: "Back to the top",
        pageInfo: "Total ${total}，${totalPage} page，current ${currentPage}",
        nextPage: "Next",

        tipInputNumber: "Please enter the number",
        tipInputNumberLimit: "The increase range is limited to 1-100",

        tipRowHeightLimit: "Row height must be between 0 ~ 545",
        tipColumnWidthLimit: "The column width must be between 0 ~ 2038",
        pageInfoFull: "Total ${total}，${totalPage} page，All data displayed",
    },
    currencyDetail: {
        RMB: "RMB",
        USdollar: "US dollar",
        EUR: "EUR",
        GBP: "GBP",
        HK: "HK",
        JPY: "JPY",
        AlbanianLek: "Albanian Lek",
        AlgerianDinar: "Algerian Dinar",
        Afghani: "Afghani",
        ArgentinePeso: "Argentine Peso",
        UnitedArabEmiratesDirham: "United Arab Emirates Dirham",
        ArubanFlorin: "Aruban Florin",
        OmaniRial: "Omani Rial",
        Azerbaijanimanat: "Azerbaijani manat",
        EgyptianPound: "Egyptian Pound",
        EthiopianBirr: "Ethiopian Birr",
        AngolaKwanza: "Angola Kwanza",
        AustralianDollar: "Australian Dollar",
        Patacas: "Patacas",
        BarbadosDollar: "Barbados Dollar",
        PapuaNewGuineaKina: "Papua New Guinea Kina",
        BahamianDollar: "Bahamian Dollar",
        PakistanRupee: "Pakistan Rupee",
        ParaguayanGuarani: "Paraguayan Guarani",
        BahrainiDinar: "Bahraini Dinar",
        PanamanianBalboa: "Panamanian Balboa",
        Brazilianreal: "Brazilian real",
        Belarusianruble: "Belarusian ruble",
        BermudianDollar: "Bermudian Dollar",
        BulgarianLev: "Bulgarian Lev",
        IcelandKrona: "Iceland Krona",
        BosniaHerzegovinaConvertibleMark: "Bosnia-Herzegovina Convertible Mark",
        PolishZloty: "Polish Zloty",
        Boliviano: "Boliviano",
        BelizeDollar: "Belize Dollar",
        BotswanaPula: "Botswana Pula",
        NotDannuzhamu: "Not Dannuzhamu",
        BurundiFranc: "Burundi Franc",
        NorthKoreanWon: "North Korean Won",
        DanishKrone: "Danish Krone",
        EastCaribbeanDollar: "East Caribbean Dollar",
        DominicaPeso: "Dominica Peso",
        RussianRuble: "Russian Ruble",
        EritreanNakfa: "Eritrean Nakfa",
        CFAfranc: "CFA franc",
        PhilippinePeso: "Philippine Peso",
        FijiDollar: "Fiji Dollar",
        CapeVerdeEscudo: "Cape Verde Escudo",
        FalklandIslandsPound: "Falkland Islands Pound",
        GambianDalasi: "Gambian Dalasi",
        Congolesefranc: "Congolese franc",
        ColombianPeso: "Colombian Peso",
        CostaRicanColon: "Costa Rican Colon",
        CubanPeso: "Cuban Peso",
        Cubanconvertiblepeso: "Cuban convertible peso",
        GuyanaDollar: "Guyana Dollar",
        KazakhstanTenge: "Kazakhstan Tenge",
        Haitiangourde: "Haitian gourde",
        won: "won",
        NetherlandsAntillesGuilder: "Netherlands Antilles Guilder",
        Honduraslempiras: "Honduras lempiras",
        DjiboutiFranc: "Djibouti Franc",
        KyrgyzstanSom: "Kyrgyzstan Som",
        GuineaFranc: "Guinea Franc",
        CanadianDollar: "Canadian Dollar",
        GhanaianCedi: "Ghanaian Cedi",
        Cambodianriel: "Cambodian riel",
        CzechKoruna: "Czech Koruna",
        ZimbabweDollar: "Zimbabwe Dollar",
        QatariRiyal: "Qatari Riyal",
        CaymanIslandsDollar: "Cayman Islands Dollar",
        Comorianfranc: "Comorian franc",
        KuwaitiDinar: "Kuwaiti Dinar",
        CroatianKuna: "Croatian Kuna",
        KenyanShilling: "Kenyan Shilling",
        LesothoLoti: "Lesotho Loti",
        LaoKip: "Lao Kip",
        LebanesePound: "Lebanese Pound",
        Lithuanianlitas: "Lithuanian litas",
        LibyanDinar: "Libyan Dinar",
        LiberianDollar: "Liberian Dollar",
        RwandaFranc: "Rwanda Franc",
        RomanianLeu: "Romanian Leu",
        MalagasyAriary: "Malagasy Ariary",
        MaldivianRufiyaa: "Maldivian Rufiyaa",
        MalawiKwacha: "Malawi Kwacha",
        MalaysianRinggit: "Malaysian Ringgit",
        MacedoniawearingDinar: "Macedonia wearing Dinar",
        MauritiusRupee: "Mauritius Rupee",
        MauritanianOuguiya: "Mauritanian Ouguiya",
        MongolianTugrik: "Mongolian Tugrik",
        BangladeshiTaka: "Bangladeshi Taka",
        PeruvianNuevoSol: "Peruvian Nuevo Sol",
        MyanmarKyat: "Myanmar Kyat",
        MoldovanLeu: "Moldovan Leu",
        MoroccanDirham: "Moroccan Dirham",
        MozambiqueMetical: "Mozambique Metical",
        MexicanPeso: "Mexican Peso",
        NamibianDollar: "Namibian Dollar",
        SouthAfricanRand: "South African Rand",
        SouthSudanesePound: "South Sudanese Pound",
        NicaraguaCordoba: "Nicaragua Cordoba",
        NepaleseRupee: "Nepalese Rupee",
        NigerianNaira: "Nigerian Naira",
        NorwegianKrone: "Norwegian Krone",
        GeorgianLari: "Georgian Lari",
        RMBOffshore: "RMB (Offshore)",
        SwedishKrona: "Swedish Krona",
        SwissFranc: "Swiss Franc",
        SerbianDinar: "Serbian Dinar",
        SierraLeone: "Sierra Leone",
        SeychellesRupee: "Seychelles Rupee",
        SaudiRiyal: "Saudi Riyal",
        SaoTomeDobra: "Sao Tome Dobra",
        SaintHelenapound: "Saint Helena pound",
        SriLankaRupee: "Sri Lanka Rupee",
        SwazilandLilangeni: "Swaziland Lilangeni",
        SudanesePound: "Sudanese Pound",
        Surinamesedollar: "Surinamese dollar",
        SolomonIslandsDollar: "Solomon Islands Dollar",
        SomaliShilling: "Somali Shilling",
        TajikistanSomoni: "Tajikistan Somoni",
        PacificFranc: "Pacific Franc",
        ThaiBaht: "Thai Baht",
        TanzanianShilling: "Tanzanian Shilling",
        TonganPaanga: "Tongan Pa'anga",
        TrinidadandTobagoDollar: "Trinidad and Tobago Dollar",
        TunisianDinar: "Tunisian Dinar",
        TurkishLira: "Turkish Lira",
        VanuatuVatu: "Vanuatu Vatu",
        GuatemalanQuetzal: "Guatemalan Quetzal",
        CommissionBolivar: "Commission Bolivar",
        BruneiDollar: "Brunei Dollar",
        UgandanShilling: "Ugandan Shilling",
        UkrainianHryvnia: "Ukrainian Hryvnia",
        UruguayanPeso: "Uruguayan Peso",
        Uzbekistansom: "Uzbekistan som",
        WesternSamoaTala: "Western Samoa Tala",
        SingaporeDollar: "Singapore Dollar",
        NT: "NT",
        NewZealandDollar: "New Zealand Dollar",
        HungarianForint: "Hungarian Forint",
        SyrianPound: "Syrian Pound",
        JamaicanDollar: "Jamaican Dollar",
        ArmenianDram: "Armenian Dram",
        YemeniRial: "Yemeni Rial",
        IraqiDinar: "Iraqi Dinar",
        IranianRial: "Iranian Rial",
        NewIsraeliShekel: "New Israeli Shekel",
        IndianRupee: "Indian Rupee",
        IndonesianRupiah: "Indonesian Rupiah",
        JordanianDinar: "Jordanian Dinar",
        VND: "VND",
        ZambianKwacha: "Zambian Kwacha",
        GibraltarPound: "Gibraltar Pound",
        ChileanPeso: "Chilean Peso",
        CFAFrancBEAC: "CFA Franc BEAC",
    },
    defaultFmt: [
        { text: "Automatic", value: "General", example: "" },
        { text: "Plain text", value: "@", example: "" },
        { text: "", value: "split", example: "" },
        { text: "Number", value: "##0.00", example: "1000.12" },
        { text: "Percent", value: "#0.00%", example: "12.21%" },
        { text: "Scientific", value: "0.00E+00", example: "1.01E+5" },
        { text: "", value: "split", example: "" },
        { text: "Accounting", value: "¥(0.00)", example: "¥(1200.09)" },

        { text: "Currency", value: "¥0.00", example: "¥1200.09" },

        { text: "", value: "split", example: "" },
        { text: "Date", value: "yyyy-MM-dd", example: "2017-11-29" },
        { text: "Time", value: "hh:mm AM/PM", example: "3:00 PM" },
        { text: "Time 24H", value: "hh:mm", example: "15:00" },
        { text: "Date time", value: "yyyy-MM-dd hh:mm AM/PM", example: "2017-11-29 3:00 PM" },
        { text: "Date time 24 H", value: "yyyy-MM-dd hh:mm", example: "2017-11-29 15:00" },
        { text: "", value: "split", example: "" },
        { text: "Custom formats", value: "fmtOtherSelf", example: "more" },
    ],
    dateFmtList: [
        {
            name: "1930-08-05",
            value: "yyyy-MM-dd",
        },
        {
            name: "1930/8/5",
            value: "yyyy/MM/dd",
        },
        {
            name: "08-05",
            value: "MM-dd",
        },
        {
            name: "8-5",
            value: "M-d",
        },
        {
            name: "13:30:30",
            value: "h:mm:ss",
        },
        {
            name: "13:30",
            value: "h:mm",
        },
        {
            name: "PM 01:30",
            value: "AM/PM hh:mm",
        },
        {
            name: "PM 1:30",
            value: "AM/PM h:mm",
        },
        {
            name: "PM 1:30:30",
            value: "AM/PM h:mm:ss",
        },
        {
            name: "08-05 PM 01:30",
            value: "MM-dd AM/PM hh:mm",
        },
    ],
    fontFamily: {
        MicrosoftYaHei: "YaHei",
    },
    fontarray: ["Times New Roman", "Arial", "Tahoma", "Verdana"],
    fontjson: { "times new roman": 0, arial: 1, tahoma: 2, verdana: 3 },
    border: {
        borderTop: "borderTop",
        borderBottom: "borderBottom",
        borderLeft: "borderLeft",
        borderRight: "borderRight",
        borderNone: "borderNone",
        borderAll: "borderAll",
        borderOutside: "borderOutside",
        borderInside: "borderInside",
        borderHorizontal: "borderHorizontal",
        borderVertical: "borderVertical",
        borderColor: "borderColor",
        borderSize: "borderSize",
    },
    merge: {
        mergeAll: "Merge all",
        mergeV: "Vertically",
        mergeH: "Horizontally",
        mergeCancel: "Unmerge",
        overlappingError: "Cannot merge overlapping areas",
        partiallyError: "Cannot perform this operation on partially merged cells",
    },
    align: {
        left: "left",
        center: "center",
        right: "right",

        top: "Top",
        middle: "Middle",
        bottom: "Bottom",
    },
    textWrap: {
        overflow: "Overflow",
        wrap: "Wrap",
        clip: "Clip",
    },
    rotation: {
        none: "None",
        angleup: "Tilt Up",
        angledown: "Tilt Down",
        vertical: "Stack Vertically",
        rotationUp: "Rotate Up",
        rotationDown: "Rotate Down",
    },
    freezen: {
        default: "Freeze",
        freezenRow: "First Row",
        freezenColumn: "First Column",
        freezenRC: "Both",
        freezenRowRange: "Freezen row range",
        freezenColumnRange: "Freezen column range",
        freezenRCRange: "Freezen both range",
        freezenCancel: "Cancel",

        noSeletionError: "No Range to be selected",
        rangeRCOverErrorTitle: "Freeze reminder",
        rangeRCOverError:
            "The frozen pane is beyond the visible range, which will lead to abnormal operation. Please reset the frozen area.",
    },
    sort: {
        asc: "Ascending ",
        desc: "Descending ",
        custom: "Custom sort",

        hasTitle: "Data has a header row",
        sortBy: "Sort by",
        addOthers: "Add another sort column",
        close: "close",
        confirm: "sort",

        columnOperation: "Column",
        secondaryTitle: "then by",

        sortTitle: "Sort range",

        sortRangeTitle: "Sort range from",
        sortRangeTitleTo: "to",

        noRangeError:
            "Cannot perform this operation on multiple selection areas, please select a single range and try again",
        mergeError: "There are merged cells in the selection, this operation cannot be performed!",
        columnSortMergeError:
            "Column sorting will extend to the entire table selection. There are merged cells, this operation cannot be performed. Please use the sort feature in the toolbar.",
    },
    filter: {
        filter: "create filter",

        sortByAsc: "Sort A-Z",
        sortByDesc: "Sort Z-A",
        filterByColor: "Filter by color",
        filterByCondition: "Filter by condition",
        filterByValues: "Filter by values",

        filiterInputNone: "None",

        filiterInputTip: "Enter filter value",
        filiterRangeStart: "",
        filiterRangeStartTip: "Value for formula",
        filiterRangeEnd: "and",
        filiterRangeEndTip: "Value for formula",

        filterValueByAllBtn: "Check all",
        filterValueByClearBtn: "Clear",
        filterValueByInverseBtn: "Inverse",
        filterValueByTip: "filter By Values",
        filterConform: "Confirm",
        filterCancel: "Cancel",
        clearFilter: "Clear filter",

        conditionNone: "None",
        conditionCellIsNull: "Is empty",
        conditionCellNotNull: "Is not empty",
        conditionCellTextContain: "Text contains",
        conditionCellTextNotContain: "Text does not contain",
        conditionCellTextStart: "Text starts with",
        conditionCellTextEnd: "Text ends with",
        conditionCellTextEqual: "Text is exactly",
        conditionCellDateEqual: "Date is",
        conditionCellDateBefore: "Date is before",
        conditionCellDateAfter: "Date is after",
        conditionCellGreater: "Greater than",
        conditionCellGreaterEqual: "Greater than or equal to",
        conditionCellLess: "Less than",
        conditionCellLessEqual: "Less than or equal to",
        conditionCellEqual: "Is equal to",
        conditionCellNotEqual: "Is not equal to",
        conditionCellBetween: "Is between",
        conditionCellNotBetween: "Is not between",

        filiterMoreDataTip: "Big amount of data! please wait",
        filiterMonthText: "Month",
        filiterYearText: "Year",
        filiterByColorTip: "Filter by cell color",
        filiterByTextColorTip: "Filter by font color",
        filterContainerOneColorTip: "This column contains only one color",
        filterDateFormatTip: "Date format",

        valueBlank: "(Null)",
        mergeError: "There are merged cells in the filter selection, this operation cannot be performed!",
    },
    rightclick: {
        copy: "Copy",
        copyAs: "Copy as",
        paste: "Paste",
        insert: "Insert",
        delete: "Delete",
        deleteCell: "Delete cell",
        deleteSelected: "Delete selected ",
        hide: "Hide",
        hideSelected: "Hide selected ",
        showHide: "Show hidden ",
        to: "Towards",
        left: "Left",
        right: "Right",
        top: "Top",
        bottom: "Bottom",
        moveLeft: "Move left",
        moveUp: "Move up",
        add: "Add",
        row: "Row",
        column: "Column",
        width: "Width",
        height: "Height",
        number: "Number",
        confirm: "Confirm",
        orderAZ: "A-Z order",
        orderZA: "Z-A order",
        clearContent: "Clear content",
        matrix: "Matrix operation",
        sortSelection: "Sort",
        filterSelection: "Filter",
        chartGeneration: "Create chart",
        firstLineTitle: "first line title",
        untitled: "untitled",
        array1: "One-dimensional array",
        array2: "Two-dimensional array",
        array3: "Multidimensional Arrays",
        diagonal: "Diagonal",
        antiDiagonal: "Anti-diagonal",
        diagonalOffset: "Diagonal offset",
        offset: "Offset",
        boolean: "Boolean",
        flip: "Flip",
        upAndDown: "Up and down",
        leftAndRight: "Left and right",
        clockwise: "Clockwise",
        counterclockwise: "Counterclockwise",
        transpose: "Transpose",
        matrixCalculation: "Matrix calculation",
        plus: "Plus",
        minus: "Minus",
        multiply: "Multiply",
        divided: "Divided",
        power: "Power",
        root: "Root",
        log: "Log",
        delete0: "Delete 0 values at both ends",
        removeDuplicate: "Remove duplicate values",
        byRow: "By row",
        byCol: "By column",
        generateNewMatrix: "Generate new matrix",
    },
    comment: {
        insert: "Insert",
        edit: "Edit",
        delete: "Delete",
        showOne: "Show/Hide",
        showAll: "Show/Hide All",
    },
    screenshot: {
        screenshotTipNoSelection: "Please select the scope of the screenshot",
        screenshotTipTitle: "Warning！",
        screenshotTipHasMerge: "This operation cannot be performed on merged cells",
        screenshotTipHasMulti: "This operation cannot be performed on multiple selection regions",
        screenshotTipSuccess: "Successful",
        screenshotImageName: "Screenshot",

        downLoadClose: "Close",
        downLoadCopy: "Copy to clipboard",
        downLoadBtn: "Download",
        browserNotTip: "not supported by IE browser!",
        rightclickTip: 'Please right-click "copy" on the picture',
        successTip: 'Successfully (if pasting fails, please right-click on the image to "copy image")',
    },
    splitText: {
        splitDelimiters: "Delimiters",
        splitOther: "Other",
        splitContinueSymbol: "Consecutive separators are treated as a single",
        splitDataPreview: "Preview",
        splitTextTitle: "Split text",
        splitConfirmToExe: "There is already data here, do you want to replace it?",

        tipNoMulti:
            "Cannot perform this operation on multiple selection areas, please select a single area and try again",
        tipNoMultiColumn:
            "Only one column of data can be converted at a time. The selected area can have multiple rows but not multiple columns. Please try again after selecting a single column range",
    },
    imageText: {
        imageSetting: "Image setting",
        close: "Close",
        conventional: "Conventional",
        moveCell1: "Move and resize cells",
        moveCell2: "Move and do not resize the cell",
        moveCell3: "Do not move and resize the cell",
        fixedPos: "Fixed position",
        border: "Border",
        width: "Width",
        radius: "Radius",
        style: "Style",
        solid: "Solid",
        dashed: "Dashed",
        dotted: "Dotted",
        double: "Double",
        color: "Color",
    },
    punctuation: {
        tab: "Tab",
        semicolon: "semicolon",
        comma: "comma",
        space: "space",
    },
    findAndReplace: {
        find: "Find",
        replace: "Replace",
        goto: "Go to",
        location: "Location",
        formula: "Formula",
        date: "Date",
        number: "Number",
        string: "String",
        error: "Error",
        condition: "Condition",
        rowSpan: "Row span",
        columnSpan: "Column span",
        locationExample: "Location",
        lessTwoRowTip: "Please select at least two rows",
        lessTwoColumnTip: "Please select at least two columns",

        findTextbox: "Find Content",
        replaceTextbox: "Replace Content",

        regexTextbox: "Regular Expression",
        wholeTextbox: "Whole word",
        distinguishTextbox: "Case sensitive",

        allReplaceBtn: "Replace All",
        replaceBtn: "Replace",
        allFindBtn: "Find All",
        findBtn: "Find next",

        noFindTip: "The content was not found",
        modeTip: "This operation is not available in this mode",

        searchTargetSheet: "Sheet",
        searchTargetCell: "Cell",
        searchTargetValue: "Value",

        searchInputTip: "Please enter the search content",

        noReplceTip: "There is nothing to replace",
        noMatchTip: "No match found",

        successTip: "${xlength} items found",

        locationConstant: "Constant",
        locationFormula: "Formula",
        locationDate: "Date",
        locationDigital: "Number",
        locationString: "String",
        locationBool: "Logical",
        locationError: "Error",
        locationNull: "Null",
        locationCondition: "Conditional format",
        locationRowSpan: "Row span",
        locationColumnSpan: "Column span",

        locationTiplessTwoRow: "Please select at least two rows",
        locationTiplessTwoColumn: "Please select at least two columns",
        locationTipNotFindCell: "Cell not found",
    },
    sheetconfig: {
        delete: "Delete",
        copy: "Copy",
        rename: "Rename",
        changeColor: "Change color",
        hide: "Hide",
        unhide: "Unhide",
        moveLeft: "Move left",
        moveRight: "Move right",
        resetColor: "Reset color",
        cancelText: "Cancel",
        chooseText: "Confirm color",

        tipNameRepeat: "The name of the tab page cannot be repeated! Please revise",
        noMoreSheet:
            "The workbook contains at least one visual worksheet. To delete the selected worksheet, please insert a new worksheet or show a hidden worksheet.",
        confirmDelete: "Are you sure to delete",
        redoDelete: "Can be undo by Ctrl+Z",
        noHide: "Can't hide, at least keep one sheet tag",
        chartEditNoOpt: "This operation is not allowed in chart editing mode!",
        sheetNameSpecCharError: "The name cannot contain:[ ] :  ? * / ' \"",
        sheetNamecannotIsEmptyError: "Sheet name cannot be empty",
    },
    conditionformat: {
        conditionformat_greaterThan: "Conditionformat-GreaterThan",
        conditionformat_greaterThan_title: "Format cells greater than",
        conditionformat_lessThan: "Conditionformat-LessThan",
        conditionformat_lessThan_title: "Format cells smaller than",
        conditionformat_betweenness: "Conditionformat-Betweenness",
        conditionformat_betweenness_title: "Format cells with values between",
        conditionformat_equal: "Conditionformat-Equal",
        conditionformat_equal_title: "Format cells equal to",
        conditionformat_textContains: "Conditionformat-TextContains",
        conditionformat_textContains_title: "Format cells containing the following text",
        conditionformat_occurrenceDate: "Conditionformat-OccurrenceDate",
        conditionformat_occurrenceDate_title: "Format cells containing the following dates",
        conditionformat_duplicateValue: "Conditionformat-DuplicateValue",
        conditionformat_duplicateValue_title: "Format cells containing the following types of values",
        conditionformat_top10: "Conditionformat-Top10",
        conditionformat_top10_percent: "Conditionformat-Top10%",
        conditionformat_top10_title: "Format the cells with the highest value",
        conditionformat_last10: "Conditionformat-Last10",
        conditionformat_last10_percent: "Conditionformat-Last10%",
        conditionformat_last10_title: "Format the cells with the smallest value",
        conditionformat_AboveAverage: "Conditionformat-AboveAverage",
        conditionformat_AboveAverage_title: "Format cells above average",
        conditionformat_SubAverage: "Conditionformat-SubAverage",
        conditionformat_SubAverage_title: "Format cells below average",
        rule: "Rule",
        newRule: "New rule",
        editRule: "Edit rule",
        deleteRule: "Delete rule",
        deleteCellRule: "Delete cell rule",
        deleteSheetRule: "Delete sheet rule",
        manageRules: "Management rules",
        showRules: "Show its formatting rules",
        highlightCellRules: "Highlight cell rules",
        itemSelectionRules: "Item selection rules",
        conditionformatManageRules: "Conditional Formatting Rule Manager",
        format: "Format",
        setFormat: "Set format",
        setAs: "Set as",
        setAsByArea: "For the selected area, set to",
        applyRange: "Apply range",
        selectRange: "Select application range",
        selectRange_percent: "Percentage of selected range",
        selectRange_average: "Average value of selected range",
        selectRange_value: "Value in the selected range",
        pleaseSelectRange: "Please select application range",
        selectDataRange: "Select data range",
        selectCell: "select cell",
        pleaseSelectCell: "Please select cell",
        pleaseSelectADate: "Please select a date",
        pleaseEnterInteger: "Please enter an integer between 1 and 1000",
        onlySingleCell: "Only a single cell can be referenced",
        conditionValueCanOnly: "The condition value can only be a number or a single cell",
        ruleTypeItem1: "Format all cells based on their respective values",
        ruleTypeItem2: "Only format cells that contain",
        ruleTypeItem2_title: "Only for cells that meet the following conditions",
        ruleTypeItem3: "Format only the top or bottom numbers",
        ruleTypeItem3_title: "Is the value in the following ranking",
        ruleTypeItem4: "Format only values above or below the average",
        ruleTypeItem4_title: "Is a value that satisfies the following conditions",
        ruleTypeItem5: "Format only unique or repeated values",
        ruleTypeItem6: "Use formulas to determine which cells to format",
        formula: "Formula",
        textColor: "Text color",
        cellColor: "Cell color",
        confirm: "Confirm",
        confirmColor: "Confirm color",
        cancel: "Cancel",
        close: "Close",
        clearColorSelect: "Clear color select",
        sheet: "Sheet",
        currentSheet: "Current Sheet",
        dataBar: "data bar",
        dataBarColor: "data bar color",
        gradientDataBar_1: "Blue-white gradient data bar",
        gradientDataBar_2: "Green-white gradient data bar",
        gradientDataBar_3: "Red-white gradient data bar",
        gradientDataBar_4: "Orange-white gradient stripes",
        gradientDataBar_5: "Light blue-white gradient stripes",
        gradientDataBar_6: "Purple-white gradient data bar",
        solidColorDataBar_1: "Blue data bar",
        solidColorDataBar_2: "Green data bar",
        solidColorDataBar_3: "Red data bar",
        solidColorDataBar_4: "Orange data bar",
        solidColorDataBar_5: "Light blue data bar",
        solidColorDataBar_6: "Purple data bar",
        colorGradation: "color gradation",
        colorGradation_1: "Green-yellow-red color gradation",
        colorGradation_2: "Red-yellow-green color gradation",
        colorGradation_3: "Green-white-red color gradation",
        colorGradation_4: "Red-white-green color gradation",
        colorGradation_5: "Blue-white-red color gradation",
        colorGradation_6: "Red-white-blue color gradation",
        colorGradation_7: "White-red color gradation",
        colorGradation_8: "Red-white color gradation",
        colorGradation_9: "Green-white color gradation",
        colorGradation_10: "White-green color gradation",
        colorGradation_11: "Green-yellow color gradation",
        colorGradation_12: "Yellow-green color gradation",
        icons: "icons",
        pleaseSelectIcon: "Please click to select a group of icons:",
        cellValue: "Cell value",
        specificText: "Specific text",
        occurrence: "Date",
        greaterThan: "Greater than",
        lessThan: "Less than",
        between: "Between",
        equal: "Equal",
        in: "In",
        between2: "",
        contain: "Contain",
        textContains: "Text contains",
        duplicateValue: "Duplicate value",
        uniqueValue: "Unique value",
        top: "Top",
        top10: "Top 10",
        top10_percent: "Top 10%",
        last: "Last",
        last10: "Last 10",
        last10_percent: "Last 10%",
        oneself: "",
        above: "Above",
        aboveAverage: "Above average",
        below: "Below",
        belowAverage: "Below average",
        all: "All",
        yesterday: "YTD",
        today: "Today",
        tomorrow: "Tomorrow",
        lastWeek: "Last week",
        thisWeek: "This week",
        lastMonth: "Last month",
        thisMonth: "This month",
        lastYear: "Last year",
        thisYear: "This year",
        last7days: "Last 7 days",
        last30days: "Last 30 days",
        next7days: "Next 7 days",
        next30days: "Next 30 days",
        next60days: "Next 60 days",
        chooseRuleType: "Choose rule type",
        editRuleDescription: "Edit rule description",
        newFormatRule: "New format rule",
        editFormatRule: "Edit format rule",
        formatStyle: "Style",
        fillType: "Fill",
        color: "Color",
        twocolor: "Two-color",
        tricolor: "Tricolor",
        multicolor: "Multi color",
        grayColor: "Gray color",
        gradient: "Gradient",
        solid: "Solid",
        maxValue: "Max value",
        medianValue: "Median value",
        minValue: "Min value",
        direction: "Direction",
        threeWayArrow: "Three-way arrow",
        fourWayArrow: "Four-way arrow",
        fiveWayArrow: "Five-way arrow",
        threeTriangles: "Three triangles",
        shape: "Shape",
        threeColorTrafficLight: "Three-color traffic light",
        fourColorTrafficLight: "Four-color traffic light",
        threeSigns: "Three signs",
        greenRedBlackGradient: "Green-red-black gradient",
        rimless: "Rimless",
        bordered: "Bordered",
        mark: "Mark",
        threeSymbols: "Three symbols",
        tricolorFlag: "Tricolor flag",
        circled: "Circled",
        noCircle: "No circle",
        grade: "Grade",
        grade4: "4 Grade",
        grade5: "5 Grade",
        threeStars: "3 Stars",
        fiveQuadrantDiagram: "Five-quadrant diagram",
        fiveBoxes: "5 Boxes",
    },
    insertLink: {
        linkText: "Text",
        linkType: "Link type",
        external: "External link",
        internal: "Internal link",
        linkAddress: "Link address",
        linkSheet: "Worksheet",
        linkCell: "Cell reference",
        linkTooltip: "Tooltip",
        placeholder1: "Please enter the web link address",
        placeholder2: "Please enter the cell to be quoted, example A1",
        placeholder3: "Please enter the prompt content",
        tooltipInfo1: "Please enter a valid link",
        tooltipInfo2: "Please enter the correct cell reference",
    },
    dataVerification: {
        cellRange: "Cell range",
        selectCellRange: "Click to select a cell range",
        selectCellRange2: "Please select a range of cells",
        verificationCondition: "Verification condition",
        allowMultiSelect: "Allow multiple selection",
        dropdown: "drop-down list",
        checkbox: "Checkbox",
        number: "Number",
        number_integer: "Number-integer",
        number_decimal: "Number-decimal",
        text_content: "Text-content",
        text_length: "Text-length",
        date: "Date",
        validity: "Effectiveness",
        placeholder1: "Please enter the options, separated by commas, such as 1,2,3,4,5",
        placeholder2: "Please enter content",
        placeholder3: "Numeric value, such as 10",
        placeholder4: "Please enter the specified text",
        placeholder5: "Please enter the prompt displayed when the cell is selected",
        selected: "Selected",
        notSelected: "Not selected",
        between: "Between",
        notBetween: "Not between",
        equal: "Equal",
        notEqualTo: "Not equal to",
        moreThanThe: "More than the",
        lessThan: "Less than",
        greaterOrEqualTo: "Greater or equal to",
        lessThanOrEqualTo: "Less than or equal to",
        include: "Include",
        exclude: "Exclude",
        earlierThan: "Earlier than",
        noEarlierThan: "No earlier than",
        laterThan: "Later than",
        noLaterThan: "No later than",
        identificationNumber: "Identification number",
        phoneNumber: "Phone number",
        remote: "Automatic remote acquisition option",
        prohibitInput: "Prohibit input when input data is invalid",
        hintShow: "Show prompt when the cell is selected",
        deleteVerification: "Delete verification",
        tooltipInfo1: "The drop-down list option cannot be empty",
        tooltipInfo2: "Checkbox content cannot be empty",
        tooltipInfo3: "The value entered is not a numeric type",
        tooltipInfo4: "The value 2 cannot be less than the value 1",
        tooltipInfo5: "The text content cannot be empty",
        tooltipInfo6: "The value entered is not a date type",
        tooltipInfo7: "Date 2 cannot be less than date 1",
        textlengthInteger: "Text length must be an integer greater than or equal to 0",
    },
    formula: {
        sum: "Sum",
        average: "Average",
        count: "Count",
        max: "Max",
        min: "Min",
        ifGenerate: "If formula generator",
        find: "Learn more",

        tipNotBelongToIf: "This cell function does not belong to the if formula!",
        tipSelectCell: "Please select the cell to insert the function",

        ifGenCompareValueTitle: "Comparison value",
        ifGenSelectCellTitle: "Click to select cell",
        ifGenRangeTitle: "Range",
        ifGenRangeTo: "to",
        ifGenRangeEvaluate: "Range evaluate",
        ifGenSelectRangeTitle: "Click to select range",
        ifGenCutWay: "Partition way",
        ifGenCutSame: "Same Partition value",
        ifGenCutNpiece: "Partition by N",
        ifGenCutCustom: "Custom",
        ifGenCutConfirm: "Confirm",

        ifGenTipSelectCell: "Select cells",
        ifGenTipSelectCellPlace: "Please select cells",

        ifGenTipSelectRange: "Select range",
        ifGenTipSelectRangePlace: "Please select range",

        ifGenTipNotNullValue: "The comparison value cannot be empty!",
        ifGenTipLableTitile: "Label",
        ifGenTipRangeNotforNull: "The range cannot be empty!",
        ifGenTipCutValueNotforNull: "The partition value cannot be empty!",
        ifGenTipNotGenCondition: "No conditions are available for generation!",
    },
    formulaMore: {
        valueTitle: "Value",
        tipSelectDataRange: "Select data range",
        tipDataRangeTile: "Data range",
        findFunctionTitle: "Search function",
        tipInputFunctionName: "Function name or brief description of function",

        Array: "Array",
        Database: "Database",
        Date: "Date",
        Engineering: "Engineering",
        Filter: "Filter",
        Financial: "Financial",
        luckysheet: "Luckysheet",
        other: "Other",
        Logical: "Logical",
        Lookup: "Lookup",
        Math: "Math",
        Operator: "Operator",
        Parser: "Parser",
        Statistical: "Statistical",
        Text: "Text",
        dataMining: "Data Mining",

        selectFunctionTitle: "Select a function",
        calculationResult: "Result",

        tipSuccessText: "Success",
        tipParamErrorText: "Parameter type error",

        helpClose: "Close",
        helpCollapse: "Collapse",
        helpExample: "Example",
        helpAbstract: "Abstract",

        execfunctionError: "Error in the formula",
        execfunctionSelfError: "The formula cannot refer to its own cell",
        execfunctionSelfErrorResult:
            "The formula cannot refer to its own cell, which will lead to inaccurate calculation results",

        allowRepeatText: "Repeat",
        allowOptionText: "Option",

        selectCategory: "Or select a category",
    },
    drag: {
        noMerge: "Cannot perform this operation on merged cells",
        affectPivot: "This change cannot be made to the selected cell because it will affect the pivot table!",
        noMulti: "Cannot perform this operation on multiple selection areas, please select a single area",
        noPaste: "Unable to paste this content here, please select a cell in the paste area and try to paste again",
        noPartMerge: "Cannot perform this operation on partially merged cells",

        inputCorrect: "Please enter the correct value",
        notLessOne: "The number of rows and columns cannot be less than 1",
        offsetColumnLessZero: "The offset column cannot be negative!",

        pasteMustKeybordAlert: "Copy and paste in the Sheet: Ctrl + C to copy, Ctrl + V to paste, Ctrl + X to cut",
        pasteMustKeybordAlertHTMLTitle: "Copy and paste in the Sheet",
        pasteMustKeybordAlertHTML:
            "<span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + C</span>&nbsp;&nbsp;to copy<br/><span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + V</span>&nbsp;&nbsp;to paste<br/><span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + X</span>&nbsp;&nbsp;to cut",
    },
    paste: {
        warning: "Warning",
        errorNotAllowMulti:
            "Cannot perform this operation on multiple selection areas, please select a single range and try again",
        errorNotAllowMerged: "Cannot make partial changes to merged cells",
    },
    pivotTable: {
        title: "Pivot Table",
        closePannel: "Close",
        editRange: "Range",
        tipPivotFieldSelected: "Select the fields",
        tipClearSelectedField: "Clear all fields",
        btnClearSelectedField: "Clear",
        btnFilter: "Filter",
        titleRow: "Row",
        titleColumn: "Column",
        titleValue: "Value",
        tipShowColumn: "Statistics fields are displayed as columns",
        tipShowRow: "Statistics fields are displayed as rows",

        titleSelectionDataRange: "Select range",
        titleDataRange: "Data range",

        valueSum: "SUM",

        valueStatisticsSUM: "Sum",
        valueStatisticsCOUNT: "Count",
        valueStatisticsCOUNTA: "Count A",
        valueStatisticsCOUNTUNIQUE: "Count Unique",
        valueStatisticsAVERAGE: "Average",
        valueStatisticsMAX: "Max",
        valueStatisticsMIN: "Min",
        valueStatisticsMEDIAN: "Median",
        valueStatisticsPRODUCT: "Product",
        valueStatisticsSTDEV: "Stdev",

        valueStatisticsSTDEVP: "Stdevp",
        valueStatisticslet: "Var",
        valueStatisticsVARP: "VarP",

        errorNotAllowEdit: "This operation is prohibited in non-editing mode!",
        errorNotAllowMulti:
            "Cannot perform this operation on multiple selection areas, please select a single range and try again",
        errorSelectRange: "Please select the range of the new pivot table",
        errorIsDamage: "The source data of this pivot table is corrupted!",
        errorNotAllowPivotData: "Cannot select pivot table as source data!",
        errorSelectionRange: "Selection failed, wrong input range!",
        errorIncreaseRange: "Please expand the selected range!",

        titleAddColumn: "Add column to pivot table",
        titleMoveColumn: "Move the column to the white box below",
        titleClearColumnFilter: "Clear the filter for this column",
        titleFilterColumn: "Filter",

        titleSort: "Sort",
        titleNoSort: "No sort",
        titleSortAsc: "ASC",
        titleSortDesc: "DESC",
        titleSortBy: "Sort by",
        titleShowSum: "Show total",
        titleStasticTrue: "Yes",
        titleStasticFalse: "No",
    },
    dropCell: {
        copyCell: "Copy",
        sequence: "Sequence",
        onlyFormat: "Only format",
        noFormat: "Not format",
        day: "Day",
        workDay: "Work Day",
        month: "Month",
        year: "Year",
        chineseNumber: "Chinese numbers",
    },
    imageCtrl: {
        borderTile: "Image border color",
        borderCur: "Color",
    },
    protection: {
        protectiontTitle: "Protection",
        enterPassword: "Enter a password (optional)",
        enterHintTitle: "Prompt when editing is prohibited (optional)",
        enterHint:
            "The cell or chart you are trying to change is in a protected worksheet. If you want to change it, please unprotect the worksheet. You may need to enter a password",
        swichProtectionTip: "Protect the sheet and contents of locked cells",
        authorityTitle: "Allow users of this sheet to:",
        selectLockedCells: "Select locked cells",
        selectunLockedCells: "Select unlocked cells",
        formatCells: "Format cells",
        formatColumns: "Format columns",
        formatRows: "Format rows",
        insertColumns: "Insert columns",
        insertRows: "Insert rows",
        insertHyperlinks: "Insert hyperlinks",
        deleteColumns: "Delete columns",
        deleteRows: "Delete rows",
        sort: "Sort",
        filter: "Filter",
        usePivotTablereports: "Use Pivot Table reports",
        editObjects: "Edit objects",
        editScenarios: "Edit scenarios",

        allowRangeTitle: "Allow users of range to:",
        allowRangeAdd: "New...",

        allowRangeAddTitle: "Title",
        allowRangeAddSqrf: "Reference",
        selectCellRange: "Click to select a cell range",
        selectCellRangeHolder: "Cell range",
        allowRangeAddTitlePassword: "Password",
        allowRangeAddTitleHint: "Prompt",
        allowRangeAddTitleHintTitle: "Prompt when a password is set (optional)",
        allowRangeAddtitleDefault: "Input range name",

        rangeItemDblclick: "Double click to edit",
        rangeItemHasPassword: "Has password",

        rangeItemErrorTitleNull: "Title is null",
        rangeItemErrorRangeNull: "Reference is null",
        rangeItemErrorRange: "Reference is error",

        validationTitle: "Password validation",
        validationTips: "Need to enter a password to unlock the protection of the worksheet",
        validationInputHint: "Enter a password",

        checkPasswordNullalert: "Password is required!",
        checkPasswordWrongalert: "Incorrect password, please try again!",

        checkPasswordSucceedalert: "Unlock Succeed!",
        defaultRangeHintText: "The cell is being password protected.",
        defaultSheetHintText:
            "The cell or chart is in a protected worksheet. To make changes, please unprotect the worksheet. You may need to enter a password",
    },
    cellFormat: {
        cellFormatTitle: "Format cells",
        protection: "Protection",
        locked: "Locked",
        hidden: "Hidden",
        protectionTips:
            "To lock cells or hide formulas, protect the worksheet. On the toolbar, Click Protect Sheet Button",
        tipsPart: "Partial checked",
        tipsAll: "All checked",

        selectionIsNullAlert: "Selection is required!",
        sheetDataIsNullAlert: "error, Data is none!",
    },
    print: {
        normalBtn: "Normal",
        layoutBtn: "Page Layout",
        pageBtn: "Page break preview",

        menuItemPrint: "Print (Ctrl+P)",
        menuItemAreas: "Print areas",
        menuItemRows: "Print title rows",
        menuItemColumns: "Print title columns",
        suggest: "Any suggestions for the print function?",
        range: "Print Range",
        size: "Paper Size",
        direction: "Print Direction",
        horizontal: "Horizontal",
        vertical: "Vertical",
        title: "Print Setup",
        current: "Current Sheet",
        area: "Selected Range",
        letter: "letter",
        paper: "tabloid paper",
        law: "official paper",
        admin: "administrative paper",
        expire: "expired",
        remain: "remaining days",
        error: "error",
        showLine: "show grid line",
        show: "show",
        hide: "hide",
        preview: "preview",
    },
    edit: {
        typing: "typing",
    },
    websocket: {
        success: "WebSocket connection success",
        refresh: "An error occurred in the WebSocket connection, please refresh the page!",
        wait: "An error occurred in the WebSocket connection, please be patient!",
        close: "WebSocket connection closed",
        contact:
            "Server communication error occurred, please refresh the page and try again, if not, please contact the administrator!",
        support: "The current browser does not support WebSocket",
    },
    exportXlsx: {
        notice: "Please configure the export plugin",
        serverError: "server is under maintenance",
        title: "Export XLSX",
        range: "Range",
        currentSheet: "Current sheet",
        allSheets: "All sheets",
    },
};
