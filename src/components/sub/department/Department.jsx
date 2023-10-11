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
