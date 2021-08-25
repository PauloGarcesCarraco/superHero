$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault()
    let valueInput = $("#SuperHeroInput").val()

    $.ajax({
      type: 'GET',
      url: 'https://www.superheroapi.com/api.php/1099576103905102/' + valueInput,
      dataType: "json",
      success: function (data) {
        console.log(data)
        let nombre = data.name
        let conecciones = data.connections['group-affiliation']
        let publicado = data.biography.publisher
        let ocupacion = data.work.occupation
        let primeraAparicion = data.biography['first-appearance']
        let altura = data.appearance.height
        let peso = data.appearance.weight
        let alias = data.biography.aliases
        let imagen = data.image.url
        let inteligencia = data.powerstats.intelligence
        let fuerza = data.powerstats.strength
        let rapidez = data.powerstats.speed
        let durabilidad = data.powerstats.durability
        let poder = data.powerstats.power
        let combate = data.powerstats.combat


        $("#superInfo").html(`    
                <section class="tarjetas" id="tarjetas">
                <h4>SuperHero encontrado</h4>
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="${imagen}" class="card-img-top" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title"><small>Nombre: ${nombre}</small></h5> <br>

                      <p class="card-text-ocupacion"><small>Conexiones: ${conecciones}</small></p>
                      <p class="card-text"><small>Publicado por: ${publicado}</small></p>
                      <hr class="hr-style-left" />
                      <p class="card-text-ocupacion"><small>Ocupación: ${ocupacion}</small></p>
                      <hr class="hr-style-left" />
                      <p class="card-text-ocupacion"><small>Primera Aparición: ${primeraAparicion}</small></p>
                      <hr class="hr-style-left" />
                      <p class="card-text"><small>Altura: ${altura}</small></p>
                      <hr class="hr-style-left" />
                      <p class="card-text"><small>Peso: ${peso}</small></p>
                      <hr class="hr-style-left" />
                      <p class="card-text-ocupacion"><small>Alias: ${alias}</small></p>
                    </div>
                </div>
                </div>
                </div>
                </section>`
        );


        if(inteligencia=="null"||fuerza=="null"||rapidez=="null"||durabilidad=="null"
        ||poder=="null"||combate=="null"){
          $("#chartContainer").html(`
          <h5><b>Estadísticas desconocidas/nulas de ${nombre}</b></h5>`)
        }else{

        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          title: {
            text: "Estadísticas de Poder para " + nombre
          },

          data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0\"\"",
            indexLabel: "{label} {y}",
            dataPoints: [
              { y: parseInt(inteligencia), label: "Inteligencia" },
              { y: parseInt(fuerza), label: "Fuerza" },
              { y: parseInt(rapidez), label: "Rapidez" },
              { y: parseInt(durabilidad), label: "Durabilidad" },
              { y: parseInt(poder), label: "Poder" },
              { y: parseInt(combate), label: "Combate" },
            ]
          }]
        })
      };
        chart.render();

      }, 
      
      error: function (data) {
        alert("error, no hubo conexion")
      }
    })
  })
})

