import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const refFrame = useRef(null);
	const refInput = useRef(null);
	const refBtnSet = useRef(null);
	const [Pics, setPics] = useState([]);
	const my_id = '199274089@N03';
	const [Loader, setLoader] = useState(true);
	const [Fix, setFix] = useState(false);
	const [IsUser, setIsUser] = useState(true);
	const [ActiveURL, setActiveURL] = useState('');
	const [Open, setOpen] = useState(false);

	const fetchData = async (opt) => {
		let count = 0;
		setLoader(true);
		refFrame.current.classList.remove('on');
		let url = '';
		const api_key = 'f5f709637c0790e1103971c1302b229e';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 10;

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

		setPics(json.photos.photo);
		const imgs = refFrame.current?.querySelectorAll('img');
		console.log(imgs);

		imgs.forEach((img) => {
			img.onload = () => {
				++count;
				console.log('현재 로딩된 img갯수', count);
				if (count === (Fix ? imgs.length / 2 - 1 : imgs.length - 2)) {
					console.log('모든 이미지 소스 렌더링 완료!');
					setLoader(false);
					refFrame.current.classList.add('on');
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
		<>
			<Layout title={'Gallery'}>
				<div className='searchBox'>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setIsUser(false);
							const btns = refBtnSet.current.querySelectorAll('button');
							btns.forEach((btn) => btn.classList.remove('on'));
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

				<div className='btnSet' ref={refBtnSet}>
					<button
						className='on'
						onClick={(e) => {
							setIsUser(true);
							if (e.target.classList.contains('on')) return;

							const btns = refBtnSet.current.querySelectorAll('button');
							btns.forEach((btn) => btn.classList.remove('on'));
							e.target.classList.add('on');

							fetchData({ type: 'user', id: my_id });
						}}
					>
						My Gallery
					</button>
					<button
						onClick={(e) => {
							setIsUser(false);
							if (e.target.classList.contains('on')) return;

							const btns = refBtnSet.current.querySelectorAll('button');
							btns.forEach((btn) => btn.classList.remove('on'));
							e.target.classList.add('on');

							fetchData({ type: 'interest' });
						}}
					>
						Interest Gallery
					</button>
				</div>

				{Loader && (
					<img
						className='loading'
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
						alt='loading'
					/>
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
											onClick={(e) => {
												setActiveURL(e.target.getAttribute('alt'));
												setOpen(true);
											}}
										/>
										<h2>{data.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
												alt={data.owner}
												onError={(e) => {
													setFix(true);
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span
												onClick={() => {
													if (IsUser) return;
													fetchData({ type: 'user', id: data.owner });
													setIsUser(true);
												}}
											>
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

			{Open && (
				<Modal>
					<img src={ActiveURL} alt='img' />
				</Modal>
			)}
		</>
	);
}
