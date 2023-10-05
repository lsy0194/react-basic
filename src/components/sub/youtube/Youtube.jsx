import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useEffect, useState } from 'react';

export default function Youtube() {
	const [Youtube, setYoutube] = useState([]);

	const fetchYoutube = () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseurl = 'https://www.googleapis.com/youtube/v3/playlistItems';
		const pid = 'PLNiucQiR7LtQSLOd5hZS7199O5xS7PWPO';
		const num = 5;
		const resultURL = `${baseurl}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		fetch(resultURL)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items);
				setYoutube(json.items);
			});
	};
	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<Layout title={'Youtube'}>
			{Youtube.map((data, idx) => {
				return (
					<article key={idx}>
						<h2>{data.snippet.title}</h2>
						<p>{data.snippet.description}</p>
						<div className='pic'>
							<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
