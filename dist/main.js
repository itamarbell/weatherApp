const render = new Renderer;
const tempManager = new TempManager 


let loadPage = async function () {
  await tempManager.getDataFromDB()
  if (tempManager.cityData.length){
render.renderCities(tempManager.cityData, tempManager.isLoadingData)
  }
}

let handleSearch = async function () {
    tempManager.isLoadingData = true;
    let cityInput = $("#city-input").val()
    await tempManager.getCityData(cityInput)
    tempManager.isLoadingData = false;
    render.renderCities(tempManager.cityData)
}

$("#cities").on("click","#btn-save", function () {
    let cityName = $(this).closest(".cityBox").find("#city").text()
    tempManager.saveCity(cityName).then( () =>{
        render.renderCities(tempManager.cityData)
        }
    )
})

$("#cities").on("click","#btn-delete", function () {
    let cityName = $(this).closest(".cityBox").find("#city").text()
    tempManager.removeCity(cityName).then( () =>{
        render.renderCities(tempManager.cityData)
        }
    )
})

loadPage()