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

        let maxColumlen = 120;

        for (let i = 0; i < colwidth; i++) {
            let firstcolumlen = Store.defaultcollen;

            if (Store.config["columlen"] != null && Store.config["columlen"][i] != null) {
                firstcolumlen = Store.config["columlen"][i];
            }
            else {
                if (Store.flowdata[0] != null && Store.flowdata[0][i] != null) {
                    if (firstcolumlen > 300) {
                        firstcolumlen = 300;
                    }
                    else if (firstcolumlen < Store.defaultcollen) {
                        firstcolumlen = Store.defaultcollen;
                    }

                    if (firstcolumlen != Store.defaultcollen) {
                        if (Store.config["columlen"] == null) {
                            Store.config["columlen"] = {};
                        }

                        Store.config["columlen"][i] = firstcolumlen;
                    }
                }
            }

            Store.ch_width += firstcolumlen + 1;

            Store.visibledatacolumn.push(Store.ch_width);//列的临时长度分布

            if(maxColumlen < firstcolumlen + 1){
                maxColumlen = firstcolumlen + 1;
            }
        }
        
        // Store.ch_width += 120;
        Store.ch_width += maxColumlen;
    }
}