import './styles/Global.scss';
import { Route, Switch } from 'react-router-dom';
import Header from './components/common/header/Header';
import Department from './components/sub/department/Department';
import Youtube from './components/sub/youtube/Youtube';
import Members from './components/sub/members/Members';
import Gallery from './components/sub/gallery/Gallery';
import Detail from './components/sub/youtube/Detail';
import Contact from './components/sub/contact/Contact';
import Community from './components/sub/community/Community';
import Main from './components/main/mainwarp/Main';
import { useRef } from 'react';
import { useMeida } from './hooks/useMedia';

function App() {
	console.log(useMeida());
	const refMain = useRef(null);

	return (
		<main useRef={refMain}>
			{/* Switch안쪽에서 중첩되는 조건 라우트의 컴포넌트가 있을때 위쪽의 조건의 컴포넌트만 호출하고 나머지 무시 */}
			<Switch>
				<Route exact path='/'>
					{/* 메인페이지 전용 헤더 */}
					<Header isMain={true} />
					<Main />
				</Route>
				<Route path='/'>
					{/* 서브페이지 전용 헤더 */}
					<Header isMain={false} />
				</Route>
			</Switch>
			<Route path='/Community' component={Community} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
		</main>
	);
}

export default App;
