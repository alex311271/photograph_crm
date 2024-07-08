import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams, useMatch } from 'react-router-dom';
import { loadFinanceAsync } from '../../actions/index.js';
import { DataLine } from '../components/data-line.js';
import { Button, ContentCard } from '../../components';
import { selectFinance } from '../../selectors/index.js';
import { FinanceForm } from '../finances/finances/components/finance-form.js';

const FinanceContainer = ({ className }) => {
	const finance = useSelector(selectFinance);
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = useMatch('finance/:id/edit');

	useEffect(() => {
		dispatch(loadFinanceAsync(params.id));
	}, [dispatch, params.id, isEditing]);

	return (
		<div className={className}>
			{isEditing ? (
				<FinanceForm finance={finance} />
			) : (
				<>
					<ContentCard width="500px" padding="20px">
						<DataLine nameData='Дата' data={finance.date} />
						<DataLine nameData='Статья расхода' data={finance.expenseItem} />
						<DataLine nameData='Сумма' data={finance.sum} />
						<div className="buttons">
							<Link to={`/finance/${params.id}/edit`}>
								<Button width={'150px'}>Редактировать</Button>
							</Link>
							<Link to={`/finances`}>
								<Button width={'150px'}>Финансы</Button>
							</Link>
					</div>
					</ContentCard>
				</>
			)}
		</div>
	);
};

export const Finance = styled(FinanceContainer)`
	& .buttons{
	margin-top: 40px;
	display: flex;
	width: 310px;
	justify-content: space-between;
	}
`;
