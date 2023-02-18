import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ count, label, colorChart }) {
	const [data, setData] = useState(
		{
			labels: ['Red', 'Blue'],
			datasets: [
				{
					label: '# of Votes',
					data: [5, 5],
					backgroundColor: [
						'blue',
						'red',
					]
				},
			]
		}
	)

	useEffect(() => {
		const dataChart = {
			labels: label.split(','),
			datasets: [
				{
					label: '# of Votes',
					data: count.split(','),
					backgroundColor: colorChart?.split(',')
				},
			]
		};

		setData(dataChart)
	}, [count, label, colorChart])

	return (
		<>
			<div style={{ 'width': "100%", "maxWidth": "400px" }}>
				{
					count.split(',').length > 0 && label.split(',').length > 0 ? (
						<Pie data={data} />
					) : ""
				}
			</div>
		</>
	)
}

export default PieChart