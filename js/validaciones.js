export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  
  // si la clase es true va remover la clase y si es false la dejará y se debe rellenar el espacio de nombre...
  if (input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  }else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio"
  },
  email: {
    valueMissing: "El campo correo no puede estar vacio",
    typeMismatch: "El correo no es valido"
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacio",
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
  },
  nacimiento: {
    valueMissing: "El campo nacimiento no puede estar vacio",
    customError: "Debes tener al menos 18 años de edad"
  },
  numero: {
    valueMissing: "El campo número telefónico no puede estar vacio",
    patternMismatch: "El formato requerido es: XXX-XXXX-XXXX (11 números)"
  },
  direccion: {
    valueMissing: "El campo dirección no puede estar vacio",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres."
  },
  ciudad: {
      valueMissing: "El campo ciudad no puede estar vacio",
      patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres."
  },
  estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres."
  }
};

// con este codigo verificamos si la edad es mayor que 18 
const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje = "";
  tipoDeErrores.forEach( error => {
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  })

  return mensaje
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
