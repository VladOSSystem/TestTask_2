const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('weather.db');

const dbManger = () => {

    // Creating DB in case non existing 
    db.run('CREATE TABLE if not exists weather (id integer primary key, city text, unix_day1 int, unix_day2, unix_day3 int, unix_day4 int, unix_day5 int )');
    db.run('CREATE TABLE if not exists unix_1 (timestamp int, temp int, weather text, country text, city text)');
    db.run('CREATE TABLE if not exists unix_2 (timestamp int, temp int, weather text, country text, city text)');
    db.run('CREATE TABLE if not exists unix_3 (timestamp int, temp int, weather text, country text, city text)');
    db.run('CREATE TABLE if not exists unix_4 (timestamp int, temp int, weather text, country text, city text)');
    db.run('CREATE TABLE if not exists unix_5 (timestamp int, temp int, weather text, country text, city text)');
};
const check = (city) => {
        
    const sql = `SELECT * FROM weather WHERE weather.city = '${city}'`;
    return sql;
};
const deleteWeather = (city) => {
    // eslint-disable-next-line no-unused-vars
    const statements = [
        `DELETE FROM weather WHERE city = '${city}'`,
        `DELETE FROM unix_1 WHERE city = '${city}'`,
        `DELETE FROM unix_2 WHERE city = '${city}'`,
        `DELETE FROM unix_3 WHERE city = '${city}'`,
        `DELETE FROM unix_4 WHERE city = '${city}'`,
        `DELETE FROM unix_5 WHERE city = '${city}'`,
    ].map((sql) => db.run(sql, [], (err) => {
        if (err) {
            throw err;
        }
        console.log('deleted');
    }));
};
const responseCreactor = (city) => {
    const sql = `SELECT
     unix_1.timestamp, 
     unix_1.temp,
     unix_1.weather, 
     unix_1.country, 
     unix_1.city
     FROM unix_1 
     WHERE unix_1.city = '${city}'
     UNION ALL
     SELECT 
     unix_2.timestamp,
     unix_2.temp,
     unix_2.weather, 
     unix_2.country, 
     unix_2.city 
     FROM unix_2
     WHERE unix_2.city = '${city}'
     UNION ALL
     SELECT 
     unix_3.timestamp, 
     unix_3.temp,
     unix_3.weather, 
     unix_3.country, 
     unix_3.city 
     FROM unix_3
     WHERE unix_3.city = '${city}'
     UNION ALL
     SELECT 
     unix_4.timestamp,
     unix_4.temp,
     unix_4.weather, 
     unix_4.country, 
     unix_4.city 
     FROM unix_4
     WHERE unix_4.city = '${city}'
     UNION ALL
     SELECT 
     unix_5.timestamp,
     unix_5.temp,
     unix_5.weather, 
     unix_5.country, 
     unix_5.city 
     FROM unix_5
     WHERE unix_5.city = '${city}'
     `; 
     
    return sql;
};
const insert = (table, columns, data) => {

    db.run(`
        INSERT INTO ${table}
        (${columns.join(',')})
        VALUES ( ${columns.map(() => '?')} )`,
        data);
};
module.exports = {
    dbManger,
    db,
    check,
    insert,
    responseCreactor,
    deleteWeather,
};