const API_KEY = "3f1540e3a3b4f42221645a9a85adc9992ba9263c17f9905ec22b8ceafcd1af40";

let myChart;

const getData = async(coin) => {
    const authorizationParam = `&api_key=${API_KEY}`;
    const baseURL = "https://min-api.cryptocompare.com/data/v2";
    let path = "/histohour";
    let exampleParams = `?fsym=${coin}&tsym=USD&limit=20&toTs=-1`;

    try {
        let url = baseURL + path + exampleParams + authorizationParam;
        console.log(url);
        let response = await fetch(url);
        let { Data } = await response.json();
        return Data.Data;
    } catch (error) {
        console.log("ERROR : getData error", error);
    }
};
const renderChart = ({ times, prices, datasetName }) => {
    const ctx = document.getElementById("myChart").getContext("2d");

    myChart = new Chart(ctx, {
        type: "line", //type of your chart
        data: {
            labels: times,
            datasets: [{
                label: datasetName,
                data: prices,
                backgroundColor: ["rgba(100, 99, 132, 0.2)"],
                borderColor: ["rgba(100, 99, 132, 1)"],
                borderWidth: 1,
            }, ],
        }, // data setting object,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                subtitle: {
                    text: `Coin price today!`,
                    display: true,
                },
            },
        },
    });
};
const main = async(coin = "BTC", destroy = false) => {
    // get data
    const data = await getData(coin);
    //process data to chartjs structure
    let chartData = {
        times: data.map((element, index) => index),
        datasetName: coin.toUpperCase(),
        prices: data.map((el) => el.close),
    };
    if (destroy) {
        myChart.destroy();
    }
    //render chart
    renderChart(chartData);
};

let ethButton = document.getElementById("eth");
ethButton.addEventListener("click", () => {
    main("eth", true);
});

let btcButton = document.getElementById("btc");
btcButton.addEventListener("click", () => {
    main("btc", true);
});

main();