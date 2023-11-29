function Analyze(){
    var password = document.getElementById("textarea").value;

    document.getElementById("length").innerHTML=password.length; 
    let entropy=((password.length) * (Math.log2(256)));
    document.getElementById("entropy").innerHTML=entropy;
    let digit=/\d/,d=0,
    lowercase=/[a-z]/,l=0,
    uppercase=/[A-Z]/, u=0,
    symbols=/[^A-Za-z0-9]/,s=0,le=0;

    if(password.length>8){
        document.getElementById("len").innerHTML= "&#10004;";le=1;
    } 
    else document.getElementById("len").innerHTML= "&#10008;";

    if(digit.test(password)){
        document.getElementById("digit").innerHTML= "&#10004;";d=1;
    } 
    else document.getElementById("digit").innerHTML= "&#10008;";
    
    if(lowercase.test(password)){
        document.getElementById("lowercase").innerHTML= "&#10004;";l=1;
    } 
    else document.getElementById("lowercase").innerHTML= "&#10008;";

    if(uppercase.test(password)){
        document.getElementById("uppercase").innerHTML= "&#10004;";u=1;
    } 
    else document.getElementById("uppercase").innerHTML= "&#10008;";
    
    if(symbols.test(password)) {
        document.getElementById("sym").innerHTML="&#10004";s=1;
    }
    else document.getElementById("sym").innerHTML="&#10008";

    let strengthGraph=le+d+l+u+s;

    switch(strengthGraph){
      case 1: document.getElementById("complexity").innerHTML="Very Weak";break;
      case 2: document.getElementById("complexity").innerHTML="Weak";break;
      case 3: document.getElementById("complexity").innerHTML="Good";break;
      case 4: document.getElementById("complexity").innerHTML="Strong";break;
      case 5: document.getElementById("complexity").innerHTML="Very Strong";break;
      default : document.getElementById("complexity").innerHTML="Unpredictable";break;
    }
    strengthGraph=strengthGraph*20;

    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    const charset=charSet.length;
    var pc = 1*Math.pow(10, -6)*Math.pow(charset, password.length)*0.45;
    var botnet = pc/100000*0.45;
    if (pc < 1 ){ var pctime = "In Miliseconds";}
    else { var pctime = secondsToHms(pc);}
    if (botnet < 1 ){ var botnettime = "In Miliseconds";}
    else { var botnettime = secondsToHms(botnet);}      
    document.getElementById("brute").innerHTML = "With a Modern PC : " + pctime + "<br>Supercomputer or Medium Size Botnet: " + botnettime;

    var p="",q="";
    // for (let i=0; i<pctime.length ;i++) {
    //   console.log(pctime[i]);
    //   if((pctime.charCodeAt(i)<65 && pctime.charCodeAt(i)>90) || (pctime.charCodeAt(i)<97 && pctime.charCodeAt(i)>122)){
    //     p+=pctime[i];
    //     console.log(p);
    //   }
    //   else break;
    // }
    // for (let i=0; i<botnettime.length ;i++) {
    //   if((botnettime.charCodeAt(i)<65 && botnettime.charCodeAt(i)>90) || (botnettime.charCodeAt(i)<97 && botnettime.charCodeAt(i)>122)){
    //     q+=botnettime[i];
    //     console.log(q);
    //   }
    //   else break;
    // }
    // if(pctime==="In Miliseconds")p+="10";
    // if(botnettime==="In Miliseconds")q+=String(10);
    // console.log(p,q);


    // Create a regular expression to match the string 
    const year = /(year|years)/,days=/(day|days)/,hours=/(hour|hours)/,min=/(minute|minutes)/,sec=/(second|seconds)/;

    // Find the first match of the regular expression in the string 
    const matchy = year.exec(pctime), matchd=days.exec(pctime), matchh=hours.exec(pctime),matchm=min.exec(pctime),matchs=sec.exec(pctime);
    const mby=year.exec(botnettime),mbd=days.exec(botnettime),mbh=hours.exec(botnettime),mbm=min.exec(botnettime),mbs=sec.exec(botnettime);

    // If there is a match, print the index of the match
    if (matchy) {
      p=pctime.slice(0,matchy.index-1);
    } else if (matchd) {
      p=pctime.slice(0,matchd.index-1);
    } else if (matchh) {
      p=pctime.slice(0,matchh.index-1);
    } else if (matchm) {
      p=pctime.slice(0,matchm.index-1);
    } else if (matchs) {
      p=pctime.slice(0,matchs.index-1);
    } else{
      console.log("not found");
    }

    if (mby) {
      q=botnettime.slice(0,mby.index-1);
    } else if (mbd) {
      q=botnettime.slice(0,mbd.index-1);
    } else if (mbh) {
      q=botnettime.slice(0,mbh.index-1);
    } else if (mbm) {
      q=botnettime.slice(0,mbm.index-1);
    } else if (mbs) {
      q=botnettime.slice(0,mbs.index-1);
    } else{
      console.log("not found");
    }
    if(parseInt(p)>1000)p="1000";
    if(parseInt(q)>1000)q="1000";
    if(pctime==="In Miliseconds")p=0.5;
    if(botnettime==="In Miliseconds")q=0.5;
console.log(p);console.log(q);

    async function hashPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashedPassword = hashArray.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
      return hashedPassword;
    }
    
    hashPassword(password)
      .then(hashed => {
        document.getElementById("hash").innerHTML=hashed;
      })
      .catch(error => {
        console.error('Error:', error);
      });

      // Get the canvas element by its id
      const ctx = document.getElementById('myChart').getContext('2d');
      const xtemps=['PwdLength', 'Entropy', 'PCTime', 'BotNetTime', 'Complexity']; //x-axis data
      const ytemps=[password.length, entropy, p, q, strengthGraph]; //y-axis data
      // Define data for the chart
      const data = {
        labels: xtemps,
        datasets: [{
          label: 'Password Analysis',
          data: ytemps, // Values for the bars
          backgroundColor: 'rgba(255,255,255, 0.7)',
          hoverBackgroundColor: 'rgba(0,0,0, 1)',
          borderColor: 'rgba(255, 255, 255, 1)',
          minBarLength:'100px',
          borderWidth: 1
        }]
      };
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true, // Start the y-axis at zero
              ticks: {
                color: 'white', // Change the color of x-axis labels
              }
            },
            x: {
              ticks: {
                color: 'white', // Change the color of x-axis labels
              }
            }
            
          }
        }
      });

      document.getElementById("myChart").innerHTML=myChart;


      const set= new Set(['123456',	'admin','12345678','123456789','1234','12345','password','123','Aa123456','1234567890','UNKNOWN','1234567','123123','111111','Password','12345678910','000000','admin123','********','user']);
      if(set.has(password)){
        document.getElementById("blacklist").innerHTML="&#10004;";
      } 
      else document.getElementById("blacklist").innerHTML= "&#10008;";
    
}


function secondsToHms(sec) {
  sec = Number(sec);
  var y = Math.floor(sec / (3600 * 24 *365));
  var d = Math.floor(sec % (3600 * 24 *365) / 86400);
  var h = Math.floor(sec % 86400 / 3600);
  var m = Math.floor(sec % 3600 / 60);
  var s = Math.floor(sec % 3600 % 60);
  
              
  var yDisplay = y > 0 ? y + (y == 1 ? " year " : " years ") : "";
  var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  
  let str=yDisplay + dDisplay + hDisplay + mDisplay + sDisplay; 
  return str;
}


function Blacklist(){
  // Get the canvas element by its id
  const ctx1 = document.getElementById('myChart1').getContext('2d');
  const xtemps1=['123456',	'admin','12345678','123456789','1234','12345','password','123','Aa123456','1234567890','UNKNOWN','1234567','123123','111111','Password','12345678910','000000','admin123','********','user']; //x-axis data
  const ytemps1=['4524867','4008850', '1371152', '1213047', '969811', '728414', '710321', '528086', '319725', '302709', '240377', '234187', '224261', '191392', '177725', '172502', '168653', '159354', '152497', '146233']; //y-axis data
  // Define data for the chart
  const data1 = {
    labels: xtemps1,
    datasets: [{
      label: 'Blacklist',
      fontColor:'rgba(255, 255, 255, 1)',
      data: ytemps1, // Values for the bars
      backgroundColor: 'rgba(255,255,255, 0.7)',
      hoverBackgroundColor: 'rgba(0,0,0, 1)',
      borderColor: 'rgba(255, 255, 255, 1)',
      minBarLength:'100px',
      borderWidth: 1
    }]
  };
  const myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: data1,
    options: {
      legend: {
        labels: {
            fontColor: "blue",
            fontSize: 18
        }
    },
      scales: {
        y: {
          beginAtZero: true, // Start the y-axis at zero
          ticks: {
            color: 'white', // Change the color of x-axis labels
          }
        },
        x: {
          ticks: {
            color: 'white', // Change the color of x-axis labels
          }
        }
        
      }
    }
  });

  document.getElementById("myChart1").innerHTML=myChart1;

}

function DisplayData(){
  const p= "<br><br><br><b>1. Password Length :</b> Password length refers to the number of characters in a password. Longer passwords tend to be more secure because they offer a larger number of possible combinations, making them harder for attackers to guess or crack.<br>",
  e="<b>2. Entropy :</b> Entropy is a measure of randomness or unpredictability in a password. Higher entropy indicates greater complexity and makes the password more resistant to brute force attacks. It's calculated based on the number of characters and the randomness of their arrangement.<br>",
  l8="<b>3. Length greater/equal to 8 :</b> A password with a length greater than or equal to 8 characters is generally considered more secure. Shorter passwords might be easier to guess or crack using automated methods.<br>",
  d1="<b>4. At least 1 Digit :</b> Including at least one digit (0-9) in the password adds complexity and makes it stronger. Mixing digits with letters and symbols increases the possible combinations, enhancing security.<br>",
  lc1="<b>5. At least 1 LowerCase :</b> Having at least one lowercase letter (a-z) in the password increases its complexity. Combining lowercase letters with other character types improves overall password strength.<br>",
  uc1="<b>6. At least 1 UpperCase :</b> Including at least one uppercase letter (A-Z) adds diversity to the password, making it more difficult to guess or crack. Mixing uppercase and lowercase letters enhances security.<br>",
  s1="<b>7. At least 1 Symbol :</b> Symbols (such as @, #, $, etc.) add an extra layer of complexity to the password. Including at least one symbol increases the possible combinations, strengthening the password.<br>",
  tb="<b>8. Time :</b> The time taken to crack a password using a brute force attack is an estimation of the effort required by attackers to guess the password by systematically trying all possible combinations. Longer, more complex passwords generally take more time to crack.<br>",
  hp="<b>9. Hashed Password :</b> A hashed password is a secure representation of the original password after it has undergone a cryptographic hashing algorithm. Hashing converts the password into an irreversible string of characters, protecting it from being easily reversed to its original form.<br>",
  gr="<b>10. Graphical representation :</b> It involves visually displaying password analysis results, such as strength metrics, distribution of password characteristics, or other relevant data using charts, graphs, or visualizations to help users understand the findings more intuitively.<br>";

  document.getElementById("data").innerHTML= p+"<br><br>"+e+"<br><br>"+l8+"<br><br>"+d1+"<br><br>"+lc1+"<br><br>"+uc1+"<br><br>"+s1+"<br><br>"+tb+"<br><br>"+hp+"<br><br>"+gr;

}