class Renderer {
    renderCities(allCityData){
        console.log(allCityData)
        $('#cities').html("")
        const source = $("#cities-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template({allCityData});
        $('#cities').append(newHTML);
    }
}