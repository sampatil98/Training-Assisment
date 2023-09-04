const form=document.getElementById("login_form");
const login=document.getElementById("login_btn");

login.addEventListener("click",(e)=>{
    e.preventDefault();
    let obj={
        email:form.email.value,
        password:form.password.value
    }

    fetch("http://localhost:8080/user/login",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        if(!data.isError){
            localStorage.setItem("token",data.token);
            alert(data.message);
            window.location.href="../dashbord.html"
        }else{
            alert(data.message);
        }
    })
})