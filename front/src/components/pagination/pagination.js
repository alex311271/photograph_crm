import styled from 'styled-components';
import { Icon } from '../icon/icon';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			{page !== 1 ? (
					<>
						<Icon id="fa-angle-double-left" size="24px" onClick={()=>setPage(1)} />
						<Icon id="fa-angle-left" size="24px" onClick={()=>setPage(page - 1)} />
					</>
			):(
				<>
					<Icon id="fa-angle-double-left" size="24px" disabled={page===1} inactive={true} />
					<Icon id="fa-angle-left" size="24px" disabled={page===1} inactive={true} />
				</>
			)}

			<div className='current-page'>Страница: {page}</div>
			{page !== lastPage ? (
				<>
					<Icon id="fa-angle-right" size="24px" onClick={()=>setPage(page + 1)} />
					<Icon id="fa-angle-double-right" size="24px" onClick={()=>setPage(lastPage)} />
				</>
			):(
			<>
				<Icon id="fa-angle-right" size="24px" disabled={page===1} inactive={true} />
				<Icon id="fa-angle-double-right" size="24px" disabled={page===lastPage} inactive={true} />
			</>
			)}

		</div>
	)
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 0 0 20px;
	padding: 0 35px;

	& .current-page {
		width: 100%;
		height: 32px;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
	}
`;