import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const refFrame = useRef(null);
	const refInput = useRef(null);
	const [Pics, setPics] = useState([]);
	const my_id = '199274089@N03';
	const [Loader, setLoader] = useState(false);
	const fetchData = async (opt) => {
		let url = '';
		const api_key = 'f5f709637c0790e1103971c1302b229e';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 500;

		//fetching함수 호출시 타입값이 있는 객체를 인수로 전달하면 해당 타입에 따라 호출 URL이 변경되고
		//해당URL을 통해 받아지는 데이터로 달라짐
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}
		const data = await fetch(url);
		const json = await data.json();
		console.log(json.photos.photo);
		if (json.photos.photo.length === 0) {
			return alert('해당 검색어의 결과값이 없습니다.');
		}
		//실제 데이터가 state에 담긱는 순간 가상돔이 생성되는 순간
		setPics(json.photos.photo);

		let count = 0;
		const imgs = refFrame.current?.querySelectorAll('img');

		imgs.forEach((img, idx) => {
			img.onload = () => {
				++count;
				console.log('현재 로딩된 img갯수', count);
				if (count === imgs.length) {
					console.log('모든 이미지 소스 렌더링 완료!');
				}
			};
		});
	};

	useEffect(() => {
		//type: 'interest' 인터레스트 방식 갤러리 호출
		//type: 'user' 사용자 아이디 계정의 갤러리 호출
		//type: 'search' 검색키워드로 갤러리 호출
		//fetchData({ type: 'user', id: my_id });
		//fetchData({ type: 'interest' });
		fetchData({ type: 'user', id: my_id });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='searchBox'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (refInput.current.value.trim() === '') {
							return alert('검색어를 입력하세요.');
						}

						fetchData({ type: 'search', tags: refInput.current.value });
						refInput.current.value = '';
					}}
				>
					<input ref={refInput} type='text' placeholder='검색어를 입력하세요' />
					<button>검색</button>
				</form>
			</div>

			<div className='btnSet'>
				<button onClick={() => fetchData({ type: 'user', id: my_id })}>My Gallery</button>
				<button onClick={() => fetchData({ type: 'interest' })}>Interest Gallery</button>
			</div>
			{Loader && (
				<img className='loading' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loading' />
			)}
			<div className='picFrame' ref={refFrame}>
				<Masonry
					elementType={'div'}
					options={{ transitionDuration: '0.5s' }}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img
										className='pic'
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>
									<h2>{data.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
											alt={data.owner}
											onError={(e) => {
												//만약 사용자가 프로필 이미지를 올리지 않았을때 엑박이 뜨므로
												//onError이벤트를 연결해서 대체이미지 출력
												e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
											}}
										/>
										<span onClick={() => fetchData({ type: 'user', id: data.owner })}>
											{data.owner}
										</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
