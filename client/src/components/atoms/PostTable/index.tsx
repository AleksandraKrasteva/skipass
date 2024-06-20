import { Post } from '@/api/types';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

type Props = {
    posts:Post[];
}
const PostTable = (props: Props) => {
	
	return (
		<TableContainer sx={{ maxWidth: 750 }} component={Paper}>
			<Table sx={{ maxWidth: 750 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell >Count</TableCell>
						<TableCell >Post</TableCell>
						<TableCell>Journey</TableCell>
						<TableCell>Likes</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.posts.map((row, i) => (
						<TableRow
							key={i}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">{i+1}</TableCell>
							<TableCell component="th" scope="row">{row.text}</TableCell>
							<TableCell component="th" scope="row">{row.journeyId}</TableCell>
							<TableCell component="th" scope="row">{row.reactions?.length}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PostTable;