import { numFormat } from '../utils/util';

const analysis = {
    "STDEVP": function (mean, array1d) {
        let cov = 0;
        for (let i = 0; i < array1d.length; i++) {
            let xi = array1d[i];
            cov += Math.pow(xi - mean, 2);
        }
        return numFormat(Math.sqrt(cov / array1d.length));
    },
    "STDEV": function (mean, array1d) {
        let cov = 0;
        for (let i = 0; i < array1d.length; i++) {
            let xi = array1d[i];
            cov += Math.pow(xi - mean, 2);
        }
        return numFormat(Math.sqrt(cov / (array1d.length - 1)));
    },
    "VARP": function (mean, array1d) {
        let cov = 0;
        for (let i = 0; i < array1d.length; i++) {
            let xi = array1d[i];
            cov += Math.pow(xi - mean, 2);
        }
        return numFormat(cov / array1d.length);
    },
    "let": function (mean, array1d) {
        let cov = 0;
        for (let i = 0; i < array1d.length; i++) {
            let xi = array1d[i];
            cov += Math.pow(xi - mean, 2);
        }
        return numFormat(cov / (array1d.length - 1));
    },
};

export default analysis;