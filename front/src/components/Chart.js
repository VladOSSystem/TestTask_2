import React, { 
  useEffect,
  useState,
   } from 'react';
import { 
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
   } from 'recharts';

const Chart = (props) => {
    const [data, setData] = useState([]);
    const [visual, setVisual] = useState(false);
    useEffect(() => {
      
      // eslint-disable-next-line array-callback-return
      props.weather.map((v) => { 
        const date = new Date(v.timestamp * 1000); 
        setData((prev) => [
            ...prev,
          {
           name: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
           temp: Math.round(v.temp),
          },
        ]);

      });
        setVisual(true);
        
    }, []);
          return (
        <div>
          {visual ? (
              <>
              <ResponsiveContainer width={730} height={250}>

                  <BarChart data={data}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='temp' fill='#333' />
                  </BarChart>
              </ResponsiveContainer>
            </>
        ) : null
        }
        </div>
    );
};
export default Chart;
