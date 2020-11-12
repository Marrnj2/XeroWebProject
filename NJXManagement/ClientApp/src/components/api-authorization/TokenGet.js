
 export function Getter(){
        fetch("/SignIn")
        .then(r => r.text())
        .then(data => {
        if(data != "")
        {
            window.location.href = data
        }else{
            window.location.href = "/"
        }
        })
    } 
