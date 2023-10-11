import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
//scss로 연결
import './Department.scss';
//public폴더의 경로
const path = process.env.PUBLIC_URL;

export default function Department() {
	//useState에 빈값으로둠
	const [Department, setDepartment] = useState([]);
	//useEffect에 fetch로 DB/department.json을불러와서
	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			//data를 읽어들여서 json으로 해석
			.then((data) => data.json())
			.then((json) => {
				//setDepartment에 department.json에 있는member배열을 가지고 저장
				setDepartment(json.members);
			});
	}, []);

	return (
		//레이아웃에 타이틀을 Department로 넘김
		<Layout title={'Department'}>
			<div className='memberBox'>
				{
					//setDepartment에 저장된 값을 Department로 불러와서 .map을 통해서 차례대로 보냄
					//idx는 순서,member는 members 배열
					Department.map((member, idx) => {
						return (
							<article key={idx}>
								<div className='pic'>
									{/*
										``으로 열어서 ${}으로 path에 저장된 public폴더의 위치를 불러오고
										img폴더안에 있는 이미지중 member.pic에 저장되어있던 이미지를 불러옴
									 */}
									<img src={`${path}/img/${member.pic}`} alt={member.name} />
								</div>
								<h2>{member.name}</h2>
								<p>{member.position}</p>
							</article>
						);
					})
				}
			</div>
		</Layout>
	);
}

/*
	1. hook의 개념
		- 리엑트에서는 크게 2가지 종류의 파일이 존재 
		-- 컴포넌트 (화면에 가상돔을 렌더링하는 JSX를 무조건 리턴)
		-- hook (JSX를 리턴하는것이 아닌 각 컴포넌트마다 자주쓰는 기능의 함수나 특정 값을 리턴하는 기능파일 )

	2. useState, useEffect, useRef (리엑트에서 제일 많이 쓰는 기본 hook)
		- useState : 화면에 렌더링을 담당하는중효한 정보를 담아주고 변경해주는 기능의 훅(state가 변경되면 컴포넌트는 재호출되면서 화면 재랜더링)
		- useEffect : 컴포넌트의 생성,변경,소멸시 마다(컴포넌트의 생명주기마다) 특정 구문을 호출할 수 있는 hook
		- useRef : 참조객체에 실시간으로 특정 정보값을 담기 위한 hook(해당 렌더링 사이클에서 최신 가상돔을 담을때, 특정값을 담아두고 변경을 할때 컴포넌트를 재랜더링 시키고 싶지 않을때)
	3. 컴포넌트가 하는 역할(JSX)
		- 자바스크립트 동적 DOM을 만들때 편의성을 위해 HTML 형식을 따와서 편하게 동적 DOM생성을 위한 리엑트만의 표현식 
	4. fetch문을 useEffect안쪽에서 호출하는 이유
		- 가상돔 생성은 리엑트 기반의 스크립트가 처리해주시면 외부데이터를 가져오는 것은 Web API(브라우저)가 처리하기 때문에
		- 컴포넌트가 실제 브라우저상에 마운트가되고 브라우저가 작업 준비가 되야지만 fetch를 실행할 수 있기 때문에
		- useEffect컴포넌트가 마운트 되야지만 CSR방식으로 외부 데이터를 가져올 수 있음.

*/
