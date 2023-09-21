import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Typography } from '@mui/material';
import Box from '@mui/material/Box';





const Postcard = () => {


    // const postDate = new Date().toLocaleDateString();
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Grid container rowSpacing={1}
                    sx={{
                        m: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Grid >
                        <Card sx={{
                            maxWidth: 380,
                            boxShadow: '0 3px 5px  grey',
                            m: 3,
                        }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height='280'
                                    image={require('../assets/eyes.jpg')}
                                    alt=""
                                />
                               
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Eyes
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                           
                        </Card>
                    </Grid>
                    <Grid  >

                        <Card sx={{
                            maxWidth: 380,
                            boxShadow: '0 3px 5px  grey',
                            m: 3
                        }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height='280'
                                    image={require('../assets/bunty.jpg')}
                                    alt="Card Image"
                                />
                                
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                           


                        </Card>
                    </Grid>
                    <Grid  >

                        <Card sx={{
                            maxWidth: 380,
                            boxShadow: '0 3px 5px grey',
                            m: 3
                        }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height='280'
                                    image={require('../assets/shower.png')}
                                    alt="Card Image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                           

                        </Card>
                    </Grid>
                    <Grid >
                        <Card sx={{
                            maxWidth: 380,
                            boxShadow: '0 3px 5px  grey',
                            m: 3,
                        }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height='280'
                                    image={require('../assets/eyes.jpg')}
                                    alt=""
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Eyes
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid  >

                        <Card sx={{
                            maxWidth: 380,
                            boxShadow: '0 3px 5px  grey',
                            m: 3
                        }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height='280'
                                    image={require('../assets/bunty.jpg')}
                                    alt="Card Image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            </Card>
                    </Grid>
                    <Grid  >

                        <Card sx={{
                            maxWidth: 380,
                            boxShadow: '0 3px 5px grey',
                            m: 3
                        }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height='280'
                                    image={require('../assets/shower.png')}
                                    alt="Card Image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            </Card>
                    </Grid>


                </Grid>
            </Box>

        </>
    );
}

export default Postcard 