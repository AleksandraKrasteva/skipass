import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Terrain } from '@mui/icons-material';
import LoginButton from '@/components/atoms/LogInBtn';
import LogoutButton from '@/components/atoms/LogOutBtn';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import useConditionalAuth from '@/config/conditionalAuth';

const Navigation = ()=> {
	const { user, isAuthenticated } = useConditionalAuth();
	const router = useRouter();


	return (
		<AppBar position="fixed" sx={{bgcolor:'#0097a7'}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters  sx={{ justifyContent: 'space-between' }}>
					<Box sx ={{display: 'inline-flex', alignItems: 'center'}}>
						<Terrain />
						<Typography
							variant="h6"
							noWrap
							sx={{
								ml: 4,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
							}}
						>
            SkiPass
						</Typography>
						{isAuthenticated && (
							<>
								<Button sx={{ color: 'white', fontFamily: 'monospace'}} onClick={()=>router.push('/')}>Posts</Button>
								<Button sx={{ color: 'white', fontFamily: 'monospace'}} onClick={()=>router.push('/my-posts')}>My posts</Button>
								<Button sx={{ color: 'white', fontFamily: 'monospace'}} onClick={()=>router.push('/journeys')}>Journeys</Button>
								<Button sx={{ color: 'white', fontFamily: 'monospace'}} onClick={()=>router.push('/profile')}>Profile</Button>
							</>
						)
						}						
					</Box>	
					<Box sx={{ display: { md: 'flex' }, mr: 1 }} >
						{isAuthenticated ? 	<LogoutButton/> :<LoginButton/>}					
						<IconButton  sx={{ pd: 0 }}>
							<Avatar alt={user?.nickname} src={user?.picture} />
						</IconButton>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navigation;