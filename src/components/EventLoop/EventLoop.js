import React from 'react';

import { ConsoleBox, ConsoleTitle } from '../../styles/console';
import { Box } from '../../styles/flex';
import { P } from '../../styles/text';

const EventLoop = props => {
	return (
		<ConsoleBox>
			<Box textAlign="center">
				<ConsoleTitle>Event Loop</ConsoleTitle>
			</Box>

			<Box borderTop={3} borderStyle="solid" color="colorBlue" justifySelf="center" mt={2} />

			<Box height="350px" mt="20px" textAlign="center">
				<P>Hello World</P>
			</Box>
		</ConsoleBox>
	);
};

export default EventLoop;
