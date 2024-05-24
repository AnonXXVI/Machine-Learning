document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Withholding tax', 
                'Total tax revenue',
                'Personal income tax',
                'Total tax and non-tax revenue',
                '1120 On capital gains of individuals',
                '1110 On income and profits of individuals',
                '1000 Taxes on income, profits and capital gains',
                '1100 Taxes on income, profits and capital gains of individuals'
            ],
            datasets: [{
                data: [2, 2, 2, 2, 2, 2, 2, 2],
                backgroundColor: ['#111d13', '#403429', '#bb3e03', '#13100c', '#a3a380', '#ab907a', '#212529', '#77604b'],
                hoverBackgroundColor: ['#111d13', '#403429', '#bb3e03', '#13100c', '#a3a380', '#ab907a', '#212529', '#77604b'],
                borderWidth: 0.2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
});
