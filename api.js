
document.getElementById('naav').addEventListener('click',loadtext);
const inp = document.getElementById('search');
const brow = document.getElementById('browse');
var tex = document.getElementById('searchData');

brow.addEventListener('click',analyzetext);
inp.addEventListener('click',searchdir);

function loadtext(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','Installs.json',true);
    xhr.onload = function(){
        if(this.status == 200){
            const data = JSON.parse(this.responseText);
            console.log(data.length);
            const installoccur = data.reduce(function(acc,iter){
                //console.log(iter["install"]["doc"]["title"]);
                let key = iter["install"]["doc"]["title"];
                if(iter["install"]["doc"]["title"] in acc){
                    acc[key] = acc[key]+1;
                }
                else{
                    acc[key]=1;
                }
                return acc;
            },{});
            document.getElementById('name_apps').innerHTML = '';
            
            for(var i in installoccur){
                document.getElementById('name_apps').innerHTML += `
                ${i} :  ${installoccur[i]}
                <hr>`;
            }
        }
    }
    // xhr.onreadystatechange = function(){
    //     console.log(xhr.readyState);
    //     if(this.readyState==4 && this.status ==200){
    //         console.log("Yupp")
    //         console.log(this.responseText);
    //     }
    // }
    xhr.send();
}

function analyzetext(){
    const xh1 = new XMLHttpRequest();
    xh1.open('GET','BrowserHistory.json',true);
    
    function construobj(){
        this.hits = 0;
        this.links = {};
    };
    var mail = new construobj();
    var google = new construobj();
    var youtube = new construobj();
    var recreation = new construobj();

    // var anal = {
    //     hits:0,
    // };
    // const mail = Object.create(anal);
    // mail["links"] = {};
    // const google = Object.create(anal);
    // google['links'] = {};
    // var youtube = Object.create(anal);
    // youtube['links'] = {};
    // var recreation = Object.create(anal);
    // recreation['links'] = {};
    xh1.onload = function(){
        if(this.status==200){
            const data = JSON.parse(this.responseText);
            const real = data["Browser History"];
            for(var i in real){
                if(real[i]["url"].indexOf("mail") !== -1){
                    operatenow(i,mail);
                }
                else if(real[i]["url"].indexOf("google") !== -1){
                    operatenow(i,google); 
                }
                else if(real[i]["url"].indexOf("youtube") !== -1){
                    operatenow(i,youtube);
                }
                else if(real[i]["url"].indexOf("porn") !==-1 || real[i]["url"].indexOf("xvid") !==-1 || real[i]["url"].indexOf("brazzer") !==-1
                || real[i]["url"].indexOf("redtube") !==-1 ){
                    operatenow(i,recreation);
                    
                }     
            }
        function operatenow(x,y){
            if(!([real[x]["title"]] in y['links'])){
                y["hits"] +=1;
                Object.defineProperty(y['links'],`${real[x]["title"]}`,{
                    value:[],
                    writable:true
                });
                y['links'][`${real[x]["title"]}`].push(real[x]['url']);
            }
        
        }
        }
        //const recarr = Array.from(waste["recreation"].toString()).map(Number);
        
        window.localStorage.clear();
        console.log(mail);
        console.log(google);
        console.log(youtube);
        console.log(recreation);
        localStorage.setItem('mail',JSON.stringify(mail["hits"]));
        localStorage.setItem('google',JSON.stringify(google["hits"]));
        localStorage.setItem('youtube',JSON.stringify(youtube["hits"]));
        localStorage.setItem('recreation',JSON.stringify(recreation["hits"]));
    }
    xh1.send();
}

function searchdir(){
    const xh = new XMLHttpRequest();
    xh.open('GET','BrowserHistory.json',true);
    var mydata = {
        hits:0,
        links:{}
    };
    xh.onload = function(){        
        if(this.status===200){
            console.log(tex.value);
            const real=JSON.parse(this.responseText);
            const data = real["Browser History"];
            for(var i in data){
                if((data[i]["url"].indexOf(tex.value)!==-1) || data[i]["title"].indexOf(tex.value)!==-1){
                    mydata["hits"]+=1;
                    mydata["links"][`${data[i]["title"]}`] = `${data[i]["url"]}`;
                }
            }
        }
    console.log(mydata);
    }
    xh.send();
}

