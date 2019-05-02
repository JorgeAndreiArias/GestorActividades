<template>
    <div>
        <div class="draggable centerh_mov" style="top: 24px; width: 380px; height: 241px;">
      <span class="label label-primary draggable centerh_mov" style="top: 6px; width: 167px; height: 43px; font-size: 25px; left: 1px; text-shadow: rgba(0, 0, 0, 0.4) 2px 2px 2px;">Solicitudes
      </span>

      <div class="form-group draggable select centerh_mov" style="top: 65px; width: 100px; height: 52px; left: 4px;">        <label for="sel1">Revisar reportes por:
        </label>
        <select data-validate="false" class="form-control" id="sel1">
        <option value="0">Usuario
        </option>
        <option value="1">Personal TI
        </option>
        <option value="2">Periodo
        </option>
        <option value="2">Ticket
        </option>
        </select>
</div>
    <div class="form-group draggable input centerh_mov" style="top: 167.5px; width: 162px; height: 64px; left: 2px;">  <label for="usr">Ingrese el dato:</label>
  <input type="text" data-validate="NNNN[]N[]NNN" class="form-control" id="usr">
</div></div> 
    <div class="draggable centerh_mov" style="top: 296.632px; width: 1006px; height: 398px; left: 7px;">
      <table class="ui celled table draggable" style="top: 55px; left: 5px; width: 989px; height: 118px;">
        <thead>
          <tr class="mg">            
            <th>ID
            </th>
            <th>Creada por
            </th>
            <th>Atiende/Atendió
            </th>
            <th>Prioridad
            </th>
            <th>Creado
            </th>
            <th>En proceso
            </th>
            <th>Terminado
            </th>
            <th>Doc
            </th>
            <th>Comentarios
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="mg">
            <td>1
            </td>
            <td>El George
            </td>
            <td>Luis De Anda
            </td>
            <td class="negative">Alta
            </td>
            <td>23/04/19
            </td>
            <td>23/04/19
            </td>
            <td>
              23/04/19
            </td>
            <td>
              <a href="#">Descargar Doc
              </a>
            </td>
            <td>
              <a href="#" onclick="OcultarMostrarComentarios();">Ver comentarios
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div> 
    <div id="Comentarios" class="draggable centerh_mov" style="width: 482px; height: 242px; bottom: 0px; top: 736.675px; left: 11.9609px;">
      <span class="label label-info draggable centerh_mov" style="top: 0px; width: 282px; height: 46px; font-size: 25px; text-shadow: rgba(0, 0, 0, 0.4) 2px 2px 2px; left: -10px;">Comentarios Actuales
      </span>
      <div class="form-group draggable input centerh_mov" style="top: 66.5px; left: 0px;">  
        <label for="comment">Comentarios:
        </label>
        <textarea data-validate="NNNN[]N[]NNN" style="width:100%;height:100%;" class="form-control" id="comment">        
        </textarea>
      </div>
      <button type="button" class="btn btn-danger draggable centerh_mov" style="top: 162.5px; width: 70px; height: 30px; left: 4px;" onclick="OcultarMostrarComentarios();">Cerrar
      </button>
    </div> 
    </div>
</template>


<script>
export default {
    
}
</script>


<style>

</style>
