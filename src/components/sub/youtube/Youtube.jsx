import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Youtube.scss';
import { useEffect, useState, useRef } from 'react';
/*
	리액트는 단방향 데이터 바인딩
	- 부모에서 자식으로 데이터를 전달가능하지만 자식에서 부모로는 데이터를 전달불가
	- props전달, children전달

	리액트에서 자식 컴포넌트에선느 직접적으로 부모 컴포넌트의 state값이 변경이 불가
	- 해결방법 부모의 state변경함수를 자식컴포넌트로 전달
	- 자식 컴포넌트에서는 전달받은 state변경함수로 간접적으로 부모 state값 변경가능

	useRef로 jsx는 참조 객체에 담을 수 있음
	컴포넌트를 useRef를 통한 참조객체 
*/
export default function Youtube() {
	const refEl = useRef(null);
	const [Youtube, setYoutube] = useState([]);
	const [IsModal, setIsModal] = useState(false);

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
		<>
			<Layout title={'Youtube'}>
				{Youtube.map((data, idx) => {
					return (
						<article key={idx}>
							<h2
								onClick={() => {
									console.log(refEl.current);
								}}
							>
								{data.snippet.title}
							</h2>
							<p ref={refEl}>{data.snippet.description}</p>
							<div className='pic' onClick={() => refEl.current.open()}>
								<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			<Modal setIsModal={setIsModal} ref={refEl}></Modal>
		</>
	);
}
