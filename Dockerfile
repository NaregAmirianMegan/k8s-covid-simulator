FROM nginx:latest

COPY index.html /usr/share/nginx/html
COPY canvas.js /usr/share/nginx/html
COPY circle.js /usr/share/nginx/html
COPY gameObject.js /usr/share/nginx/html

EXPOSE 80

