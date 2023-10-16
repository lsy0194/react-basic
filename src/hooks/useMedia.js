import { useEffect, useRef } from 'react';
export const useMeida = () => {
	const device = useRef('');
	const getClientWid = () => {
		let wid = window.innerWidth;
		if (wid >= 1000 && wid < 1400) device.current = 'laptop';
		if (wid >= 640 && wid < 1000) device.current = 'tablet';
		if (wid >= 0 && wid < 639) device.current = 'mobile';

		//console.log(device.current);
	};

	useEffect(() => {
		window.addEventListener('resize', () => {
			getClientWid();
		});
	}, []);
	return device.current;
};
