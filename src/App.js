import React from "react";
import styles from "./App.module.css";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";

class App extends React.Component {
    state = {
        data: {},
        country: "",
    };
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        console.log(fetchedData);
        console.log(country);
        // set the state
    };

    render() {
        const { data } = this.state;
        return (
            <div className={styles.container}>
                <Cards data={data} />
                <Chart />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
            </div>
        );
    }
}

export default App;
