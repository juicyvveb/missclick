var cleaveDate, cleaveDateFormat, cleaveTime, cleaveTimeFormat, cleaveNumeral, cleaveDelimiter, cleaveDelimiters, cleavePrefix, cleaveBlocks;
document.querySelector("#cleave-date") && (cleaveDate = new Cleave("#cleave-date", { date: !0, delimiter: "-", datePattern: ["d", "m", "Y"] })),
    document.querySelector("#cleave-date-format") && (cleaveDateFormat = new Cleave("#cleave-date-format", { date: !0, datePattern: ["m", "y"] })),
    document.querySelector("#cleave-time") && (cleaveTime = new Cleave("#cleave-time", { time: !0, timePattern: ["h", "m", "s"] })),
    document.querySelector("#cleave-time-format") && (cleaveTimeFormat = new Cleave("#cleave-time-format", { time: !0, timePattern: ["h", "m"] })),
    document.querySelector("#cleave-numeral") && (cleaveNumeral = new Cleave("#cleave-numeral", { numeral: !0, numeralThousandsGroupStyle: "thousand" })),
    document.querySelector("#cleave-ccard") && (cleaveBlocks = new Cleave("#cleave-ccard", { blocks: [4, 4, 4, 4], uppercase: !0 })),
    document.querySelector("#cleave-delimiter") && (cleaveDelimiter = new Cleave("#cleave-delimiter", { delimiter: "·", blocks: [3, 3, 3], uppercase: !0 })),
    document.querySelector("#cleave-delimiters") && (cleaveDelimiters = new Cleave("#cleave-delimiters", { delimiters: [".", ".", "-"], blocks: [3, 3, 3, 2], uppercase: !0 })),
    document.querySelector("#cleave-prefix") && (cleavePrefix = new Cleave("#cleave-prefix", { prefix: "PREFIX", delimiter: "-", blocks: [6, 4, 4, 4], uppercase: !0 })),
    document.querySelector("#cleave-phone") && (cleaveBlocks = new Cleave("#cleave-phone", { delimiters: ["(", ")", "-"], blocks: [0, 3, 3, 4] }));
