import functionlist from "./functionListDescriptor";

export default (localeFunctionList) => {
    functionlist.forEach(f => {
        const localeFunction = localeFunctionList[f.n];
        f.d = localeFunction.d;
        f.a = localeFunction.a;
        f.p.forEach((p, i) => {
            Object.assign(p, localeFunction.p[i]);
        });
    });

    return functionlist;
}


