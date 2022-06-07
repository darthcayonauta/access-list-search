import React from "react";
import { Button, ModalBody, Modal, ModalHeader, ModalFooter } from "reactstrap";
import {useState} from 'react';


function ModalExt(  {is_open, fila}){

    const openApp = is_open ? true : false; 

    const [abrirCerrarModalFromModal, setAbrirCerrarModal] = useState(openApp);
    console.log(abrirCerrarModalFromModal);

    return(
        <Modal isOpen={openApp}>
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
            onClick={() => { openApp=false; }}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    )


}

export default ModalExt