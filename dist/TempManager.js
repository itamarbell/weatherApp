
class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let cities = await $.get(`/cities`)
        this.cityData = cities
    }

    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
        data.isLoading = false;
        this.cityData.push(data)
    }

    async saveCity(cityName) {
        const cityInfo = this.cityData.find(c => c.name == cityName)
        await $.post(`/city`, cityInfo)
        await this.getDataFromDB()
    }

    async removeCity(cityName) {
        await $.ajax({
            type: "DELETE",
            url: `/city/${cityName}`,
        })
        await this.getDataFromDB()
    }
}
