import './App.css'
import routes from './routes'

function App() {

	return (
		<div className="App">
			<h1>music to compose music to</h1>
			<div>listen to the music as you compose music.</div>
			<nav>
				<ul>
					{
						routes.map((route, index) => {
							return (
								<li key={index}>{route.name}</li>
							)
						})
					}
				</ul>
			</nav>
		</div>
	)
}

export default App
