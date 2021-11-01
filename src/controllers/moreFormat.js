import { replaceHtml } from '../utils/util';
import { modelHTML } from './constant';
import menuButton from './menuButton';
import editor from '../global/editor';
import tooltip from '../global/tooltip';
import { isEditMode } from '../global/validate';
import Store from '../store';
import locale from '../locale/locale';

//更多格式
const luckysheetMoreFormat = {
    moneyFmtList: [
        {
            "name": "Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "EUR",
            "pos": "before",
            "value": "€"
        }, {
            "name": "Renminbi",
            "pos": "before",
            "value": "¥"
        }, {
            "name": "GBP",
            "pos": "before",
            "value": "￡"
        }, {
            "name": "Hong Kong dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "JPY",
            "pos": "before",
            "value": "￥"
        }, {
            "name": "Albanian Lek",
            "pos": "before",
            "value": "Lek"
        }, {
            "name": "Algerian Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Afghani",
            "pos": "after",
            "value": "Af"
        }, {
            "name": "Argentine Peso",
            "pos": "before",
            "value": "$"
        }, {
            "name": "United Arab Emirates Dirham",
            "pos": "before",
            "value": "dh"
        }, {
            "name": "Aruban Florin",
            "pos": "before",
            "value": "Afl"
        }, {
            "name": "Omani Rial",
            "pos": "before",
            "value": "Rial"
        }, {
            "name": "Azerbaijani Manat",
            "pos": "before",
            "value": "₼"
        }, {
            "name": "Egyptian Pound",
            "pos": "before",
            "value": "￡"
        }, {
            "name": "Ethiopian Birr",
            "pos": "before",
            "value": "Birr"
        }, {
            "name": "Angolan Kwanza",
            "pos": "before",
            "value": "Kz"
        }, {
            "name": "Australian Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Macau Pataca",
            "pos": "before",
            "value": "MOP"
        }, {
            "name": "Barbadian Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Papua New Guinea Kina",
            "pos": "before",
            "value": "PGK"
        }, {
            "name": "Bahamian Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Pakistani Rupee",
            "pos": "before",
            "value": "Rs"
        }, {
            "name": "Paraguayan Guarani",
            "pos": "after",
            "value": "Gs"
        }, {
            "name": "Bahraini Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Panamanian Balboa",
            "pos": "before",
            "value": "B/"
        }, {
            "name": "Brasiliai",
            "pos": "before",
            "value": "R$"
        }, {
            "name": "Belarusian Ruble",
            "pos": "after",
            "value": "р"
        }, {
            "name": "Bermudian Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Bulgarian Lev",
            "pos": "before",
            "value": "lev"
        }, {
            "name": "Iceland Krona",
            "pos": "before",
            "value": "kr"
        }, {
            "name": "Bosnia and Herzegovina convertible mark",
            "pos": "before",
            "value": "KM"
        }, {
            "name": "Polish Zloty",
            "pos": "after",
            "value": "zł."
        }, {
            "name": "Boliviano",
            "pos": "before",
            "value": "Bs"
        }, {
            "name": "Belize Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Botswana Pula",
            "pos": "before",
            "value": "P"
        }, {
            "name": "Nuzam, Bhutan",
            "pos": "before",
            "value": "Nu"
        }, {
            "name": "Burundian Franc",
            "pos": "before",
            "value": "FBu"
        }, {
            "name": "North Korean Won",
            "pos": "before",
            "value": "₩"
        }, {
            "name": "Danish Krone",
            "pos": "after",
            "value": "kr"
        }, {
            "name": "East Caribbean Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Dominican Peso",
            "pos": "before",
            "value": "RD$"
        }, {
            "name": "Russian ruble",
            "pos": "after",
            "value": "₽"
        }, {
            "name": "Eritrean Nakfa",
            "pos": "before",
            "value": "Nfk"
        }, {
            "name": "CFA franc",
            "pos": "before",
            "value": "CFA"
        }, {
            "name": "Philippine Peso",
            "pos": "before",
            "value": "₱"
        }, {
            "name": "Fijian Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Escudo, Cape Verde",
            "pos": "before",
            "value": "CVE"
        }, {
            "name": "Falkland Islands Pound",
            "pos": "before",
            "value": "￡"
        }, {
            "name": "Dalasi, Gambia",
            "pos": "before",
            "value": "GMD"
        }, {
            "name": "Congolese Franc",
            "pos": "before",
            "value": "FrCD"
        }, {
            "name": "Colombian Peso",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Costa Rican Colon",
            "pos": "before",
            "value": "₡"
        }, {
            "name": "Cuban Peso",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Cuban Convertible Peso",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Guyanese Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Kazakhstan tenge",
            "pos": "before",
            "value": "₸"
        }, {
            "name": "Haitian Gourde",
            "pos": "before",
            "value": "HTG"
        }, {
            "name": "won",
            "pos": "before",
            "value": "₩"
        }, {
            "name": "Netherlands Antilles guilder",
            "pos": "before",
            "value": "NAf."
        }, {
            "name": "La Lempira, Honduras",
            "pos": "before",
            "value": "L"
        }, {
            "name": "Djiboutian Franc",
            "pos": "before",
            "value": "Fdj"
        }, {
            "name": "Kyrgyzstan Som",
            "pos": "before",
            "value": "KGS"
        }, {
            "name": "Guinean Franc",
            "pos": "before",
            "value": "FG"
        }, {
            "name": "Canadian Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Ghanaian Cedi",
            "pos": "before",
            "value": "GHS"
        }, {
            "name": "Cambodian Riel",
            "pos": "before",
            "value": "Riel"
        }, {
            "name": "Czech Koruna",
            "pos": "after",
            "value": "Kč"
        }, {
            "name": "Zimbabwean Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Qatari Rial",
            "pos": "before",
            "value": "Rial"
        }, {
            "name": "Cayman Islands Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Comorian Franc",
            "pos": "before",
            "value": "CF"
        }, {
            "name": "Kuwaiti Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Croatian Kuna",
            "pos": "before",
            "value": "kn"
        }, {
            "name": "Kenyan Shilling",
            "pos": "before",
            "value": "Ksh"
        }, {
            "name": "Lesotho Lotti",
            "pos": "before",
            "value": "LSL"
        }, {
            "name": "Lao Kip",
            "pos": "before",
            "value": "₭"
        }, {
            "name": "Lebanese Pound",
            "pos": "before",
            "value": "L￡"
        }, {
            "name": "Lithuanian Litas",
            "pos": "before",
            "value": "Lt"
        }, {
            "name": "Libyan Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Libyan Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Rwandan franc",
            "pos": "before",
            "value": "RF"
        }, {
            "name": "Romanian Lei",
            "pos": "before",
            "value": "RON"
        }, {
            "name": "Madagascar Ariari",
            "pos": "before",
            "value": "Ar"
        }, {
            "name": "Maldives Rufiyaa",
            "pos": "before",
            "value": "Rf"
        }, {
            "name": "Malawian Kwacha",
            "pos": "before",
            "value": "MWK"
        }, {
            "name": "Malaysian Ringgit",
            "pos": "before",
            "value": "RM"
        }, {
            "name": "Macedonian Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Mauritian Rupee",
            "pos": "before",
            "value": "MURs"
        }, {
            "name": "Ouguia, Mauritania",
            "pos": "before",
            "value": "MRO"
        }, {
            "name": "Mongolian Tugrik",
            "pos": "before",
            "value": "₮"
        }, {
            "name": "Bangladeshi Taka",
            "pos": "before",
            "value": "ó"
        }, {
            "name": "Peruvian New Sol",
            "pos": "before",
            "value": "S/"
        }, {
            "name": "Kyat",
            "pos": "before",
            "value": "K"
        }, {
            "name": "Moldovan Lei",
            "pos": "before",
            "value": "MDL"
        }, {
            "name": "Moroccan Dirham",
            "pos": "before",
            "value": "dh"
        }, {
            "name": "Metical, Mozambique",
            "pos": "before",
            "value": "MTn"
        }, {
            "name": "Mexican Peso",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Namibian Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "South African Rand",
            "pos": "before",
            "value": "R"
        }, {
            "name": "South Sudanese Pound",
            "pos": "before",
            "value": "￡"
        }, {
            "name": "Cordoba, Nicaragua",
            "pos": "before",
            "value": "C$"
        }, {
            "name": "Nepalese Rupee",
            "pos": "before",
            "value": "Rs"
        }, {
            "name": "Nigerian Naira",
            "pos": "before",
            "value": "₦"
        }, {
            "name": "Norwegian Krone",
            "pos": "after",
            "value": "kr"
        }, {
            "name": "Georgia Lara",
            "pos": "before",
            "value": "GEL"
        }, {
            "name": "RMB (Offshore)",
            "pos": "before",
            "value": "￥"
        }, {
            "name": "Swedish Krona",
            "pos": "after",
            "value": "kr"
        }, {
            "name": "Swiss franc",
            "pos": "before",
            "value": "CHF"
        }, {
            "name": "Serbian Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Sierra Leone",
            "pos": "before",
            "value": "SLL"
        }, {
            "name": "Seychelles Rupee",
            "pos": "before",
            "value": "SCR"
        }, {
            "name": "Saudi Riyal",
            "pos": "before",
            "value": "Rial"
        }, {
            "name": "Sao Tome Dobra",
            "pos": "before",
            "value": "Db"
        }, {
            "name": "St. Helena Pound",
            "pos": "before",
            "value": "￡"
        }, {
            "name": "Sri Lankan Rupee",
            "pos": "before",
            "value": "Rs"
        }, {
            "name": "Swaziland Lilangeni",
            "pos": "before",
            "value": "SZL"
        }, {
            "name": "Sudanese Pound",
            "pos": "before",
            "value": "SDG"
        }, {
            "name": "Surinamese Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Solomon Islands Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Somali Shilling",
            "pos": "before",
            "value": "SOS"
        }, {
            "name": "Somoni, Tajikistan",
            "pos": "before",
            "value": "Som"
        }, {
            "name": "Pacific Franc",
            "pos": "after",
            "value": "FCFP"
        }, {
            "name": "Thai Baht",
            "pos": "before",
            "value": "฿"
        }, {
            "name": "Tanzanian Shilling",
            "pos": "before",
            "value": "TSh"
        }, {
            "name": "Tongan Panga",
            "pos": "before",
            "value": "T$"
        }, {
            "name": "Trinidad and Tobago Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Tunisian Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Turkish Lira",
            "pos": "before",
            "value": "₺"
        }, {
            "name": "Vanuatu Vatu",
            "pos": "before",
            "value": "VUV"
        }, {
            "name": "Guatemalan Quetzal",
            "pos": "before",
            "value": "Q"
        }, {
            "name": "Venezuelan Bolivar",
            "pos": "before",
            "value": "Bs"
        }, {
            "name": "Brunei Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Ugandan Shilling",
            "pos": "before",
            "value": "UGX"
        }, {
            "name": "Ukrainian hryvnia",
            "pos": "before",
            "value": "грн."
        }, {
            "name": "Uruguayan Peso",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Uzbekistani Soum",
            "pos": "before",
            "value": "So'm"
        }, {
            "name": "Tara, Western Samoa",
            "pos": "before",
            "value": "WST"
        }, {
            "name": "Singapore Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "New Taiwan Dollar",
            "pos": "before",
            "value": "NT$"
        }, {
            "name": "New Zealand Dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Hungarian Forint",
            "pos": "before",
            "value": "Ft"
        }, {
            "name": "Syrian Pound",
            "pos": "before",
            "value": "￡"
        }, {
            "name": "Jamaican dollar",
            "pos": "before",
            "value": "$"
        }, {
            "name": "Armenian Dram",
            "pos": "before",
            "value": "Dram"
        }, {
            "name": "Yemeni Rial",
            "pos": "before",
            "value": "Rial"
        }, {
            "name": "Iraqi Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Iranian Rial",
            "pos": "before",
            "value": "Rial"
        }, {
            "name": "Israeli New Shekel",
            "pos": "before",
            "value": "₪"
        }, {
            "name": "Indian Rupee",
            "pos": "before",
            "value": "₹"
        }, {
            "name": "Indonesian Rupiah",
            "pos": "before",
            "value": "Rp"
        }, {
            "name": "Jordanian Dinar",
            "pos": "before",
            "value": "din"
        }, {
            "name": "Vietnamese Dong",
            "pos": "after",
            "value": "₫"
        }, {
            "name": "Zambian Kwacha",
            "pos": "before",
            "value": "ZMW"
        }, {
            "name": "Gibraltar Pound",
            "pos": "before",
            "value": "￡"
        }, {
            "name": "Chilean Peso",
            "pos": "before",
            "value": "$"
        }, {
            "name": "China-Africa Financial Cooperation Franc",
            "pos": "before",
            "value": "FCFA"
        }
    ],
    dateFmtList: [
        // {
        //     "name": "28.10.2021",
        //     "value": "dd.MM.yyyy"
        // },
        {
            "name": "10/28/2021",
            "value": "M/d/yyyy"
        },
        {
            "name": "10/28/21",
            "value": "M/d/yy"
        },
        {
            "name": "2021-08-25",
            "value": "yyyy-MM-dd"
        },
        {
            "name": "2021-08-25",
            "value": "yyyy-MM-dd"
        },
        {
            "name": "2021/08/25",
            "value": "yyyy/MM/dd"
        },
        // {
        //     "name": "28. 10. 2021.",
        //     "value": "d. M. yyyy."
        // },
        {
            "name": "28-10-2021",
            "value": "dd-MM-yyyy"
        },
        {
            "name": "28-10-21",
            "value": "dd-MM-yy"
        },
        // {
        //     "name": "28.10.21",
        //     "value": "dd.MM.yy"
        // },
        {
            "name": "28/10/2021",
            "value": "dd/MM/yyyy"
        },
        // {
        //     "name": "2021.08.25",
        //     "value": "yyyy.MM.dd"
        // },
        {
            "name": "08-25",
            "value": "MM-dd"
        },
        {
            "name": "8-25",
            "value": "M-d"
        },
        {
            "name": "13:30:30",
            "value": "h:mm:ss"
        },
        {
            "name": "13:30",
            "value": "h:mm"
        },
        {
            "name": "08-25 01:30",
            "value": "MM-dd hh:mm"
        }
    ],
    numFmtList: [
        {
            "name": "1235",
            "value": "0"
        },
        {
            "name": "1234.56",
            "value": "0.00"
        },
        {
            "name": "1,235",
            "value": "#,##0"
        },
        {
            "name": "1,234.56",
            "value": "#,##0.00"
        },
        {
            "name": "1,235",
            "value": "#,##0_);(#,##0)"
        },
        {
            "name": "1,235",
            "value": "#,##0_);[Red](#,##0)"
        },
        {
            "name": "1,234.56",
            "value": "#,##0.00_);(#,##0.00)"
        },
        {
            "name": "1,234.56",
            "value": "#,##0.00_);[Red](#,##0.00)"
        },
        {
            "name": "$1,235",
            "value": "$#,##0_);($#,##0)"
        },
        {
            "name": "$1,235",
            "value": "$#,##0_);[Red]($#,##0)"
        },
        {
            "name": "$1,234.56",
            "value": "$#,##0.00_);($#,##0.00)"
        },
        {
            "name": "$1,234.56",
            "value": "$#,##0.00_);[Red]($#,##0.00)"
        },
        {
            "name": "1234.56",
            "value": "@"
        },
        {
            "name": "123456%",
            "value": "0%"
        },
        {
            "name": "123456.00%",
            "value": "0.00%"
        },
        {
            "name": "1.23E+03",
            "value": "0.00E+00"
        },
        {
            "name": "1.2E+3",
            "value": "##0.0E+0"
        },
        {
            "name": "1234 5/9",
            "value": "# ?/?"
        },
        {
            "name": "1234 14/25",
            "value": "# ??/??"
        },
        {
            "name": "$ 1,235",
            "value": '_($* #,##0_);_(...($* "-"_);_(@_)'
        },
        {
            "name": "1,235",
            "value": '_(* #,##0_);_(*..._(* "-"_);_(@_)'
        },
        {
            "name": "$ 1,234.56",
            // "value": '_($* #,##0.00_)...* "-"??_);_(@_)'
            "value": '_($* #,##0.00_);_(...($* "-"_);_(@_)'
        },
        {
            "name": "1,234.56",
            "value": '_(* #,##0.00_);...* "-"??_);_(@_)'
        },
    ],
    createDialog: function(type){
        let _this = this;

        const currencyDetail = locale().currencyDetail;
        const locale_format = locale().format;
        const locale_button = locale().button;

        this.moneyFmtList = [
            {'name': currencyDetail.USdollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.EUR,'pos': 'before','value': '€'},
            {'name': currencyDetail.RMB,'pos': 'before','value': '¥'},
            {'name': currencyDetail.GBP,'pos': 'before','value': '￡'},
            {'name': currencyDetail.HK,'pos': 'before','value': '$'},
            {'name': currencyDetail.JPY,'pos': 'before','value': '￥'},
            {'name': currencyDetail.AlbanianLek,'pos': 'before','value': 'Lek'},
            {'name': currencyDetail.AlgerianDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.Afghani,'pos': 'after','value': 'Af'},
            {'name': currencyDetail.ArgentinePeso,'pos': 'before','value': '$'},
            {'name': currencyDetail.UnitedArabEmiratesDirham,'pos': 'before','value': 'dh'},
            {'name': currencyDetail.ArubanFlorin,'pos': 'before','value': 'Afl'},
            {'name': currencyDetail.OmaniRial,'pos': 'before','value': 'Rial'},
            {'name': currencyDetail.Azerbaijanimanat,'pos': 'before','value': '₼'},
            {'name': currencyDetail.EgyptianPound,'pos': 'before','value': '￡'},
            {'name': currencyDetail.EthiopianBirr,'pos': 'before','value': 'Birr'},
            {'name': currencyDetail.AngolaKwanza,'pos': 'before','value': 'Kz'},
            {'name': currencyDetail.AustralianDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.Patacas,'pos': 'before','value': 'MOP'},
            {'name': currencyDetail.BarbadosDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.PapuaNewGuineaKina,'pos': 'before','value': 'PGK'},
            {'name': currencyDetail.BahamianDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.PakistanRupee,'pos': 'before','value': 'Rs'},
            {'name': currencyDetail.ParaguayanGuarani,'pos': 'after','value': 'Gs'},
            {'name': currencyDetail.BahrainiDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.PanamanianBalboa,'pos': 'before','value': 'B/'},
            {'name': currencyDetail.Brazilianreal,'pos': 'before','value': 'R$'},
            {'name': currencyDetail.Belarusianruble,'pos': 'after','value': 'р'},
            {'name': currencyDetail.BermudianDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.BulgarianLev,'pos': 'before','value': 'lev'},
            {'name': currencyDetail.IcelandKrona,'pos': 'before','value': 'kr'},
            {'name': currencyDetail.BosniaHerzegovinaConvertibleMark,'pos': 'before','value': 'KM'},
            {'name': currencyDetail.PolishZloty,'pos': 'after','value': 'zł.'},
            {'name': currencyDetail.Boliviano,'pos': 'before','value': 'Bs'},
            {'name': currencyDetail.BelizeDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.BotswanaPula,'pos': 'before','value': 'P'},
            {'name': currencyDetail.NotDannuzhamu,'pos': 'before','value': 'Nu'},
            {'name': currencyDetail.BurundiFranc,'pos': 'before','value': 'FBu'},
            {'name': currencyDetail.NorthKoreanWon,'pos': 'before','value': '₩'},
            {'name': currencyDetail.DanishKrone,'pos': 'after','value': 'kr'},
            {'name': currencyDetail.EastCaribbeanDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.DominicaPeso,'pos': 'before','value': 'RD$'},
            {'name': currencyDetail.RussianRuble,'pos': 'after','value': '₽'},
            {'name': currencyDetail.EritreanNakfa,'pos': 'before','value': 'Nfk'},
            {'name': currencyDetail.CFAfranc,'pos': 'before','value': 'CFA'},
            {'name': currencyDetail.PhilippinePeso,'pos': 'before','value': '₱'},
            {'name': currencyDetail.FijiDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.CapeVerdeEscudo,'pos': 'before','value': 'CVE'},
            {'name': currencyDetail.FalklandIslandsPound,'pos': 'before','value': '￡'},
            {'name': currencyDetail.GambianDalasi,'pos': 'before','value': 'GMD'},
            {'name': currencyDetail.Congolesefranc,'pos': 'before','value': 'FrCD'},
            {'name': currencyDetail.ColombianPeso,'pos': 'before','value': '$'},
            {'name': currencyDetail.CostaRicanColon,'pos': 'before','value': '₡'},
            {'name': currencyDetail.CubanPeso,'pos': 'before','value': '$'},
            {'name': currencyDetail.Cubanconvertiblepeso,'pos': 'before','value': '$'},
            {'name': currencyDetail.GuyanaDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.KazakhstanTenge,'pos': 'before','value': '₸'},
            {'name': currencyDetail.Haitiangourde,'pos': 'before','value': 'HTG'},
            {'name': currencyDetail.won,'pos': 'before','value': '₩'},
            {'name': currencyDetail.NetherlandsAntillesGuilder,'pos': 'before','value': 'NAf.'},
            {'name': currencyDetail.Honduraslempiras,'pos': 'before','value': 'L'},
            {'name': currencyDetail.DjiboutiFranc,'pos': 'before','value': 'Fdj'},
            {'name': currencyDetail.KyrgyzstanSom,'pos': 'before','value': 'KGS'},
            {'name': currencyDetail.GuineaFranc,'pos': 'before','value': 'FG'},
            {'name': currencyDetail.CanadianDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.GhanaianCedi,'pos': 'before','value': 'GHS'},
            {'name': currencyDetail.Cambodianriel,'pos': 'before','value': 'Riel'},
            {'name': currencyDetail.CzechKoruna,'pos': 'after','value': 'Kč'},
            {'name': currencyDetail.ZimbabweDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.QatariRiyal,'pos': 'before','value': 'Rial'},
            {'name': currencyDetail.CaymanIslandsDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.Comorianfranc,'pos': 'before','value': 'CF'},
            {'name': currencyDetail.KuwaitiDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.CroatianKuna,'pos': 'before','value': 'kn'},
            {'name': currencyDetail.KenyanShilling,'pos': 'before','value': 'Ksh'},
            {'name': currencyDetail.LesothoLoti,'pos': 'before','value': 'LSL'},
            {'name': currencyDetail.LaoKip,'pos': 'before','value': '₭'},
            {'name': currencyDetail.LebanesePound,'pos': 'before','value': 'L￡'},
            {'name': currencyDetail.Lithuanianlitas,'pos': 'before','value': 'Lt'},
            {'name': currencyDetail.LibyanDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.LiberianDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.RwandaFranc,'pos': 'before','value': 'RF'},
            {'name': currencyDetail.RomanianLeu,'pos': 'before','value': 'RON'},
            {'name': currencyDetail.MalagasyAriary,'pos': 'before','value': 'Ar'},
            {'name': currencyDetail.MaldivianRufiyaa,'pos': 'before','value': 'Rf'},
            {'name': currencyDetail.MalawiKwacha,'pos': 'before','value': 'MWK'},
            {'name': currencyDetail.MalaysianRinggit,'pos': 'before','value': 'RM'},
            {'name': currencyDetail.MacedoniawearingDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.MauritiusRupee,'pos': 'before','value': 'MURs'},
            {'name': currencyDetail.MauritanianOuguiya,'pos': 'before','value': 'MRO'},
            {'name': currencyDetail.MongolianTugrik,'pos': 'before','value': '₮'},
            {'name': currencyDetail.BangladeshiTaka,'pos': 'before','value': 'ó'},
            {'name': currencyDetail.PeruvianNuevoSol,'pos': 'before','value': 'S/'},
            {'name': currencyDetail.MyanmarKyat,'pos': 'before','value': 'K'},
            {'name': currencyDetail.MoldovanLeu,'pos': 'before','value': 'MDL'},
            {'name': currencyDetail.MoroccanDirham,'pos': 'before','value': 'dh'},
            {'name': currencyDetail.MozambiqueMetical,'pos': 'before','value': 'MTn'},
            {'name': currencyDetail.MexicanPeso,'pos': 'before','value': '$'},
            {'name': currencyDetail.NamibianDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.SouthAfricanRand,'pos': 'before','value': 'R'},
            {'name': currencyDetail.SouthSudanesePound,'pos': 'before','value': '￡'},
            {'name': currencyDetail.NicaraguaCordoba,'pos': 'before','value': 'C$'},
            {'name': currencyDetail.NepaleseRupee,'pos': 'before','value': 'Rs'},
            {'name': currencyDetail.NigerianNaira,'pos': 'before','value': '₦'},
            {'name': currencyDetail.NorwegianKrone,'pos': 'after','value': 'kr'},
            {'name': currencyDetail.GeorgianLari,'pos': 'before','value': 'GEL'},
            {'name': currencyDetail.RenminbiOffshore,'pos': 'before','value': '￥'},
            {'name': currencyDetail.SwedishKrona,'pos': 'after','value': 'kr'},
            {'name': currencyDetail.SwissFranc,'pos': 'before','value': 'CHF'},
            {'name': currencyDetail.SerbianDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.SierraLeone,'pos': 'before','value': 'SLL'},
            {'name': currencyDetail.SeychellesRupee,'pos': 'before','value': 'SCR'},
            {'name': currencyDetail.SaudiRiyal,'pos': 'before','value': 'Rial'},
            {'name': currencyDetail.SaoTomeDobra,'pos': 'before','value': 'Db'},
            {'name': currencyDetail.SaintHelenapound,'pos': 'before','value': '￡'},
            {'name': currencyDetail.SriLankaRupee,'pos': 'before','value': 'Rs'},
            {'name': currencyDetail.SwazilandLilangeni,'pos': 'before','value': 'SZL'},
            {'name': currencyDetail.SudanesePound,'pos': 'before','value': 'SDG'},
            {'name': currencyDetail.Surinamesedollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.SolomonIslandsDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.SomaliShilling,'pos': 'before','value': 'SOS'},
            {'name': currencyDetail.TajikistanSomoni,'pos': 'before','value': 'Som'},
            {'name': currencyDetail.PacificFranc,'pos': 'after','value': 'FCFP'},
            {'name': currencyDetail.ThaiBaht,'pos': 'before','value': '฿'},
            {'name': currencyDetail.TanzanianShilling,'pos': 'before','value': 'TSh'},
            {'name': currencyDetail.TonganPaanga,'pos': 'before','value': 'T$'},
            {'name': currencyDetail.TrinidadandTobagoDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.TunisianDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.TurkishLira,'pos': 'before','value': '₺'},
            {'name': currencyDetail.VanuatuVatu,'pos': 'before','value': 'VUV'},
            {'name': currencyDetail.GuatemalanQuetzal,'pos': 'before','value': 'Q'},
            {'name': currencyDetail.CommissionBolivar,'pos': 'before','value': 'Bs'},
            {'name': currencyDetail.BruneiDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.UgandanShilling,'pos': 'before','value': 'UGX'},
            {'name': currencyDetail.UkrainianHryvnia,'pos': 'before','value': 'грн.'},
            {'name': currencyDetail.UruguayanPeso,'pos': 'before','value': '$'},
            {'name': currencyDetail.Uzbekistansom,'pos': 'before','value': "So'm"},
            {'name': currencyDetail.WesternSamoaTala,'pos': 'before','value': 'WST'},
            {'name': currencyDetail.SingaporeDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.NT,'pos': 'before','value': 'NT$'},
            {'name': currencyDetail.NewZealandDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.HungarianForint,'pos': 'before','value': 'Ft'},
            {'name': currencyDetail.SyrianPound,'pos': 'before','value': '￡'},
            {'name': currencyDetail.JamaicanDollar,'pos': 'before','value': '$'},
            {'name': currencyDetail.ArmenianDram,'pos': 'before','value': 'Dram'},
            {'name': currencyDetail.YemeniRial,'pos': 'before','value': 'Rial'},
            {'name': currencyDetail.IraqiDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.IranianRial,'pos': 'before','value': 'Rial'},
            {'name': currencyDetail.NewIsraeliShekel,'pos': 'before','value': '₪'},
            {'name': currencyDetail.IndianRupee,'pos': 'before','value': '₹'},
            {'name': currencyDetail.IndonesianRupiah,'pos': 'before','value': 'Rp'},
            {'name': currencyDetail.JordanianDinar,'pos': 'before','value': 'din'},
            {'name': currencyDetail.VND,'pos': 'after','value': '₫'},
            {'name': currencyDetail.ZambianKwacha,'pos': 'before','value': 'ZMW'},
            {'name': currencyDetail.GibraltarPound,'pos': 'before','value': '￡'},
            {'name': currencyDetail.ChileanPeso,'pos': 'before','value': '$'},
            {'name': currencyDetail.CFAFrancBEAC,'pos': 'before','value': 'FCFA'}
        ];

        this.dateFmtList = locale().dateFmtList;

        this.numFmtList = [
            {
                "name": "1235",
                "value": "0"
            },
            {
                "name": "1234.56",
                "value": "0.00"
            },
            {
                "name": "1,235",
                "value": "#,##0"
            },
            {
                "name": "1,234.56",
                "value": "#,##0.00"
            },
            {
                "name": "1,235",
                "value": "#,##0_);(#,##0)"
            },
            {
                "name": "1,235",
                "value": "#,##0_);[Red](#,##0)"
            },
            {
                "name": "1,234.56",
                "value": "#,##0.00_);(#,##0.00)"
            },
            {
                "name": "1,234.56",
                "value": "#,##0.00_);[Red](#,##0.00)"
            },
            {
                "name": "$1,235",
                "value": "$#,##0_);($#,##0)"
            },
            {
                "name": "$1,235",
                "value": "$#,##0_);[Red]($#,##0)"
            },
            {
                "name": "$1,234.56",
                "value": "$#,##0.00_);($#,##0.00)"
            },
            {
                "name": "$1,234.56",
                "value": "$#,##0.00_);[Red]($#,##0.00)"
            },
            {
                "name": "1234.56",
                "value": "@"
            },
            {
                "name": "123456%",
                "value": "0%"
            },
            {
                "name": "123456.00%",
                "value": "0.00%"
            },
            {
                "name": "1.23E+03",
                "value": "0.00E+00"
            },
            {
                "name": "1.2E+3",
                "value": "##0.0E+0"
            },
            {
                "name": "1234 5/9",
                "value": "# ?/?"
            },
            {
                "name": "1234 14/25",
                "value": "# ??/??"
            },
            {
                "name": "$ 1,235",
                "value": '_($* #,##0_);_(...($* "-"_);_(@_)'
            },
            {
                "name": "1,235",
                "value": '_(* #,##0_);_(*..._(* "-"_);_(@_)'
            },
            {
                "name": "$ 1,234.56",
                // "value": '_($* #,##0.00_)...* "-"??_);_(@_)'
                "value": '_($* #,##0.00_);_(...($* "-"_);_(@_)'
            },
            {
                "name": "1,234.56",
                "value": '_(* #,##0.00_);...* "-"??_);_(@_)'
            },
        ]    

        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-moreFormat-dialog").remove();

        let title = "", content = '';

        if(type == "morecurrency"){ //货币
            title = locale_format.titleCurrency;

            let listHtml = '';

            for(let i = 0; i < _this.moneyFmtList.length; i++){
                let name = _this.moneyFmtList[i]["name"];
                let pos = _this.moneyFmtList[i]["pos"];
                let value = _this.moneyFmtList[i]["value"];

                listHtml += '<div class="listItem">'+
                                '<div class="name">'+ name +'</div>'+
                                '<div class="value">'+ value +'</div>'+
                                '<input type="hidden" value="'+ pos +'"/>'+
                            '</div>';
            }

            content = '<div class="box" id="morecurrency">'+
                        '<div class="decimal">'+
                            '<label>'+ locale_format.decimalPlaces +'：</label>'+
                            '<input type="number" class="formulaInputFocus" value="2" min="0" max="9"/>'+
                        '</div>'+
                        '<div class="listbox">'+ listHtml +'</div>'+
                      '</div>';
        }
        else if(type == "moredatetime"){ //日期时间
            title = locale_format.titleDateTime;

            let listHtml = '';

            for(let i = 0; i < _this.dateFmtList.length; i++){
                let name = _this.dateFmtList[i]["name"];
                let value = _this.dateFmtList[i]["value"];

                listHtml += '<div class="listItem">'+
                                '<div class="name">'+ name +'</div>'+
                                '<div class="value">'+ value +'</div>'+
                            '</div>';
            }

            content = '<div class="box" id="moredatetime">'+
                        '<div class="listbox">'+ listHtml +'</div>'+
                      '</div>';
        }
        else if(type == "moredigit"){ //数字
            title = locale_format.titleNumber;

            let listHtml = '';

            for(let i = 0; i < _this.numFmtList.length; i++){
                let name = _this.numFmtList[i]["name"];
                let value = _this.numFmtList[i]["value"];

                listHtml += '<div class="listItem">'+
                                '<div class="name">'+ name +'</div>'+
                                '<div class="value">'+ value +'</div>'+
                            '</div>';
            }

            content = '<div class="box" id="moredigit">'+
                        '<div class="listbox">'+ listHtml +'</div>'+
                      '</div>';
        }

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-moreFormat-dialog", 
            "addclass": "luckysheet-moreFormat-dialog", 
            "title": title, 
            "content": content, 
            "botton": '<button id="luckysheet-moreFormat-dialog-confirm" class="btn btn-primary">'+ locale_button.confirm +'</button><button class="btn btn-default luckysheet-model-close-btn">'+ locale_button.cancel +'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-moreFormat-dialog").find(".luckysheet-modal-dialog-content").css("min-width", 400).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-moreFormat-dialog").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();
        
        $("#luckysheet-moreFormat-dialog .listbox .listItem").eq(0).addClass("on");
    },
    init: function(){
        let _this = this;

        //选择格式
        $(document).on("click", "#luckysheet-moreFormat-dialog .listbox .listItem", function(){
            $(this).addClass("on").siblings().removeClass("on");
        });

        //确定
        $(document).off("click.moreFormatConfirm").on("click.moreFormatConfirm", "#luckysheet-moreFormat-dialog #luckysheet-moreFormat-dialog-confirm", function(){
            $("#luckysheet-moreFormat-dialog").hide();
            $("#luckysheet-modal-dialog-mask").hide();

            let d = editor.deepCopyFlowData(Store.flowdata);

            let value = $("#luckysheet-moreFormat-dialog .listbox .listItem.on .value").text();
            let id = $(this).parents("#luckysheet-moreFormat-dialog").find(".box").attr("id");

            if(id == "morecurrency"){ //货币
                if(value.indexOf("?") != -1){
                    return;
                }

                let decimal = parseInt($("#luckysheet-moreFormat-dialog .decimal input").val().trim());

                if(decimal.toString() == "NaN" || decimal < 0 || decimal > 9){
                    const msg = "The number of decimal places must be between 0-9!";
                    if(isEditMode()){
                        alert(msg);
                    }   
                    else{
                        tooltip.info(msg, "");
                    }

                    return;
                }

                let str = "";

                if(decimal > 0){
                    for(let i = 1; i <= decimal; i++){
                        str += "0";
                    }

                    str = "0." + str;
                }
                else{
                    str = "#";
                }

                let pos = $("#luckysheet-moreFormat-dialog .listbox .listItem.on input:hidden").val();

                if(pos == "before"){
                    str = '"' + value + '" ' + str;
                }
                else if(pos == "after"){
                    str = str + ' "' + value + '"';
                }

                menuButton.updateFormat(d, "ct", str);
            }
            else if(id == "moredatetime"){ //日期时间
                menuButton.updateFormat(d, "ct", value);
            }
            else if(id == "moredigit"){ //数字
                menuButton.updateFormat(d, "ct", value);
            }
        })
    }
}

export default luckysheetMoreFormat;
