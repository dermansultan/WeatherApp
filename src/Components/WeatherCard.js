import React from 'react';
function WeatherCard(props){
        return(
            <div className='weatherCardWrapper'>
                {props.userSearched ? 
                    <div className='cardContainer'>
    <div className='weatherMain'>
        <h4 className='cardCityName'>{props.fetchedObj.name.replace(/['"]+/g, '')}</h4>
        <div className='IconTempWrapper'>
        <img className='weatherIcon' alt='weatherIcon' src={`https://openweathermap.org/img/wn/${props.fetchedObj.img}@2x.png`}></img>
        <h1 className='cardTemp'>{
            props.weatherUnit ? Math.round((props.fetchedObj['main'].temp - 273.15) *10 ) /10 + ' °C' : Math.round(((props.fetchedObj['main'].temp - 273.15) * 9/5 + 32) *10 ) /10 + ' °F'
            }</h1>
        </div>
        <h3 className='cardWeatherDesc'>{props.fetchedObj.weatherDesc.replace(/['"]+/g, '')}</h3>
    </div>
    <div className='weatherConditions'>
        <div className='conditionSquare'>
            <p className='conditionTitle'>Sunrise</p>
            <p className='conditionInfo'>{props.fetchedObj.sunRise}</p>
        </div>
        <div className='conditionSquare'>
            <p className='conditionTitle'>Cloudiness</p>
            <p className='conditionInfo'>{props.fetchedObj.cloudPercent + '%'}</p>
        </div>
        <div className='conditionSquare'>
            <p className='conditionTitle'>Humidity</p>
            <p className='conditionInfo'>{props.fetchedObj.main['humidity'] + '%'}</p>
        </div>
        <div className='conditionSquare'>
            <p className='conditionTitle'>Sunset</p>
            <p className='conditionInfo'>{props.fetchedObj.sunSet}</p>
        </div>
        <div className='conditionSquare'>
            <p className='conditionTitle'>Wind</p>
            <p className='conditionInfo'>{props.fetchedObj.wind + ' km/h'}</p>
        </div>
        <div className='conditionSquare'>
            <p className='conditionTitle'>Visibility</p>
            <p className='conditionInfo'>{props.fetchedObj.visibility + ' km'}</p>
        </div>
    </div>
</div>
                : <div className='noSearch'>Choose a country and enter a city.</div>}
            </div>
            )
}
export default WeatherCard