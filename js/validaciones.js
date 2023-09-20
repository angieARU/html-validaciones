export function validar (input){
    const tipoInput=input.dataset.tipo;
    if(validadores[tipoInput])
    {
        validadores[tipoInput](input);
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";

    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput,input);
        
    }
}
const tipoDeErrores=[

    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"

];

const mensajesError={
    nombre:{
        valueMissing:"Este campo no puede estar vacio"
    },
    email:{
        valueMissing:"Este campo no puede estar vacio",
        typeMismatch:"Correo no correcto"
    },
    password:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch:"al menos 8 caracteres, maximo 15"
    },
    nacimiento:{
        valueMissing:"Este campo no puede estar vacio",
        customError:"Debes tener mas de 18 años"
    },


};
const validadores ={
    nacimiento: (input) =>validarNacimiento(input),
};
function mostrarMensajeError(tipoInput,input){
    let mensaje="";
tipoDeErrores.forEach((error) =>{
    if (input.validity[error]){
        console.log(tipoInput,error);
        console.log(input.validity[error]);
        console.log(mensajesError[tipoInput][error]);
        mensaje=mensajesError[tipoInput][error]
    }
});
    return mensaje;
}
function validarNacimiento(input) {
const fechaCliente= new Date(input.value);// recogemos la fecha con una nueva instancia 
let mensaje="";
if(!mayordeEdad(fechaCliente)){
    mensaje= "Debes tener mas de 18 años";
}

input.setCustomValidity(mensaje);
}
function mayordeEdad(fecha){

    const fechaActual=new Date();
    const diferenciaFechas= new Date(fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return (diferenciaFechas<= fechaActual);
}