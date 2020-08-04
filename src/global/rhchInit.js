import Store from '../store';

export default function rhchInit(rowheight, colwidth) {
    //行高
    if(rowheight != null){
        Store.visibledatarow = [];
        Store.rh_height = 0;

        for (let i = 0; i < rowheight; i++) {
            let rowlen = Store.defaultrowlen;

            if (Store.config["rowlen"] != null && Store.config["rowlen"][i] != null) {
                rowlen = Store.config["rowlen"][i];
            }

            if (Store.config["rowhidden"] != null && Store.config["rowhidden"][i] != null) {
                rowlen = Store.config["rowhidden"][i];
                Store.visibledatarow.push(Store.rh_height);
                continue;
            }
            else {
                Store.rh_height += rowlen + 1;
            }

            Store.visibledatarow.push(Store.rh_height); //行的临时长度分布
        }

        Store.rh_height += 110;  //最底部增加空白
    }

    //列宽
    if(colwidth != null){
        Store.visibledatacolumn = [];
        Store.ch_width = 0;

        let maxColumnlen = 120;

        for (let i = 0; i < colwidth; i++) {
            let firstcolumnlen = Store.defaultcollen;

            if (Store.config["columnlen"] != null && Store.config["columnlen"][i] != null) {
                firstcolumnlen = Store.config["columnlen"][i];
            }
            else {
                if (Store.flowdata[0] != null && Store.flowdata[0][i] != null) {
                    if (firstcolumnlen > 300) {
                        firstcolumnlen = 300;
                    }
                    else if (firstcolumnlen < Store.defaultcollen) {
                        firstcolumnlen = Store.defaultcollen;
                    }

                    if (firstcolumnlen != Store.defaultcollen) {
                        if (Store.config["columnlen"] == null) {
                            Store.config["columnlen"] = {};
                        }

                        Store.config["columnlen"][i] = firstcolumnlen;
                    }
                }
            }

            Store.ch_width += firstcolumnlen + 1;

            Store.visibledatacolumn.push(Store.ch_width);//列的临时长度分布

            if(maxColumnlen < firstcolumnlen + 1){
                maxColumnlen = firstcolumnlen + 1;
            }
        }
        
        // Store.ch_width += 120;
        Store.ch_width += maxColumnlen;
    }
}