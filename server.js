const express = require('express');

const cors = require('cors');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const DataBase = require('./dbManager');

const PORT = 5001;
const API_URL = 'http://api.openweathermap.org/data/2.5/forecast';
// Logging
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB connection
DataBase.dbManger(); 
// Proxy path for requesting in non chacing 
app.get('/weather_proxy', createProxyMiddleware({ 
        target: API_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/weather_proxy': '',
        },
        selfHandleResponse: true,
        onProxyRes: (proxyRes, req, res) => {
            let body = new Buffer.from('');
            proxyRes.on('data', (data) => {
                body = Buffer.concat([body, data]);
            });
            proxyRes.on('end', async () => {
                // res.end(body);
                const response = JSON.parse(body);
                if (response.cod === '404') {
                    res.status(404).send(response);
                } else {
                    res.status(200).send(body);
                const query = DataBase.check(response.city.name);
                DataBase.db.all(query, [], (err, rows) => { 
                    if (err) {
                        throw err;
                    }   
                        if (rows.length < 1) {
                            const filtered = [];
                            // eslint-disable-next-line array-callback-return
                            response.list.map((v) => {
                                const middleOfDay = v.dt_txt.match('12:00:00');
                                if (middleOfDay !== null) filtered.push(v);
                            });
                            DataBase.insert(
                                'weather',
                                [
                                    'city', 
                                    'unix_day1', 
                                    'unix_day2', 
                                    'unix_day3', 
                                    'unix_day4', 
                                    'unix_day5',
                                ],
                                [
                                    response.city.name,
                                    filtered[0].dt,
                                    filtered[1].dt,
                                    filtered[2].dt,
                                    filtered[3].dt,
                                    filtered[4].dt,
                                ],
                            );
                            for (let i = 0; i <= 4; i++) {
                                DataBase.insert(
                                    `unix_${i + 1}`,
                                    [
                                        'timestamp',
                                        'temp',
                                        'weather',
                                        'country',
                                        'city',
                                    ],
                                    [
                                        filtered[i].dt,
                                        filtered[i].main.temp,
                                        filtered[i].weather[0].main,
                                        response.city.country,
                                        response.city.name,
                                    ],
                                );
                             }
                        }
                });
              }
            });
        },
    
})); 
// Checker route if we have caching one, in case no, proceed ahead to proxy 
app.get('/weather_checker', (req, res) => { 
    const { 
        appid,
        units, 
        q,
        clientTimestamp,
     } = req.query;
     const query = DataBase.responseCreactor(q);
     DataBase.db.all(query, [], (err, rows) => { 
        if (err) {
            throw err;
        }   
        if (rows.length < 1) {
            res.redirect(`/weather_proxy?appid=${appid}&units=${units}&q=${q}`);
        } else {
            const client = new Date(clientTimestamp * 1000);
            const cached = new Date(rows[0].timestamp * 1000);
            const cached2 = new Date(rows[1].timestamp * 1000);
            if (cached.getDate() < client.getDate() || cached2 < client.getDate()) {
                DataBase.deleteWeather(q);
                res.redirect(`/weather_proxy?appid=${appid}&units=${units}&q=${q}`);
            } else {
                res.send(rows);
            }
            
        }

     });

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});