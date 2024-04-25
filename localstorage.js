//declaracion variables
let productoPro = document.querySelector(".producto");
let presentacionPro = document.querySelector(".presentacion");
let precioPro = document.querySelector(".precio");
let imagenPro = document.querySelector(".imagen");
let botonGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table > tbody");

//agregar  evento al boton del formulario
botonGuardar.addEventListener("click", () => {
    // alert(nombrePro.value); 
    let datos = obtenerDatos();
    if (datos != null){
        guardarDatos( datos);       
    }
    borrarTabla();
    mostrarDatos();
});

//funcion para recoger los datos del formulario
function obtenerDatos(){
    let datosForm;
    //validar campos del formulari
    if (productoPro.value == "" || presentacionPro.value == "" || precioPro.value == "" || imagenPro.value ==""){
        alert("Todos los campos son obligatorios")
    }else{
        datosForm = {
            producto : productoPro.value,
            presentacion : presentacionPro.value,
            precio : precioPro.value,
            imagen : imagenPro.value
 
        }
    }

    console.log(datosForm);
    productoPro.value="";
    presentacionPro.value="";
    precioPro.value="";
    imagenPro.value="";
    
    return datosForm;
}



// // //guardar informacion en localStorage
 const listadoPedidos ="Pedidos";
 function guardarDatos(datos){
    let pedidos =[];
     //extraer datos previamente en lS
    let pedidosPrevios = JSON.parse( localStorage.getItem(listadoPedidos));
     //validar los datos guardados previamente en el lS
     if( pedidosPrevios != null){
         pedidos = pedidosPrevios;

     }
     //agregar el pedido nuevo al array
     pedidos.push(datos);

     //guardar en localStorage
     localStorage.setItem(listadoPedidos, JSON.stringify (pedidos) );
     //validar que los datos fueron guardados
    alert("Datos guardados con exitos");
 }
// funcion para extraer los datos guardados en el lS

function mostrarDatos(){
    let pedidos = [];
    //extraer datos guardados previamente en el lS
    let pedidosPrevios = JSON.parse( localStorage.getItem(listadoPedidos));
    //validar los datos guardados previamente en el lS
    if( pedidosPrevios != null){
        pedidos = pedidosPrevios;
    }
    
    //console.log(pedidos);
    //mostrar datos en la tabla
    pedidos.forEach((p,i) => {
        let fila = document.createElement("tr");
        fila.innerHTML =  `
            <td> ${i+1} </td>
            <td> ${p.producto} </td>
            <td> ${p.presentacion} </td>
            <td> ${p.precio} </td>
            <td> <img src="${p.imagen}" width = "35% "></td>
            <td> 
                <span class="btn-editar btn btn-warning" > 🪡  </span>
                <span onClick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger" > ✖️  </span> 
            </td>
            
        `;
        tabla.appendChild(fila);
    });
}

//quitar los datos de la tabla 
function borrarTabla(){
    let filas = document.querySelectorAll(".table tbody tr");
    //console.log(filas)
    filas.forEach((f)=>{
        f.remove();
    });
}

//funcion eliminar un pedido de la tabla 
function eliminarPedido(pos){
    let pedidos = [];
    //extraer datos guardados previamente en el lS
    let pedidosPrevios = JSON.parse( localStorage.getItem(listadoPedidos));
    //validar los datos guardados previamente en el lS
    if( pedidosPrevios != null){
        pedidos = pedidosPrevios;
    }
    //confirmar pedido a eliminar
    let confirmar = confirm("¿Deseas elimniar el pedido "+ pedidos [pos].producto +" ?");
    if (confirmar){
        //alert("lo eliminaste");
        pedidos.splice(pos,1);
        alert("Eliminado con exito")
        // guardar los datos que quedaron en el lS 
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
    }
}



/* //mostrar los datos de lS al recargar la pagina 
document.addEventListener("DOMContentLoaded",function(){
    borrarTabla();
    mostrarDatos(); 
}) */

//actualizar pedido de localStorage
  function actualizarPedido(pos){
    let pedidos = []
    //extraer datos guardados previamente en el local storage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos)) 
      //validar datos guardados previamente en el localStorage
   if (pedidosPrevios != null){
       pedidos =pedidosPrevios;

   }

   //pasar los datos al formulario para editarlos
   productoPro.value = pedidos[pos].producto
   presentacionPro.value=pedidos[pos].presentacion
   precioPro.value=pedidos[pos].precio

   //seleccionar boton de actualizar 
   let btnActualizar = document.querySelector(".btn-actualizar");
   btnActualizar.classList.toggle("d-none");
   botonGuardar.classList.toggle("d-none");

   //agregar evento al boton de actualizar

   btnActualizar.addEventListener("click", function () {
    pedidos[pos].producto=productoPro.value;
    pedidos[pos].presentacion=presentacionPro.value
    pedidos[pos].precio=precioPro.value


    //guardar los datos editados en localStorage

    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    alert("El dato fue actualizado con exito")

    
    
    productoPro.value = "";
    presentacionPro.value= ""
    precioPro.value = "";

    btnActualizar.classList.toggle("d-none");
    botonGuardar.classList.toggle("d-none")
    
    borrarTabla();
    mostrarDatos();
    
});


  }

//motrar los datos de local Storage al recargar la pagina
document.addEventListener("DOMContentLoaded",function(){
    borrarTabla();
    mostrarDatos();
})

const inputBuscar = document.querySelector(".buscar");
inputBuscar.addEventListener("input", buscarPedidos);

function buscarPedidos() {
    const textoBusqueda = inputBuscar.value.trim().toLowerCase();
    const filas = document.querySelectorAll(".table tbody tr");

    filas.forEach((fila) => {
        const producto = fila.querySelector("td:nth-child(2)").textContent.toLowerCase();
        const presentacion = fila.querySelector("td:nth-child(3)").textContent.toLowerCase();
        const precio = fila.querySelector("td:nth-child(4)").textContent.toLowerCase();
        
        
        if (producto.includes(textoBusqueda) || presentacion.includes(textoBusqueda) || precio.includes(textoBusqueda)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}