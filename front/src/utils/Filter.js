// eslint-disable-next-line consistent-return
const Filter = (props) => {
    if (props.length === 5) {
        return props;
    // eslint-disable-next-line no-else-return
    } else {
        // eslint-disable-next-line no-unused-vars
        const filtered = [];
        const output = [];
        // eslint-disable-next-line array-callback-return
        props.list.map((v) => {
            const middleOfDay = v.dt_txt.match('12:00:00');
            if (middleOfDay !== null) filtered.push(v);
        });
        // eslint-disable-next-line array-callback-return
        filtered.map((v) => {
            output.push({
                timestamp: v.dt,
                temp: v.main.temp,
                weather: v.weather[0].main,
                country: props.city.country,
                city: props.city.name,

            });
        });
        return output;
    }  
};

export default Filter;