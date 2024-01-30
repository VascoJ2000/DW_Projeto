const fetch = require('node-fetch');

const getMoviesPopular = async (req, res) => {
    const page = req.params.page || 1
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMBD_API_KEY
    }
    };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.status(200).json(json)
    })
    .catch(err => {
        console.error('error:' + err)
        res.sendStatus(403)
    });
}

const getMoviesTopRated = async (req, res) => {
    const page = req.params.page || 1
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMBD_API_KEY
    }
    };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.status(200).json(json)
    })
    .catch(err => {
        console.error('error:' + err)
        res.sendStatus(403)
    });
}

const getMoviesUpcoming = async (req, res) => {
    const page = req.params.page || 1
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMBD_API_KEY
    }
    };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.status(200).json(json)
    })
    .catch(err => {
        console.error('error:' + err)
        res.sendStatus(403)
    });
}

const getMovie = async (req, res) => {
    const id = req.params.id
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMBD_API_KEY
    }
    };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.status(200).json(json)
    })
    .catch(err => {
        console.error('error:' + err)
        res.sendStatus(403)
    });
}

const getSearch = async (req, res) => {
    const keyword = req.params.keyword
    const page = req.params.page || 1
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMBD_API_KEY
    }
    };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.status(200).json(json)
    })
    .catch(err => {
        console.error('error:' + err)
        res.sendStatus(403)
    });
}

module.exports = {
    getMoviesPopular,
    getMoviesTopRated,
    getMoviesUpcoming,
    getMovie,
    getSearch,
}