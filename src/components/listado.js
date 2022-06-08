import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, ModalBody, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket,faSearch } from "@fortawesome/free-solid-svg-icons";

function Listado() {
  //voy a usar mi propia API
  const url = "http://asistencia-socma.ddns.net/api/";

  //voy a sacar la data
  //hooks
  const [data, setData] = useState([]);
  const [tablaData, setTablaData] = useState([]);

  //busqueda
  const [busqueda, setBusqueda] = useState("");

  //hook de fila seleccionada, inicializas con valores vacíos
  const [fila, setFilaSeleccionada] = useState({
    id: "",
    fecha: "",
    ip: "",
    apaterno: "",
    nombres: "",
  });

  //hook del modal, inicializas en false
  const [abrirCerrarModal, setAbrirCerrarModal] = useState(false);

  const peticionGet = async () => {
    await axios
      .get(url)
      .then((response) => {
        //console.log(response.data);

        setData(response.data);
        setTablaData(response.data);
      })
      .catch((error) => console.log(error));
  };

  //al momento de hacer click en el boton, seleccionas la fila
  const seleccionarFila = (fila) => {
    console.log(fila);
    setFilaSeleccionada(fila);
    setAbrirCerrarModal(true);
  };

  //generar un handleChange
  const handleChange = (e) => {
    //console.log("Event:"+e.target.value);
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  //filtrar
  const filtrar = (entrada) => {
    //console.log(entrada.toLowerCase());

    var resultado = tablaData.filter((elemento) => {
      if (
        elemento.apaterno
          .toString()
          .toLowerCase()
          .includes(entrada.toLowerCase()) ||
        elemento.fecha.toString().toLowerCase().includes(entrada.toLowerCase())
      ) {
        console.log(elemento);
        return elemento;
      }
    });
    setData(resultado);
  };
  //materializas lo capturado
  useEffect(() => {
    peticionGet();
  }, []);

  let i = 0;

  return (
    <div className="container">
      <div className="row">  
        <div className="col-sm-6 offset-6 mt-5">            
            <div className="containerInput">            
                <input
                className="form-control inputBuscar"
                type="text"
                value={busqueda}
                placeholder="Busqueda: Escribe por apellido o fecha"
                onChange={handleChange}
                />
                <button className="btn btn-success" disabled="disabled">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
            </div>
        </div>   
      </div>  
      <div className="table-responsive">
        <table className="table table-sm table-splited table-dark table-bordered table-hover">
          <thead>
            <tr>
              <th>Orden/Id</th>
              <th>Fecha</th>
              <th>IP</th>
              <th>User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((fila) => {
                i = i + 1;
                return (
                  <tr key={fila.id}>
                    <td>{i}</td>
                    <td>{fila.fecha}</td>
                    <td>{fila.ip}</td>
                    <td>
                      {fila.apaterno} {fila.nombres}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                          seleccionarFila(fila);
                        }}
                      >
                        Detalle
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Modal isOpen={abrirCerrarModal}>
          <ModalHeader>Detalle</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-sm-2">
                <label>
                  <strong>Fecha</strong>
                </label>
              </div>
              <div className="col-sm-4">{fila.fecha}</div>

              <div className="col-sm-2">
                <label>
                  <strong>ip</strong>
                </label>
              </div>
              <div className="col-sm-4">{fila.ip}</div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <label>
                  <strong>User</strong>
                </label>
              </div>
              <div className="col-sm-8">
                {fila.nombres} {fila.apaterno}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary"
              onClick={() => setAbrirCerrarModal(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
      Powered by  <FontAwesomeIcon icon={faRocket}></FontAwesomeIcon> <strong> ReactJs </strong>
    </div>
  );
}

export default Listado;
