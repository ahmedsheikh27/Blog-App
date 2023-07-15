import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';





const HomeCard = () => {


    const postDate = new Date('2023-07-12').toLocaleDateString();
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
                                {postDate}
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
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>
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
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>


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
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>


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
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>
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
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>


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
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>


                        </Card>
                    </Grid>


                </Grid>
            </Box>
            <Link to='./Post'
            className='text-decoration-none'
            >
                <Button variant="contained" color="success"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '25px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        ml: 'auto',
                        mr: 'auto',
                        p: 1.5,
                        width: 200
                    }}>
                    See More Posts
                </Button>
            </Link>
        </>
    );
}

export default HomeCard 