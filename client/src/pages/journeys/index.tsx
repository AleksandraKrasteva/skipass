import { createJourney, viewJourneysForUser } from '@/api/requests';
import { Journey } from '@/api/types';
import UserJourneysView from '@/components/atoms/UserJourneys';
import Navigation from '@/components/molecultes/Navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import Footer from '@/components/atoms/Footer';


const JourneyPage = () => {
	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
	const [journeys, setJourneys] = useState<Journey[]>([]);
	const [trigger,setTrigger] = useState<boolean>(false);

	useEffect(()=>{
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
		console.log(res);
		if(res){
			setJourneys(res.data.reverse());
		}
	};

	const generateJourney=async()=>{
		if(!isAuthenticated) return;
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}}).catch(()=>{
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
			<Button sx={{mt:10}} variant="contained" endIcon={<DownhillSkiingIcon />}
				onClick={()=>{generateJourney();}}>Get today's journey</Button>
			<UserJourneysView 
				journeys={journeys}
				trigger={trigger} 
				setTrigger={setTrigger}/>
			<Footer/>
		</>
	);
};

export default JourneyPage;