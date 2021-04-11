



//get Element by Id

var reserve = document.getElementById("submit1");
var clear1 = document.getElementById("clear");      

//Add click response event for Reserve button

reserve.addEventListener('click',save);
clear1.addEventListener('click',clear);

var count = 0
//Delete all data when refreshing the page
function clear(){
    if(count == 0){
        localStorage.clear();
        count++;
    }
}


//save data
function save(){ 
   
    var reserve = new Object;
    reserve.keyname = document.getElementById("name").value;  
    reserve.email = document.getElementById("email").value;
    reserve.date = document.getElementById("date").value;  
    reserve.time = document.getElementById("time").value;
    reserve.venue = document.getElementById("venue").value;
    //Parse a string from an object
    var str = JSON.stringify(reserve);
    isJsonString(str);
 
    // change time to seconds
    var nowSeconds = time_to_sec(reserve.time);

    // set opening hours
    var targetSeconds = 23 * 3600;
    var targetSeconds1 = 8 * 3600;

    //To determine if it is during opening hours
    if(nowSeconds > targetSeconds || nowSeconds < targetSeconds1){
        alert("Sorry, the opening hours are from 8am until 11pm！");
    }else{
        //Check whether the venue and time selected by the user have been booked 
        if(check(reserve) == false){
         }else{
        localStorage.setItem(reserve.keyname,str); 
        alert("Added successfully");
    }
    }

}

//Check whether the venue and time selected by the user have been booked 
function check(reserve){
    //Compare with all the data in the database and check the conflict time
    for(i=0;i<localStorage.length;i++){  
        var keyname = localStorage.key(i);  
        var str = localStorage.getItem(keyname);
        //Parse a string into a json object
        var data = JSON.parse(str);
        isJSON(str);

        if(reserve.date == data.date && reserve.venue == data.venue){
            var ScheduledSeconds = time_to_sec(data.time);
            var nowSeconds  = time_to_sec(reserve.time);
            // time in this scope can not be reserve
            var duration = ScheduledSeconds + 1 * 3600;
            var duration1 = ScheduledSeconds - 1 * 3600;
            // Tell the user the optional time
            var  targettime = ScheduledSeconds - 1 * 3600;
            var  targettime1 = ScheduledSeconds + 1 * 3600;
         
            if(nowSeconds >= ScheduledSeconds && nowSeconds <= duration){

                alert('The venue of ' + reserve.venue + ' on ' + data.time + ' aleady by booked! '
                + 'please change to after the' + changetime(targettime1) + ' or another time! Thank for you cooperation');             
                return false;
                
            }else if(nowSeconds <= ScheduledSeconds && nowSeconds >= duration1){   
                alert('The venue of ' + reserve.venue + ' on ' + data.time + ' aleady by booked! '
                + 'please change to before the' + changetime(targettime) + ' or another time! Thank for you cooperation');
                return false;
            }
            
        }
    }
}
// Change time to seconds
var time_to_sec = function (time) {  
    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    
    var s = Number(hour*3600) + Number(min*60);
    return s;
};

//change seconds back to time
function changetime(value) {
    var secondTime = parseInt(value);// Second
    var minuteTime = 0;// Minute
    var hourTime = 0;// Hour
    if(secondTime > 60) {
        //If the number of seconds is greater than 60, convert the number of seconds to an integer
        minuteTime = parseInt(secondTime / 60);  
        secondTime = parseInt(secondTime % 60);
      
        if(minuteTime > 60) {
            hourTime = parseInt(minuteTime / 60);
            minuteTime = parseInt(minuteTime % 60);
        }
    }

    var time = "" + parseInt(secondTime);

    if(minuteTime > 0) {
        time = "" + parseInt(minuteTime) + ":" + time;
    }
    if(hourTime > 0) {
        time = "" + parseInt(hourTime) + ":" + time;
    }
    return time;
}

//find data  
function find(){   
  
    var searchName = document.getElementById("search").value; 
    var str = localStorage.getItem(searchName); 
    var result = document.getElementById("result");
 
    var reserve = JSON.parse(str);
    isJSON(str);
    //Determine whether it is empty
    if(str == null){
        result.innerHTML = "Can not find the record! "
    }else
    result.innerHTML =  "&nbsp;&nbsp;"+reserve.keyname+"&nbsp;&nbsp;"+reserve.email+"&nbsp;&nbsp;"+reserve.date+"&nbsp;&nbsp;"+reserve.time+"&nbsp;&nbsp;"+reserve.venue+"</td></tr>";
}
//Load all the data
function loadAll(){  
    var list = document.getElementById("list");  
    //Output all data in a loop
    if(localStorage.length>0){  
        var result = "<table border='1'>";  
        result += "<tr><td>name</td><td>email</td><td>date</td><td>time</td><td>venue</td><td>delete</td></tr>";  
        for(var i=0;i<localStorage.length;i++){  
    
            var keyname = localStorage.key(i);  

                var str = localStorage.getItem(keyname);  
                var reserve = JSON.parse(str);
                isJSON(str);
               
                result += "<tr>" +
                "<td>"+reserve.keyname+"</td>"+
                "<td>"+reserve.email+"</td>"+
                "<td>"+reserve.date+"</td>"+
                "<td>"+reserve.time+"</td>"+
                "<td>"+reserve.venue+"</td>"+
                "<td><input type=button value=delet onclick=del("+"'"+keyname+"'"+") ></td>" +
                "</tr>";
     
        } 
        //Add result to the view 
        result += "</table>";  
        list.innerHTML = result;  
    }else{  
        list.innerHTML = "Nothing here……";  
    }  
}   
//delete data
function del(keyname) {
    localStorage.removeItem(keyname);
    alert("successfully deleted!");
    loadAll();
  }

//Check if it is a string
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
    console.log('It is not a string!')    
}
//Check if it is a json object
function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch(e) {
    }
    return false;
}

