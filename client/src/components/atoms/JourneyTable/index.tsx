import { Journey } from '@/api/types';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

type Props={
    journeys:Journey[]; 
}
const JourneyTable = (props:Props) => {
	return (
		<TableContainer sx={{ maxWidth: 750 }} component={Paper}>
			<Table sx={{ maxWidth: 750 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Count</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Total km</TableCell>
						<TableCell>Total passes</TableCell>
						<TableCell>Fastest</TableCell>
						<TableCell>Slowest</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.journeys.map((row, i) => (
						<TableRow
							key={i}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">{i+1}</TableCell>
							<TableCell component="th" scope="row">{row.date.toString()}</TableCell>
							<TableCell component="th" scope="row">{row.type.toLowerCase()}</TableCell>
							<TableCell component="th" scope="row">{row.totalKm} km</TableCell>
							<TableCell component="th" scope="row">{row.totalPasses}</TableCell>
							<TableCell component="th" scope="row">{row.fastest} min</TableCell>
							<TableCell component="th" scope="row">{row.slowest} min</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default JourneyTable;