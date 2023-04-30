import * as React from 'react';
//import styles from './Thirdpartyapiv2.module.scss';
import { IThirdpartyapiv2Props } from './IThirdpartyapiv2Props';
import axios from 'axios';
//import { escape } from '@microsoft/sp-lodash-subset';

export interface IWeatherData {
  temperature: string;
  description: string;
}

export interface IApiVersion2State {
  weatherData: IWeatherData | null;
}

export default class Thirdpartyapiv2 extends React.Component<IThirdpartyapiv2Props, IApiVersion2State> {

  constructor(props: IThirdpartyapiv2Props) {
    super(props);
    this.state = {
      weatherData: null,
    };
  }

  public componentDidMount(): void {
    // Call the weather API
    axios.get('https://api.weatherapi.com/v1/current.json?key=2e489f0423d94a3fbd643541232904&q=Gwalior')
      .then((response) => {
        const { temp_c, condition } = response.data.current;
        const weatherData: IWeatherData = {
          temperature: temp_c,
          description: condition.text,
        };
        this.setState({ weatherData });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }


  public render(): React.ReactElement<IThirdpartyapiv2Props> {
    
    return (
     <>
<div >
              <span >Weather Information</span>
              {this.state.weatherData ? (
                <div>
                  <p>Temperature: {this.state.weatherData.temperature}°C</p>
                  <p>Description: {this.state.weatherData.description}</p>
                </div>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
            <h1>Hello World</h1>
            <p>This is first paragraph</p>

     </>
    );
  }
}
