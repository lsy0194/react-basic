import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect } from 'react';

export default function Contact() {
	const map = useRef(null);
	//현재 카카오 객체를 cdn으로 가져오고 있 기떄문에
	//리액트 컴포넌트안쪽에서 window객체로부터 kakao객체를 비구조할당을 이용해서 수동으로 꺼내옴
	const { kakao } = window;
	const mapOption = {
		center: new kakao.maps.LatLng(37.58505853823841, 126.88550248166754), //지도의 중심좌표.
		level: 1, //지도의 레벨(확대, 축소 정도)
	};
	const markerPosition = mapOption.center;
	//마커 위치 인스턴스를 인수로 전달해서 마커 출력 인스턴스 객체를 생성
	const marker = new kakao.maps.Marker({ position: markerPosition });

	useEffect(() => {
		//컴포넌트 마운트 되자마자 지도인스턴스 생성
		const instance = new kakao.maps.Map(map.current, mapOption);
		//마커출력 인스턴스에 지도 인스턴스결합
		marker.setMap(instance);
	}, []);
	return (
		<Layout title={'Contact'}>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
//
