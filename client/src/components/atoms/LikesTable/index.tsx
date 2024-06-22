import { Reaction } from '@/api/types';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

type Props = {
    likes: Reaction[]
}
const LikesTable = (props:Props) => {

	return (
		<TableContainer sx={{ maxWidth: 300 }} component={Paper}>
			<Table sx={{ maxWidth: 300 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow >
						<TableCell>Count</TableCell>
						<TableCell>Liked post id</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.likes.map((row, i) => (
						<TableRow
							key={i}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">{i+1}</TableCell>
							<TableCell component="th" scope="row">{row.postId}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default LikesTable;