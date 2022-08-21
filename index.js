//Hide parabox
let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = 'none';

// if user clicks on para hide json box
let paraRadio = document.getElementById('ParaRadio');
paraRadio.addEventListener("click", () => {
    document.getElementById('JsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';

})

// if user clicks on json hide para box
let JsonRadio = document.getElementById('JSONRadio');
JsonRadio.addEventListener("click", () => {
    document.getElementById('parameterBox').style.display = 'none';
    document.getElementById('JsonBox').style.display = 'block';

})

// PLus button add more
let count = 1;
let ParaBox = document.getElementById('parameterBox');
let addBtn = document.getElementById("addBtn");
let addPara = document.getElementById("addPara");
addBtn.addEventListener('click', () => {
    console.log(' hora kya kuch :>> ',);
    let str = `
            <div class="row g-1 my-2">
                <label for="Parameter1" class="col-sm-2 col-form-label ">Parameter${++count}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="inputKeyPara${count}" placeholder="Key Parameter">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="inputValuePara${count}" placeholder="Value Parameter">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary removeBtn" >-</button>
                </div>
            </div>
        </div>
    `;
    addPara.innerHTML += str;

    let removeBtn = document.getElementsByClassName("removeBtn");
    console.log('aayakya :>> ', removeBtn);
    for (item of removeBtn) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove(); //remove bada wala div
            console.log(' ye wala', e.target);
        })
    }

})


let submit = document.getElementById('Submit');
submit.addEventListener('click',()=>{
    document.getElementById('ResponseJsonBox').value='PLEASE WAIT.... FETCHING RESPONSE';

    let url= document.getElementById('URLField').value;
    let requestType= document.querySelector("input[name='gridRadios']:checked").value;
    let contentType= document.querySelector("input[name='gridRadios2']:checked").value;
    console.log('url,requestType,contentType ',url,requestType,contentType);
   
    if(contentType=='Parameters'){
        let data={};
        for (let index = 0; index < count+1; index++) {
            if(document.getElementById('inputKeyPara'+(index+1))!=undefined){
            let paraKey=document.getElementById('inputKeyPara'+(index+1)).value;
            let paraValue=document.getElementById("inputValuePara"+(index+1)).value;
            data[paraKey]=paraValue;
            
            
            }
            data=JSON.stringify(data);
            console.log(data);
            console.log(typeof data);
        }

    }

    else{
       data =  document.getElementById('RequestJsonBox').value;
       console.log(typeof data);
    }

    if(requestType=='GET'){
        fetch(url,{ method: 'GET',}).then(Response=>Response.text()).then((text)=>
        {
            document.getElementById('ResponseJsonBox').value=text;
        })
    }
    else{

        // POst  k liye ye sab karna padta
        fetch(url,{
            method: 'POST',
            body:data,
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(Response=>Response.text()).then((text)=>{
            document.getElementById('ResponseJsonBox').value=text;
        })

    }
})




