import ReactDOM from 'react';
import '../../styles/personalDetailsCard.css';
import { useSelector } from 'react-redux';
import { loginSelectors } from '../../state/login';
import utils from '../../utils/utils';

const PersonalDetailsCard = () => {
	const details = useSelector(loginSelectors.personalDetails);
	return (
		<div className="cardWrapper">
			<div className="card">
				<img className="img" src={details.avatar} />{' '}
				<div>
					<h2>{details.name}</h2>
					<p>{details.team}</p>
					<p>Join at {utils.shortDate(details.joinedAt)}</p>
				</div>
			</div>
		</div>
	);
};
export default PersonalDetailsCard;
