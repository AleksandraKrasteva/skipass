import { createJourney, viewJourneysForUser } from '@/api/requests';
import { Journey } from '@/api/types';
import UserJourneysView from '@/components/atoms/UserJourneys';
import Navigation from '@/components/molecultes/Navigation';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import Footer from '@/components/atoms/Footer';
import useConditionalAuth from '@/config/conditionalAuth';


const JourneyPage = () => {
	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useConditionalAuth();
	const [journeys, setJourneys] = useState<Journey[]>([]);
	const [trigger,setTrigger] = useState<boolean>(false);

	useEffect(()=>{
		console.log('In journey');
		viewJourneys();
	},[trigger]);

	const viewJourneys = async()=>{
        
		if(!isAuthenticated) return;
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
			loginWithRedirect();
		});
		if(!token) return;

		const res = await viewJourneysForUser(user!.nickname!, token);
		console.log(res.data);
		if(!res.data) return; 
		if(res.data.collection){
			setJourneys(res.data?.collection.reverse() as Journey[]);
		}else{
			setJourneys(res.data?.reverse() as Journey[]);
			
		}
	};

	const generateJourney=async()=>{
		console.log('generate');
		if(!isAuthenticated) return;
		console.log('after auth');
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch((e)=>{
			console.log(broke);
			console.log(e);
			loginWithRedirect();
		});

		if(!token) return;
		console.log('after token');
		await createJourney(user!.nickname!, token).then(()=>{
			setTrigger(!trigger);
		});
	};

	return (
		<>
			<Navigation/>
			<Button sx={{mt:10}} variant="contained" endIcon={<DownhillSkiingIcon />}
				onClick={()=>{generateJourney();}}>Get today's journey</Button>
			{journeys.length > 0 ?
				<UserJourneysView 
					journeys={journeys}
					trigger={trigger} 
					setTrigger={setTrigger}/>
				: <h1>No journeys present</h1>}
			<Footer/>
		</>
	);
};

export default JourneyPage;