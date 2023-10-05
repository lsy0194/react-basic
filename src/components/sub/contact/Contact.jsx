import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect, useState } from 'react';

export default function Contact() {
	const map = useRef(null);
	const instance = useRef(null);
	const [Traffic, setTraffic] = useState(false);

	const { kakao } = window;

	const info = {
		latlng: new kakao.maps.LatLng(37.58505853823841, 126.88550248166754),
		imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 90) },
	};

	const marker = new kakao.maps.Marker({
		position: info.latlng,
		image: new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgPos),
	});

	useEffect(() => {
		//컴포넌트 마운트 되자마자 지도인스턴스 생성
		instance.current = new kakao.maps.Map(map.current, {
			center: info.latlng,
			level: 1,
		});
		marker.setMap(instance.current);
		const mapTypeControl = new kakao.maps.MapTypeControl();
		instance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMLEFT);
	}, []);

	useEffect(() => {
		Traffic
			? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout title={'Contact'}>
			{/* <button onClick={() => setTraffic(true)}>주변 교통정보 보기</button>
			<button onClick={() => setTraffic(false)}>주변 교통정보 끄기</button> */}
			<button onClick={() => setTraffic(!Traffic)}>
				{Traffic ? '교통정보 끄기' : '교통정보 켜기'}
			</button>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
