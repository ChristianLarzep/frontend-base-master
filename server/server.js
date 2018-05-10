/* eslint-disable no-console */
import path from 'path';
import Express from 'express';
import compression from 'compression';
import config from '../src/js/config';

const app = new Express();

app.set('port', config.port);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());
app.use('/css', Express.static(path.join(__dirname, '..', 'public', 'css')));
app.use('/fonts', Express.static(path.join(__dirname, '..', 'public', 'fonts')));
app.use('/images', Express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/js', Express.static(path.join(__dirname, '..', 'public', 'js')));

app.use((req, res) => {
  res.render('index', {
    root: __dirname,
    apiHost: process.env.API_HOST,
    graphqlHost: `${process.env.API_HOST}graphql`,
    env: process.env.NODE_ENV,
    lang: 'es'
  });
});

app.listen(config.port, () => {
  console.info('%s FRONTEND', config.title);
  console.info('Express server listening on port %s', config.port);
});
