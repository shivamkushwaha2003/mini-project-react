import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './InfoBox.css';


export default function InfoBox({ info }) {
    const INIT_URL = 'https://images.unsplash.com/photo-1792262633238-6e8ecfa846dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D';

 return (
   <div className="InfoBox">
     <div className="cardContainer">
     <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={INIT_URL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {info.city}
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"span"}>
            <p>Temperature= {info.temp}°C</p>
            <p>Humidity= {info.humidity}</p>
            <p>Max Temp= {info.tempMax}°C</p>
            <p>Min Temp= {info.tempMin}°C</p>
            <p>The Weather can be described as <i>{info.weather}</i> and feels like {info.feelsLike}°C </p>
        </Typography>
      </CardContent>
    </Card>
    </div>
   </div>
 );   
}