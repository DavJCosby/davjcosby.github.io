var entries = []

var current_longitude = null
var current_latitude = null

navigator.geolocation.getCurrentPosition(updatePos, handleCringe)
navigator.geolocation.watchPosition(updatePos, handleCringe)

function update_counter() {
    var counter = document.getElementById("counter")
    counter.textContent = entries.length
}

function plus_clicked() {
    entries.push([new Date().toLocaleString("en-US"), current_latitude, current_longitude])
    update_counter();
}

function updatePos(position) {
    console.log(position.coords.latitude)
    current_longitude = position.coords.longitude;
    current_latitude = position.coords.latitude;
}

function handleCringe(error) {
    console.log(error.code) // i just work here bro who cares
}

function minus_clicked() {
    if (entries.length > 0) {
        entries.pop()
        update_counter();
    }
}


function exportCSV() {
    var csv_text = entries.map(function (d) {
        return d.join();
    }).join('\n');

    var file = new File([csv_text], "geeky_ahh_data.csv", {
        type: 'text/csv'
    })

    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}