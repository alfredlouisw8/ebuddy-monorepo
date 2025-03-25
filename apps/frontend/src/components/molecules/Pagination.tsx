import { Box, Button, Typography } from "@mui/material";
import ActionButton from "../atoms/ActionButton";

interface PaginationProps {
	page: number;
	loading: boolean;
	handleNext: () => void;
	handlePrev: () => void;
	disablePrevious?: boolean;
	disableNext?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
	page,
	loading,
	handleNext,
	handlePrev,
	disablePrevious,
	disableNext,
}) => {
	return (
		<Box display="flex" justifyContent="center" mt={4} gap={2}>
			<ActionButton
				variant="outlined"
				onClick={handlePrev}
				disabled={disablePrevious}
			>
				Previous
			</ActionButton>
			<Typography align="center" mt={2}>
				Page {page + 1}
			</Typography>
			<ActionButton
				variant="outlined"
				onClick={handleNext}
				disabled={disableNext}
			>
				Next
			</ActionButton>
		</Box>
	);
};

export default Pagination;
