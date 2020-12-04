import menuButton from './menuButton';
import formula from '../global/formula';
import Store from '../store';
import flatpickr from 'flatpickr'
import dayjs from "dayjs";
import { update, datenum_local } from '../global/format';
import { setCellValue, setCellFormat } from '../global/api';

const fitFormat = (formatStr) => {
    let dateFormat = formatStr.replace(/y/g, 'Y');
    dateFormat = dateFormat.replace(/d/g, 'D');
    dateFormat = dateFormat.replace(/h/g, 'H');

    dateFormat = dateFormat.replace(/上午\/下午/g, 'A');
    dateFormat = dateFormat.replace(/上午/g, 'A');
    dateFormat = dateFormat.replace(/下午/g, 'A');

    dateFormat = dateFormat.replace(/AM\/PM/g, 'A');
    dateFormat = dateFormat.replace(/AM/g, 'A');
    dateFormat = dateFormat.replace(/PM/g, 'A');
    dateFormat = dateFormat.replace(/\"/g, '');

    if (dateFormat.includes('A')) {
        dateFormat = dateFormat.replace(/H/g, 'h');
    }
    return dateFormat
}

const cellDatePickerCtrl = {
    cellFocus: function (r, c, cell) {
        let row = Store.visibledatarow[r],
            row_pre = r == 0 ? 0 : Store.visibledatarow[r - 1];
        let col = Store.visibledatacolumn[c],
            col_pre = c == 0 ? 0 : Store.visibledatacolumn[c - 1];

        let margeset = menuButton.mergeborer(Store.flowdata, r, c);
        let type = cell.ct.fa || 'YYYY-MM-DD';
        let defaultDate = update('yyyy-MM-dd hh:mm:ss', cell.v);
        let dateFormat = fitFormat(type);
        let enableTime = false;
        let noCalendar = false;
        let enableSeconds = false;
        let time_24hr = true;
        let hasChineseTime = false;


        if (!!margeset) {
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

        if (/[上午下午]/.test(type)) {
            hasChineseTime = true
        }
        if (/[Hhms]/.test(dateFormat)) {
            enableTime = true;
        }
        if (!/[YMD]/.test(dateFormat)) {
            noCalendar = true;
        }
        if (/s/.test(dateFormat)) {
            enableSeconds = true;
        }
        if (/A/.test(dateFormat)) {
            time_24hr = false;
        }

        const fp = flatpickr('#luckysheet-input-box', {
            allowInput: false,
            noCalendar,
            enableSeconds,
            enableTime,
            dateFormat,
            time_24hr,
            defaultDate,
            onClose() {
                setTimeout(() => {
                    fp.destroy()
                }, 0);
            },
            parseDate: (datestr, format) => {
                return dayjs(datestr).toDate();
            },
            formatDate: (date, format, locale) => {
                if (hasChineseTime) {
                    return dayjs(date).format(format).replace('AM', '上午').replace('PM', '下午')
                }
                return dayjs(date).format(format);
            },
            onChange: function (selectedDates, dateStr) {
                let currentVal = datenum_local(new Date(selectedDates))
                $("#luckysheet-rich-text-editor").html(dateStr);
                setCellValue(r, c, currentVal, { isRefresh: false })
                setCellFormat(r, c, 'ct', cell.ct)
                if (!enableTime) {
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                }
            }
        });

        $("#luckysheet-input-box").click();
    },
}

export default cellDatePickerCtrl;
