//https://api.smartcar.com/v2.0/vehicles

async function getCars() {
    const promise = await fetch('https://javascript-sdk.smartcar.com/v2/redirect?app_origin=https://myapp.com')
    const result = await promise.json();

    console.log(result);
}

getCars();