import App from './app/app';

const app = new App();

app.init().then(function(document) {
    app.run(document.body);
});