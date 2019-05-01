<template>
    <div>   
        <h1>Mis Solicitudes</h1>
    <v-div class="draggable centerh_mov" style="top: 130px; width: 982px; height: 327px; left: 3px;">
        <table class="ui celled table draggable" style="top: 1px; left: 1px;">
        <thead>
          <tr class="mg">      
            <th>Tarea       
            </th>
            <th>Status
            </th>
            <th>Quien Atiende
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="mg">
          </tr>
          <tr class="positive mg">
            <td>Jimmy
            </td>
            <td>
              <i class="icon checkmark">
              </i> Approved
            </td>
            <td>None
            </td>
          </tr>
          <tr class="mg">      
            <td>Jamie
            </td>
            <td>Unknown
            </td>
            <td class="positive">
              <i class="icon close">
              </i>None
            </td>
          </tr>
          <tr class="negative mg">
            <td>Jill
            </td>
            <td>Unknown
            </td>
            <td>None
            </td>
          </tr>
        </tbody>
      </table>
    </v-div> 
     
    <v-div class="draggable centerh_mov" style="top: 496px; width: 460px; height: 51px; left: 2px;">
      <span class="label label-success draggable centerh_mov" style="top: 0px; font-size: 30px;">Nueva Solicitud
      </span>
    </v-div> 
    <v-div class="draggable centerh_mov" style="top: 583.19px; width: 1026px; height: 108px; left: 62.0788px;">
      <v-div class="form-group draggable input left_mov" style="top: 18px;">  
        <label for="comment">Comentario:
        </label>
        <textarea data-validate="NNNN[]N[]NNN" style="width:100%;height:100%;" class="form-control" id="comment">        
        </textarea>
      </v-div>
      <button type="button" class="btn btn-default draggable center_mov" style="top: 114.514px; left: -19.7713px;">      
        <span class="glyphicon glyphicon-search">
        </span> Subir archivo JPG o PDF
      </button>
      <v-div class="dropdown draggable" style="width: 173px; top: 48.6281px; left: 809.296px; height: 40px;">
        <button class="btn btn-primary dropdown-toggle mg right_mov" type="button" data-toggle="dropdown">Prioridad
          <span class="caret">
          </span>
        </button>
        <ul class="dropdown-menu">
          <li class="dg_menu">
            <a href="#">Baja
            </a>
            <a href="#">Media
            </a>
            <a href="#">Alta
            </a>
          </li>
        </ul>
      </v-div>
    </v-div> 
        <v-div class="draggable centerh_mov" style="top: 732px; width: 232px; height: 86px; left: 12px;">
            <button type="button" class="btn btn-info draggable centerh_mov" style="top: 0px;">Guardar y enviar solicitud
            </button>
        </v-div>
    </div>
</template>

<script>


export default {
    
}
</script>

<style>

</style>
