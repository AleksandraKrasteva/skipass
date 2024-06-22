/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createJourney, viewJourneysForUser } from '@/api/requests';
import { Journey } from '@/api/types';
import UserJourneysView from '@/components/atoms/UserJourneys';
import Navigation from '@/components/molecultes/Navigation';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import Footer from '@/components/atoms/Footer';
import useConditionalAuth from '@/config/conditionalAuth';

const JourneyPage = () => {
	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useConditionalAuth();
	const [journeys, setJourneys] = useState<Journey[]>([]);
	const [trigger,setTrigger] = useState<boolean>(false);

	useEffect(()=>{
		if(!isAuthenticated){
			// @ts-ignore
			loginWithRedirect(); 
		}
	});
	
	useEffect(()=>{
		viewJourneys();
	},[trigger]);

	const viewJourneys = async()=>{
        
		if(!isAuthenticated) return;
		// @ts-ignore
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
			// @ts-ignore
			loginWithRedirect();
		});
		if(!token) return;

		const res = await viewJourneysForUser(user!.nickname!, token);
		if(!res.data) return; 
		if(res.data.collection){
			setJourneys(res.data?.collection.reverse() as Journey[]);
		}else{
			setJourneys(res.data?.reverse() as Journey[]);
			
		}
	};

	const generateJourney=async()=>{
		if(!isAuthenticated) return;
		// @ts-ignore
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
			// @ts-ignore
			loginWithRedirect();
		});

		if(!token) return;
		await createJourney(user!.nickname!, token).then(()=>{
			setTrigger(!trigger);
		});
	};

	return (
		<>
			<Navigation/>
			<Button variant="contained" sx={{fontFamily: 'monospace', bgcolor:'pink', color: 'black', mt:10, ml:2}}  endIcon={<DownhillSkiingIcon />}
				onClick={()=>{generateJourney();}}>Get today's journey</Button>
			{journeys.length > 0 ?
				<UserJourneysView 
					journeys={journeys}
					trigger={trigger} 
					setTrigger={setTrigger}/>
				: <Typography
					sx={{
						ml: 2,
						mt:2,
						fontFamily: 'monospace',
						fontSize: 18,
						fontWeight: 800,
						letterSpacing: '.1rem',
						color: 'black',
					}}
				> No journeys present
				</Typography>}
			<Footer/>
		</>
	);
};

export default JourneyPage;