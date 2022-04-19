import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [beers, setBeers] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBeers = async () => {
			try {
				const response = await fetch(
					'https://api.punkapi.com/v2/beers?beer_name=lager&per_page=20',
				);
				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const data = await response.json();
				setBeers(data);
			} catch (err) {
				setError('Could not fetch data');
				console.log(err.message);
			}
		};
		fetchBeers();
	}, []);

	return (
		<div className="App">
			{beers.map((beer, index) => (
				<div key={index}>
					{error && <p>{error}</p>}
					<h1>{beer.name}</h1>
          <p>{beer.tagline}</p>
          <p>{beer.first_brewed}</p>
					<img src={beer.image_url} alt="breaking bad" />
				</div>
			))}
		</div>
	);
}

export default App;