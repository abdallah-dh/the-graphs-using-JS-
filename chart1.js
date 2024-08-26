let city = document.querySelector("input");
let button = document.querySelector("button");
const apiKey = "4dfb6ea015c44de4145e23cac3f20a36";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let span = document.querySelector("span");



let barchart; // Déclarer à l'extérieur de la fonction pour accéder globalement
let rayonnement; // Déclarer à l'extérieur de la fonction pour accéder globalement

button.addEventListener('click', function () {
    if (city.value === ""){
        city.value ="saisair la city"
        city.style.color ='red';

    }else{ 
        let cityvalue = city.value;

        async function fetchData(cityvalue) {
            const api = await fetch(apiurl + cityvalue + `&appid=${apiKey}`);
            if (api.status === 404){ 
                
                city.value = "Cité pas existe";
                city.style.color ='red'; 
                
             }else{
                city.style.color = 'white';
            return await api.json();
             }
             
        }
    
        async function updateCharts() {
            const twoapi = await fetchData(cityvalue);
                if (barchart) {
                barchart.destroy();
            }
    
            if (rayonnement) {
                rayonnement.destroy();
            }
    
            // Création du nouveau graphique à barres
            const ctx = document.getElementById('barchart').getContext('2d');
            barchart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['temp', 'humidité', 'pressure', 'Wind'],
                    datasets: [{
                        label: twoapi.name,
                        data: [twoapi.main.temp, twoapi.main.humidity, twoapi.main.pressure, twoapi.wind.speed],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.35)',
                            'rgba(54, 162, 235, 0.28)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 2)',
                            'rgba(54, 162, 235, 2)',
                            'rgba(255, 206, 86, 2)',
                            'rgba(75, 192, 192, 2)',
                        ],
                        borderWidth: 3,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
    
            // Création du nouveau graphique à anneaux
            const ctx2 = document.getElementById('rayonnement').getContext('2d');
            rayonnement = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: ['temp', 'humidité', 'pressure', 'Wind'],
                    datasets: [{
                        data: [twoapi.main.temp, twoapi.main.humidity, twoapi.main.pressure, twoapi.wind.speed],
                        label: twoapi.name,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 2
                    }]
                },
            });
            // Destruction des instances existantes
            
        }
    
        updateCharts();
        city.value = '';}
   
});
