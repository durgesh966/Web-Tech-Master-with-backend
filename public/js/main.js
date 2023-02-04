const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const day = document.getElementById('day').innerText = myDay();
const date = document.getElementById('today_date').innerHTML = todaydate(); 
const time = document.getElementById("time").innerText = myTime();

// --------------------print full date function start------------------------------------------------  
function todaydate() {
    var oDate = new Date();
    var nDate = ("0" + (oDate.getDate())).slice(-2);
    var nMnth = ("0" + (oDate.getMonth() +1)).slice(-2);
    var nYear = oDate.getFullYear();
    var strTime =nDate + ' - ' + nMnth + ' - ' + nYear;
    return strTime;
}
// ------------------end

// -----------------------print full weekday function-------------------------------------------
function myDay() {
    var a = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var r = weekdays[a.getDay()];
    let i = r;
    return i;
}
// ----------------------------end

// ----------------------------print full time function -------------------------------
function myTime() {
    var d = new Date();
    var n = d.toLocaleTimeString();
    let t = n;
    return t;
}
// ------------------------end 
const getInfo = async(event) => { 
    event.preventDefault();

    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    }else{

        try{
           

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=dbd3b02d8958d62185d02e944cd5f522`
            // let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&APPID=dbd3b02d8958d62185d02e944cd5f522`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];
            // console.log(arrData);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            // console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
            temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";
           
       
        }catch{
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText =  `please enter the proper city name`;
            console.log('please add the proper city name');
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);