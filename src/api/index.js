import axios from "axios";

const url = "https://covid19.mathdro.id/api";

// for cards
export const fetchData = async (country) => {
    let changeableUrl = url;
    // if we specify a country add the url of the specific country
    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const {
            // destructure the data while receiving it
            data: { confirmed, recovered, deaths, lastUpdate },
        } = await axios.get(changeableUrl);

        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
        };
    } catch (error) {}
};

// for charts

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        // this would return an array so we need to map it
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    } catch (error) {}
};

// for country picker

export const fetchCountries = async () => {
    try {
        const {
            data: { countries },
        } = await axios.get(`${url}/countries`);
        // console.log(response);
        // for each country return its country name
        return countries.map((country) => country.name);
    } catch (error) {}
};
