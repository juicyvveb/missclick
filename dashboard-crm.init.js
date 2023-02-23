const inputsList = document.querySelector('#period-radio');
const inputs =  inputsList.querySelectorAll('input');
const today = document.querySelectorAll('#data-today div[data-section=day]');
const week = document.querySelectorAll('#data-last-week div[data-section=week]');
const month = document.querySelectorAll('#data-last-month div[data-section=month]');
const year = document.querySelectorAll('#data-last-year div[data-section=year]');


//самовызывающаяся фукнция, образуем свою область видимости, так как в другом файле уже есть chart, чтобы ничего не сломать
(function init(){
let choosedValue = [...inputs].filter(input => input.checked).length ? [...inputs].filter(input => input.checked)[0].value : 'last-month';
let chart;
const periodMap = {
    today: {
        options: {
            series: [
                { name: "Revenue", data: getRevenueFromHtml(today).filter((_,i) => i == 0 || i % 3 == 0)},
                { name: "Expenses", data: getExpensesFromHtml(today).filter((_,i) => i == 0 || i % 3 == 0) },
            ],
            xaxis:{
                categories: [...today].map((_,i) => {
                    if(i == 0 || i % 3 === 0){
                        return  i >= 10 ? `${i}:00` : `0${i}:00`
                    }
                }).filter(el => el)
            },  
            tooltip: {
                x: {
                  format: 'dd/MM/yy HH:mm'
                },
              },    
        },
    },
    'last-week': {
        options: {
            series: [
                { name: "Revenue", data: getRevenueFromHtml(week) },
                { name: "Expenses", data: getExpensesFromHtml(week) },
            ],
            xaxis: {categories: [...week]
            .map(el => el.getAttribute('data-name').toString()[0].toUpperCase() + el.getAttribute('data-name').slice(1,3))},
            }, 
    },
    'last-month': {
        options: {
            series: [
                { name: "Revenue", data: detectMonthLength(getRevenueFromHtml(month)) },
                { name: "Expenses", data: detectMonthLength(getExpensesFromHtml(month)) },
            ],
            xaxis: {categories: detectMonthLength([...month].map((_,i) => i+1))},
            }, 
    },
    'current-year': {
        options: {
            series: [
                { name: "Revenue", data: getRevenueFromHtml(year) },
                { name: "Expenses", data: getExpensesFromHtml(year) },
            ],
            xaxis: { categories: [...year].map(year => year.getAttribute('data-name').toString()[0].toUpperCase() + year.getAttribute('data-name').slice(1,3)) },
            },
            
    }
}
render();
setSelectedInput();
[...inputs].forEach(input => {
    input.addEventListener('input', (e) => {
        choosedValue = e.target.value;
        render()
        setSelectedInput()
    })
})

function getChartColorsArray(e) {
    if (null !== document.getElementById(e)) {
        var t = document.getElementById(e).getAttribute("data-colors");
        if (t)
            return (t = JSON.parse(t)).map(function (e) {
                var t = e.replace(" ", "");
                return -1 === t.indexOf(",")
                    ? getComputedStyle(document.documentElement).getPropertyValue(t) || t
                    : 2 == (e = e.split(",")).length
                    ? "rgba(" + getComputedStyle(document.documentElement).getPropertyValue(e[0]) + "," + e[1] + ")"
                    : t;
            });
        console.warn("data-colors Attribute not found on:", e);
    }
}

function render(){
    // chart,
    if(chart){chart.destroy()}
    let options, 
    areachartSalesColors = getChartColorsArray("sales-forecast-chart"),
    dealTypeChartsColors =
        (areachartSalesColors &&
            ((options = {
                series: [
                    { name: "Goal", data: [37] },
                    { name: "Pending Forcast", data: [12] },
                    { name: "Revenue", data: [18] },
                ],
                chart: { type: "bar", height: 341, toolbar: { show: !1 } },
                plotOptions: { bar: { horizontal: !1, columnWidth: "65%" } },
                stroke: { show: !0, width: 5, colors: ["transparent"] },
                xaxis: {
                    categories: [""],
                    axisTicks: { show: !1, borderType: "solid", color: "#78909C", height: 6, offsetX: 0, offsetY: 0 },
                    title: { text: "Total Forecasted Value", offsetX: 0, offsetY: -30, style: { color: "#78909C", fontSize: "12px", fontWeight: 400 } },
                },
                yaxis: {
                    labels: {
                        formatter: function (e) {
                            return "$" + e + "k";
                        },
                    },
                    tickAmount: 4,
                    min: 0,
                },
                fill: { opacity: 1 },
                legend: { show: !0, position: "bottom", horizontalAlign: "center", fontWeight: 500, offsetX: 0, offsetY: -14, itemMargin: { horizontal: 8, vertical: 0 }, markers: { width: 10, height: 10 } },
                colors: areachartSalesColors,
            }),
            (chart = new ApexCharts(document.querySelector("#sales-forecast-chart"), options)).render()),
        getChartColorsArray("deal-type-charts")),

    revenueExpensesChartsColors =
        (dealTypeChartsColors &&
            ((options = {
                series: [
                    { name: "Pending", data: [80, 50, 30, 40, 100, 20] },
                    { name: "Loss", data: [200, 30, 40, 80, 20, 80] },
                    { name: "Won", data: [44, 76, 78, 13, 43, 10] },
                ],
                chart: { height: 341, type: "radar", dropShadow: { enabled: !0, blur: 1, left: 1, top: 1 }, toolbar: { show: !1 } },
                stroke: { width: 2 },
                fill: { opacity: 0.2 },
                legend: { show: !0, fontWeight: 500, offsetX: 0, offsetY: -8, markers: { width: 8, height: 8, radius: 6 }, itemMargin: { horizontal: 10, vertical: 0 } },
                markers: { size: 0 },
                colors: dealTypeChartsColors,
                xaxis: { categories: ["2016", "2017", "2018", "2019", "2020", "2021"] },
            }),
            (chart = new ApexCharts(document.querySelector("#deal-type-charts"), options)).render()),
        getChartColorsArray("revenue-expenses-charts"));
   
revenueExpensesChartsColors &&
((options = {
    series: periodMap[choosedValue].options.series,
    chart: { height: 290, type: "area", toolbar: "false" },
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {categories: periodMap[choosedValue].options.xaxis.categories},
    yaxis: {
        labels: {
            formatter: function (e) {
                return "$" + e + "k";
            },
        },
        tickAmount: 5,
        min: 0,
        max: 260,
    },
    colors: revenueExpensesChartsColors,
    fill: { opacity: 0.06, colors: revenueExpensesChartsColors, type: "solid" },
    zoom: {
        enabled: true,
        type: 'x',  
        autoScaleYaxis: false,  
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1
          }
        }
    }
}),
    (chart = new ApexCharts(document.querySelector("#revenue-expenses-charts"), options)).render());
}

function setSelectedInput(){
    const title = document.querySelector('.card-header-dropdown .text-muted');
    let val = choosedValue.split('-').map(w => {
        return w[0].toUpperCase() + w.slice(1); 
    }).join(' ')
    title.innerHTML = val
}

let initialWindowWidth = window['innerWidth']
window.onresize = (e) => {
    if(choosedValue == ['last-month'] && Math.abs(initialWindowWidth - window['innerWidth']) > 100){
        initialWindowWidth = window['innerWidth']
        periodMap['last-month'].options = {series: [
            { name: "Revenue", data: detectMonthLength(getRevenueFromHtml(month)) },
            { name: "Expenses", data: detectMonthLength(getExpensesFromHtml(month)) },
        ],
        xaxis: {categories: detectMonthLength([...month].map((_,i) => i+1))}
        }
        render()
    }
}

})()//end of render function


function getRevenueFromHtml(nodeList){
    return [...nodeList].map(node => node.getAttribute('data-revenue'))
}
function getExpensesFromHtml(nodeList){
    return [...nodeList].map(node => node.getAttribute('data-expenses'))
}

function detectMonthLength(arr){
    return window['innerWidth'] <= 500 ? [...arr].filter((_,i) => i == 0 || i % 5 == 0) : 
        window['innerWidth'] > 500 && window['innerWidth'] <= 950 ? [...arr].filter((_,i) => i == 0 || i % 3 == 0) :
    [...arr]
}


