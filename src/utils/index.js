// import axios from '../Services/axios';

export const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    if (getHours !== `00`) {
        return `${getHours} hours, ${getMinutes} minutes, ${getSeconds} seconds`
    } else if (getMinutes !== `00`) {
        return `${getMinutes} minutes, ${getSeconds} seconds`
    } else {
        return `${getSeconds} seconds`
    }

    // return `${getHours} hours, ${getMinutes} minutes, ${getSeconds} seconds`
}

export const charge = (time) => {
    return Math.round((((time) / 60) * 10));
}

// export const rideDetails = (rId) => {
//     axios({
//         url: '/rides/ridesummary/' + rId,
//         method: 'GET'
//     }).then((response) => {
//         const data = response.data;
//         console.log("start: " + data.startingPort);
//         console.log("totalTime: " + data.totalTime);
//         return data.totalTime;
//     }).catch(() => {
//         alert("Error in retrieving Data of Bike Data!!");
//     });
// }

export const amountToPoint = (amount) => {
    return (amount * 50);
}