import menuButton from './menuButton';
import formula from '../global/formula';
import Store from '../store';
import flatpickr from 'flatpickr'
import dayjs from "dayjs";
import {Mandarin} from "flatpickr/dist/l10n/zh"

const cellDatePickerCtrl = {
    cellFocus: function(r, c, value){
        let row = Store.visibledatarow[r],
            row_pre = r == 0 ? 0 : Store.visibledatarow[r - 1];
        let col = Store.visibledatacolumn[c],
            col_pre = c == 0 ? 0 : Store.visibledatacolumn[c - 1];

        let margeset = menuButton.mergeborer(Store.flowdata, r, c);
        if(!!margeset){
            row = margeset.row[1];
            row_pre = margeset.row[0];

            col = margeset.column[1];
            col_pre = margeset.column[0];
        }

        $(".cell-date-picker").show().css({
            width: col - col_pre + 1,
            height: row - row_pre + 1,
            left: col_pre,
            top: row_pre
        })

        flatpickr('#cellDatePickerBtn',{
            locale: Mandarin,
            dateFormat: "YYYY-MM-DD",
            parseDate: (datestr, format) => {
                return dayjs(datestr).toDate();
            },
            formatDate: (date, format, locale) => {
                return dayjs(date).format(format);
            },
            onChange: function (selectedDates, dateStr, instance) {
                console.log(selectedDates, dateStr)
                $("#luckysheet-rich-text-editor").html(dateStr);
                formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
            }
        });

        $("#cellDatePickerBtn").click();
    },
}

export default cellDatePickerCtrl;
